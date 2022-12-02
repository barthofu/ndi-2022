import { strapi } from '@utils/lib'
import { publicProcedure, router } from '@server/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const statRouter = router({

    getStats: publicProcedure
        .query(async() => {

            let stats: Strapi.Stat[] | null = null

            try {

                stats = await strapi.find(`stats`)
                if (!stats) throw Error()
            } catch (e) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Stats not found'
                })
            }

            return stats
        }),

    createStat: publicProcedure
    .input(z.object({
        genre: z.string(),
        age: z.number(),
        score: z.number()
    }))
    .mutation(async ({ input }) => {

        let stat: Strapi.Stat | null = null

        try {

            stat = await strapi.create('stats', input)
            if (!stat) throw Error()
        } catch (e) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Stat not created'
            })
        }

        return stat
    })

})