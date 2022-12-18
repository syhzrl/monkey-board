import React, { FunctionComponent } from 'react';

interface CreateProjectCardProps {
    onClick: () => void;
}

const CreateProjectCard: FunctionComponent<CreateProjectCardProps> = (props: CreateProjectCardProps) => {
    const { onClick } = props;
    return (
        <div className='flex flex-col gap-1 h-80 w-80'>
            <p className='text-secondary-purple'>
                Create new project
            </p>

            <button
                onClick={onClick}
                className='flex flex-col items-center justify-center w-full h-full gap-2 transition-colors duration-150 border rounded-lg text-secondary-grey border-line hover:border-secondary-grey'
            >
                <p>
                    Click Me!
                </p>

                <p>
                    or
                </p>

                <p>
                    Ctrl + N
                </p>
            </button>
        </div>
    );
};

export default CreateProjectCard;
