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
    editFile: publicProcedure
        .input(z.object({
            id: z.string(),
            name: z.string().min(1),
        }))
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.files.update({
                where: {
                    id: input.id,
                },
                data: {
                    name: input.name,
                },
            });
        }),
    deleteFile: publicProcedure
        .input(z.object({
            id: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.files.delete({
                where: {
                    id: input.id,
                },
            });
        }),
});
