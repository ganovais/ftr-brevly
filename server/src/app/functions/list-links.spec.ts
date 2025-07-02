import { randomUUID } from 'node:crypto'
import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'

import { listLinks } from '@/app/functions/list-links'
import { isRight, unwrapEither } from '@/shared/either'
import { makeLink } from '@/test/factories/make-link'

describe('list links', () => {
  it('should be able to get the links', async () => {
    const shortLinkPattern = randomUUID()

    const link1 = await makeLink({ shortLink: `${shortLinkPattern}1` })
    const link2 = await makeLink({ shortLink: `${shortLinkPattern}2` })
    const link3 = await makeLink({ shortLink: `${shortLinkPattern}3` })
    const link4 = await makeLink({ shortLink: `${shortLinkPattern}4` })
    const link5 = await makeLink({ shortLink: `${shortLinkPattern}5` })

    const sut = await listLinks()

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).links.length).toBeGreaterThanOrEqual(5)
    
    const createdLinks = unwrapEither(sut).links.filter(link => 
      link.shortLink.includes(shortLinkPattern)
    )
    
    expect(createdLinks).toEqual([
      expect.objectContaining({ id: link5.id }),
      expect.objectContaining({ id: link4.id }),
      expect.objectContaining({ id: link3.id }),
      expect.objectContaining({ id: link2.id }),
      expect.objectContaining({ id: link1.id }),
    ])
  })

  it('should be able to get sorted links by creation date', async () => {
    const shortLinkPattern = randomUUID()

    const link1 = await makeLink({
      shortLink: `${shortLinkPattern}1`,
      createdAt: dayjs().subtract(4, 'day').toDate(),
    })

    const link2 = await makeLink({
      shortLink: `${shortLinkPattern}2`,
      createdAt: dayjs().subtract(3, 'day').toDate(),
    })

    const link3 = await makeLink({
      shortLink: `${shortLinkPattern}3`,
      createdAt: dayjs().subtract(2, 'day').toDate(),
    })

    const link4 = await makeLink({
      shortLink: `${shortLinkPattern}4`,
      createdAt: dayjs().subtract(1, 'day').toDate(),
    })

    const link5 = await makeLink({
      shortLink: `${shortLinkPattern}5`,
      createdAt: new Date(),
    })

    const sut = await listLinks()

    expect(isRight(sut)).toBe(true)
    
    const createdLinks = unwrapEither(sut).links.filter(link => 
      link.shortLink.includes(shortLinkPattern)
    )
    
    // Should be ordered by creation date descending (newest first)
    expect(createdLinks).toEqual([
      expect.objectContaining({ id: link5.id }),
      expect.objectContaining({ id: link4.id }),
      expect.objectContaining({ id: link3.id }),
      expect.objectContaining({ id: link2.id }),
      expect.objectContaining({ id: link1.id }),
    ])
  })

  it('should return empty array when no links exist', async () => {
    const sut = await listLinks()

    expect(isRight(sut)).toBe(true)
    expect(unwrapEither(sut).links).toEqual(expect.any(Array))
  })
})
