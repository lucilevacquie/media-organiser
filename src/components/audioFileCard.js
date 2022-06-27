import React from 'react';

const AudioCard = ({ title, artist, genre }) => {
    return (
        <div className='w-full p-4 bg-white text-left rounded-xl shadow-xl hover:shadow-2xl focus:shadow-2xl'>
            <h3 className='text-semibold'>{title} by {artist}</h3>
            <p className='text-sm'>{genre}</p>
        </div>
    )
}

export default AudioCard;