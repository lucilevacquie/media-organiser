import React from 'react';

const Card = ({ name, numFiles, path }) => {
    return (
        <a href={path} className='w-full p-4 bg-white text-left rounded-xl shadow-xl hover:shadow-2xl focus:shadow-2xl'>
            <h3 className='text-semibold'>{name}</h3>
            <p className='text-sm'>{numFiles} files</p>
        </a>
    )
}

export default Card;