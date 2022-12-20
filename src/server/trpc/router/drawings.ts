import { z } from 'zod';
import { nanoid } from 'nanoid';
import { router, publicProcedure } from '../trpc';

export const drawingsRouter = router({
    createDrawing: publicProcedure
        .input(z.object({
            projectDetailsId: z.string(),
            name: z.string().min(1),
        }))
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.drawings.create({
                data: {
                    id: nanoid(),
                    projectDetailsId: input.projectDetailsId,
                    name: input.name,
                },
            });
        }),
});
