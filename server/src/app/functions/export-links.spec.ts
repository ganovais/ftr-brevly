import { randomUUID } from 'node:crypto'
import { describe, expect, it, vi } from 'vitest'

import { exportLinks } from '@/app/functions/export-links'
import * as upload from '@/infra/storage/upload-file-to-storage'
import { isRight, unwrapEither } from '@/shared/either'
import { makeLink } from '@/test/factories/make-link'

describe('export links', () => {
  it('should be able to export links', async () => {
    const uploadStub = vi
      .spyOn(upload, 'uploadFileToStorage')
      .mockImplementationOnce(async () => {
        return {
          key: `${randomUUID()}.csv`,
          url: 'http://example.com/file.csv',
        }
      })

    const shortLinkPattern = randomUUID()

    const link1 = await makeLink({ shortLink: `${shortLinkPattern}1` })
    const link2 = await makeLink({ shortLink: `${shortLinkPattern}2` })
    const link3 = await makeLink({ shortLink: `${shortLinkPattern}3` })
    const link4 = await makeLink({ shortLink: `${shortLinkPattern}4` })
    const link5 = await makeLink({ shortLink: `${shortLinkPattern}5` })

    const sut = await exportLinks()

    const generatedCSVStream = uploadStub.mock.calls[0][0].contentStream
    const csvAsString = await new Promise<string>((resolve, reject) => {
      const chunks: Buffer[] = []

      generatedCSVStream.on('data', (chunk: Buffer) => {
        chunks.push(chunk)
      })

      generatedCSVStream.on('end', () => {
        resolve(Buffer.concat(chunks).toString('utf-8'))
      })

      generatedCSVStream.on('error', err => {
        reject(err)
      })
    })

    const csvAsArray = csvAsString
      .trim()
      .split('\n')
      .map(row => row.split(','))

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).reportUrl).toBe('http://example.com/file.csv')
    expect(csvAsArray[0]).toEqual(['ID', 'Original URL', 'Short URL', 'Access Count', 'Created At'])
    expect(csvAsArray.length).toBeGreaterThanOrEqual(6) // Header + at least 5 links
  })
})
