import { router } from '../trpc';
// import { exampleRouter } from './example';
import { projectRouter } from './project';

export const appRouter = router({
    // example: exampleRouter,
    project: projectRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
