import { z } from 'zod';
import { nanoid } from 'nanoid';
import { router, publicProcedure } from '../trpc';

export const boardsRouter = router({
    createBoard: publicProcedure
        .input(z.object({
            projectDetailsId: z.string(),
            name: z.string().min(1),
        }))
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.boards.create({
                data: {
                    id: nanoid(),
                    projectDetailsId: input.projectDetailsId,
                    name: input.name,
                },
            });
        }),
    editBoard: publicProcedure
        .input(z.object({
            id: z.string(),
            name: z.string().min(1),
        }))
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.boards.update({
                where: {
                    id: input.id,
                },
                data: {
                    name: input.name,
                },
            });
        }),
    deleteBoard: publicProcedure
        .input(z.object({
            id: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.boards.delete({
                where: {
                    id: input.id,
                },
            });
        }),
});
