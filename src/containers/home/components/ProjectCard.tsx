import React, { FunctionComponent } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';

import pic from 'assets/images/stay1.jpg';

interface ProjectCardProps {
    name: string;
    desc: string;
}

const ProjectCard: FunctionComponent<ProjectCardProps> = (props: ProjectCardProps) => {
    const { name, desc } = props;
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

                <div className='flex flex-col items-start justify-center w-full gap-4 p-4 border-t h-1/2 border-t-line'>
                    <p className='text-secondary-grey'>
                        {desc}
                    </p>

                    <button
                        type='button'
                        onClick={() => router.push(`project/${name}`)}
                        className='p-2 text-white transition-colors duration-150 rounded-md bg-button-grey hover:bg-button-grey-hover'
                    >
                        view-project
                    </button>
                </div>

            </div>
        </div>
    );
};

export default ProjectCard;
