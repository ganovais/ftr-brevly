import { describe, expect, it } from 'vitest'

import { visitingLink } from '@/app/functions/visiting-link'
import { db } from '@/infra/db'
import { makeLink } from '@/test/factories/make-link'

describe('visiting link', () => {
  it('should be able to visit a link and return original URL', async () => {
    const link = await makeLink({
      originalLink: 'https://example.com',
      accessCount: 5,
    })

    const result = await visitingLink({
      shortLink: link.shortLink,
    })

    expect(result).toBe('https://example.com')

    // Verify that access count was incremented
    const updatedLink = await db.query.links.findFirst({
      where: (links, { eq }) => eq(links.shortLink, link.shortLink),
    })

    expect(updatedLink?.accessCount).toBe(6)
  })

  it('should increment access count from 0', async () => {
    const link = await makeLink({
      accessCount: 0,
    })

    await visitingLink({
      shortLink: link.shortLink,
    })

    const updatedLink = await db.query.links.findFirst({
      where: (links, { eq }) => eq(links.shortLink, link.shortLink),
    })

    expect(updatedLink?.accessCount).toBe(1)
  })

  it('should not be able to visit a non-existent link', async () => {
    await expect(
      visitingLink({
        shortLink: 'non-existent-link',
      })
    ).rejects.toThrow('Link not found')
  })
})
