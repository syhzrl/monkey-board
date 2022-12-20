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
    editDrawing: publicProcedure
        .input(z.object({
            id: z.string(),
            name: z.string().min(1),
        }))
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.drawings.update({
                where: {
                    id: input.id,
                },
                data: {
                    name: input.name,
                },
            });
        }),
    deleteDrawing: publicProcedure
        .input(z.object({
            id: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.drawings.delete({
                where: {
                    id: input.id,
                },
            });
        }),
});
