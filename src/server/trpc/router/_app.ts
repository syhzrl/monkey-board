import { router } from '../trpc';
import { boardsRouter } from './boards';
import { projectRouter } from './project';

export const appRouter = router({
    project: projectRouter,
    boards: boardsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
