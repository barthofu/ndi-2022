import { strapi } from '@utils/lib'
import { publicProcedure, router } from '@server/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const storyRouter = router({

    getStory: publicProcedure
        .input(z.object({
            id: z.number()
        }))
        .query(async({ input }) => {

            const story = await strapi.findOne('stories', {
                id: { $eq: input.id }
            })

            console.log('story', story)
        })

})