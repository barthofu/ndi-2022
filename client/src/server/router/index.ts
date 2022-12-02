import { publicProcedure, router } from '@server/trpc'

import { helloWorldRouter } from './helloWorld'
import { storyRouter } from './story'

export const appRouter = router({

    helloWorld: helloWorldRouter,
    story: storyRouter
})
   
export type AppRouter = typeof appRouter