import React, { FunctionComponent } from 'react';
import { Project } from '@prisma/client';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Delete, Edit } from 'assets/icons';

import pic from 'assets/images/stay1.jpg';

interface ProjectCardProps {
    id: string;
    name: string;
    desc: string;
    deleteClickHandler: (projId: string) => void;
    updateClickHandler: (proj: Project) => void;
}

const ProjectCard: FunctionComponent<ProjectCardProps> = (props: ProjectCardProps) => {
    const { id, name, desc, deleteClickHandler, updateClickHandler } = props;
    const router = useRouter();

    return (
        <div className='flex flex-col gap-1 h-80 w-80'>
            <p className='text-secondary-purple'>
                {name}
            </p>

            <div className='flex flex-col w-full h-full border rounded-lg border-line'>
                <div className='relative flex w-full h-1/2'>
                    <Image
                        src={pic}
                        objectFit='cover'
                        layout='fill'
                        style={{
                            borderRadius: '0.5rem 0.5rem 0 0',
                        }}
                    />
                </div>

                <div className='flex flex-col items-start justify-between w-full gap-4 p-4 border-t h-1/2 border-t-line'>
                    <p className='text-secondary-grey'>
                        {desc}
                    </p>

                    <div className='flex items-center justify-between w-full'>
                        <button
                            type='button'
                            onClick={() => router.push(`project/${id}`)}
                            className='p-2 text-white transition-colors duration-150 rounded-md bg-button-grey hover:bg-button-grey-hover'
                        >
                            view-project
                        </button>

                        <div className='flex h-full gap-2'>
                            <button
                                type='button'
                                onClick={() => updateClickHandler({ id, name, desc })}
                                className='h-full p-2 transition-colors duration-150 bg-transparent rounded-md text-secondary-grey hover:text-white'
                            >
                                <Edit className='w-full h-full' />
                            </button>

                            <button
                                type='button'
                                onClick={() => deleteClickHandler(id)}
                                className='h-full p-2 transition-colors duration-150 bg-transparent rounded-md text-secondary-grey hover:text-white'
                            >
                                <Delete className='w-full h-full' />
                            </button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default ProjectCard;
