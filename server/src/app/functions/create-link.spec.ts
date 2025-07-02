import { randomUUID } from 'node:crypto'
import { describe, expect, it } from 'vitest'

import { createLink } from '@/app/functions/create-link'
import { isRight, unwrapEither } from '@/shared/either'
import { makeLink } from '@/test/factories/make-link'

describe('create link', () => {
  it('should be able to create a link', async () => {
    const shortLink = randomUUID()
    const originalLink = 'https://example.com'

    const sut = await createLink({
      originalLink,
      shortLink,
    })

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut)).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        originalLink,
        shortLink,
        accessCount: 0,
        createdAt: expect.any(Date),
      })
    )
  })

  it('should not be able to create a link with an existing short link', async () => {
    const existingLink = await makeLink()

    await expect(
      createLink({
        originalLink: 'https://example.com',
        shortLink: existingLink.shortLink,
      })
    ).rejects.toThrow('Short link already exists')
  })

  it('should not be able to create a link with invalid URL', async () => {
    const shortLink = randomUUID()

    await expect(
      createLink({
        originalLink: 'invalid-url',
        shortLink,
      })
    ).rejects.toThrow()
  })

  it('should not be able to create a link with empty short link', async () => {
    await expect(
      createLink({
        originalLink: 'https://example.com',
        shortLink: '',
      })
    ).rejects.toThrow()
  })
})
