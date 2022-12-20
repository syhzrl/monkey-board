import { router } from '../trpc';
import { boardsRouter } from './boards';
import { drawingsRouter } from './drawings';
import { filesRouter } from './files';
import { projectRouter } from './project';

export const appRouter = router({
    project: projectRouter,
    boards: boardsRouter,
    files: filesRouter,
    drawings: drawingsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
