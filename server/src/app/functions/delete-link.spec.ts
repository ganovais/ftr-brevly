import { describe, expect, it } from 'vitest'

import { deleteLink } from '@/app/functions/delete-link'
import { makeLink } from '@/test/factories/make-link'

describe('delete link', () => {
  it('should be able to delete a link', async () => {
    const link = await makeLink()

    await expect(
      deleteLink({
        shortLink: link.shortLink,
      })
    ).resolves.not.toThrow()
  })

  it('should not be able to delete a non-existent link', async () => {
    await expect(
      deleteLink({
        shortLink: 'non-existent-link',
      })
    ).rejects.toThrow('Link not found')
  })
})
