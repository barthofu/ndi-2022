import { publicProcedure, router } from '@server/trpc'

import { helloWorldRouter } from './helloWorld'
import { statRouter } from './stat'
import { storyRouter } from './story'

export const appRouter = router({
    helloWorld: helloWorldRouter,
    story: storyRouter,
    stat: statRouter
})
   
export type AppRouter = typeof appRouter