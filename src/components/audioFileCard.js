import React from 'react';

const AudioCard = ({ title, artist, genre, size }) => {
    return (
        <div className='w-full p-4 bg-white text-left rounded-xl shadow-xl hover:shadow-2xl focus:shadow-2xl'>
            <h3 className='text-semibold'><span className='font-bold'>{title}</span> by <span className='italic'>{artist}</span></h3>
            <p className='text-sm'>{genre}</p>
            <p>{size}kB</p>
        </div>
    )
}

export default AudioCard;