import { z } from 'zod';
import { nanoid } from 'nanoid';
import { router, publicProcedure } from '../trpc';

export const filesRouter = router({
    createFile: publicProcedure
        .input(z.object({
            projectDetailsId: z.string(),
            name: z.string().min(1),
        }))
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.files.create({
                data: {
                    id: nanoid(),
                    projectDetailsId: input.projectDetailsId,
                    name: input.name,
                },
            });
        }),
});
