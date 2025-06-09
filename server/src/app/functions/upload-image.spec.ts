import { randomUUID } from 'node:crypto'
import { Readable } from 'node:stream'
import { eq } from 'drizzle-orm'
import { beforeEach, describe, expect, it, vi } from 'vitest'

import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'
import * as uploadFileToStorageModule from '@/infra/storage/upload-file-to-storage'
import { isLeft, isRight, unwrapEither } from '@/shared/either'
import { InvalidFileFormat } from './errors/invalid-file-format'
import { uploadImage } from './upload-image'

vi.mock('@/infra/storage/upload-file-to-storage', () => {
  return {
    uploadFileToStorage: vi.fn().mockImplementation(() => {
      return {
        url: 'https://example.com/images/test-image.jpg',
        key: `${randomUUID()}.jpg`,
      }
    }),
  }
})

describe('upload-image', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should upload an image successfully', async () => {
    const fileName = `${randomUUID()}.jpg`

    const input = {
      fileName,
      contentType: 'image/jpeg',
      contentStream: Readable.from([]),
    }

    const sut = await uploadImage(input)

    expect(isRight(sut)).toBe(true)

    expect(uploadFileToStorageModule.uploadFileToStorage).toHaveBeenCalledWith({
      folder: 'images',
      fileName: input.fileName,
      contentType: input.contentType,
      contentStream: input.contentStream,
    })

    const result = await db
      .select()
      .from(schema.uploads)
      .where(eq(schema.uploads.name, fileName))

    expect(result).toHaveLength(1)
  })

  it('should return InvalidFileFormat error when content type is not allowed', async () => {
    const fileName = `${randomUUID()}.pdf`

    const sut = await uploadImage({
      fileName,
      contentType: 'document/pdf',
      contentStream: Readable.from([]),
    })

    expect(isLeft(sut)).toBe(true)
    expect(unwrapEither(sut)).toBeInstanceOf(InvalidFileFormat)

    expect(uploadFileToStorageModule.uploadFileToStorage).not.toHaveBeenCalled()
  })
})
