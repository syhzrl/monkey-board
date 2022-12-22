import { z } from 'zod';
import { nanoid } from 'nanoid';
import { router, publicProcedure } from '../trpc';

export const projectRouter = router({
    getAll: publicProcedure
        .query(async ({ ctx }) => {
            const res = await ctx.prisma.project.findMany();
            return res;
        }),
    createProject: publicProcedure
        .input(z.object({
            id: z.string(),
            name: z.string().min(1, { message: 'Name cannot be empty' }),
            desc: z.string().min(1, { message: 'Description cannot be empty' }),
        }))
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.project.create({
                data: {
                    ...input,
                    projectDetails: {
                        create: {
                            id: nanoid(),
                            name: input.name,
                            desc: input.desc,
                        },
                    },
                },
            });
        }),
    updateProject: publicProcedure
        .input(z.object({
            id: z.string(),
            name: z.string().min(1, { message: 'Name cannot be empty' }),
            desc: z.string().min(1, { message: 'Description cannot be empty' }),
        }))
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.project.update({
                where: {
                    id: input.id,
                },
                data: input,
            });
        }),
    deleteProject: publicProcedure
        .input(z.object({
            id: z.string(),
        }))
        .mutation(async ({ input, ctx }) => {
            await ctx.prisma.project.delete({
                where: {
                    id: input.id,
                },
            });
        }),
    getProjectDetails: publicProcedure
        .input(z.object({
            id: z.string(),
        }))
        .query(async ({ input, ctx }) => {
            const res = await ctx.prisma.projectDetails.findUnique({
                where: {
                    projectId: input.id,
                },
                include: {
                    boards: true,
                    files: true,
                    drawings: true,

                },
            });
            return res;
        }),
});
