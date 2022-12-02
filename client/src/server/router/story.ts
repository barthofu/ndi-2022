import { strapi } from '@utils/lib'
import { publicProcedure, router } from '@server/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const storyRouter = router({

    getStory: publicProcedure
        .input(z.object({
            pageId: z.number()
        }))
        .query(async({ input }) => {

            let page: Strapi.Page | null = null

            try {

                page = await strapi.findById(`pages`, input.pageId)
                if (!page) throw Error()
            } catch (e) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Page not found'
                })
            }

            return page
        })

})