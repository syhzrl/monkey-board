import { type inferAsyncReturnType } from '@trpc/server';
import { type CreateNextContextOptions } from '@trpc/server/adapters/next';

import { prisma } from '../db/client';

/**
 * Replace this with an object if you want to pass things to createContextInner
 */
type CreateContextOptions = Record<string, never>;

/** Use this helper for:
 * - testing, so we dont have to mock Next.js' req/res
 * - trpc's `createSSGHelpers` where we don't have req/res
 * @see https://create.t3.gg/en/usage/trpc#-servertrpccontextts
 * */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createContextInner = async (opts: CreateContextOptions) => {
    return {
        prisma,
    };
};

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 * */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const createContext = async (opts: CreateNextContextOptions) => {
    // eslint-disable-next-line no-return-await
    return await createContextInner({});
};

export type Context = inferAsyncReturnType<typeof createContext>;
