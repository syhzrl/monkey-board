import { initTRPC } from '@trpc/server';
import superjson from 'superjson';
import { ZodError } from 'zod';

import { type Context } from './context';

// error.cause.flatten()

const t = initTRPC.context<Context>().create({
    transformer: superjson,
    errorFormatter({ shape, error }) {
        return {
            ...shape,
            data: {
                ...shape.data,
                zodError: error.code === 'BAD_REQUEST' && error.cause instanceof ZodError ? error.cause.flatten() : null,
            },
            frontEndMessage: error.code === 'BAD_REQUEST' && error.cause instanceof ZodError ? 'Validation error! Check your inputs' : 'Sorry something went wrong! Please try again',
        };
    },
});

export const { router } = t;

export const publicProcedure = t.procedure;
