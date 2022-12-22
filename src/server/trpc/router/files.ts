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
                    fileDetails: {
                        create: {
                            id: nanoid(),
                            name: input.name,
                            data: '',
                        },
                    },
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
    getFileData: publicProcedure
        .input(z.object({
            fileId: z.string(),
        }))
        .query(async ({ input, ctx }) => {
            const res = await ctx.prisma.fileDetails.findUnique({
                where: {
                    fileId: input.fileId,
                },
            });

            return res;
        }),
    updateFileData: publicProcedure
        .input(z.object({
            id: z.string(),
            fileData: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.fileDetails.update({
                where: {
                    id: input.id,
                },
                data: {
                    data: input.fileData,
                },
            });
        }),
});
