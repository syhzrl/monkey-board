import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from 'lib/prisma';

import { Project } from '@prisma/client';

export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
    const results = await prisma.project.findMany();

    res.status(201).json({ data: results });
}
