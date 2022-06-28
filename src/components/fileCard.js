import React from 'react';

const FileCard = ({ img, name, title, artist, genre, size, path, duration }) => {
    return (
        <div className='w-full p-4 bg-white rounded-t-xl flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 text-left rounded-xl shadow-xl hover:shadow-2xl focus:shadow-2xl'>
            <div>
                <img src={img} alt={name}/>
            </div>
            <div className='flex flex-col space-y-2'>
                {name ? 
                    <p><span className='underline'>Name:</span> {name}</p>
                : 
                    <p><span className='underline'>Title:</span> {title} by <span className='italic'>{artist}</span></p>
                }

                {genre && 
                    <p><span className='underline'>Genre:</span> {genre}</p>
                }
                {duration && 
                    <p><span className='underline'>Duration:</span> {duration}min</p>
                }
                <p><span className='underline'>Path:</span> {path}</p>
                <p><span className='underline'>Size:</span> {size}kB</p>
            </div>
        </div>
    )
}

export default FileCard;