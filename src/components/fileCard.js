import React from 'react';

const FileCard = ({ id, img, name, title, artist, genre, size, path }) => {
    return (
        <div className='w-full text-left rounded-xl shadow-xl hover:shadow-2xl focus:shadow-2xl'>
            <div className='p-4 bg-white rounded-t-xl flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0'>
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
                    
                    <p><span className='underline'>Path:</span> {path}</p>
                    <p><span className='underline'>Size:</span> {size}kB</p>
                </div>
            </div>
            <div className='bg-blue-200 rounded-b-xl p-4'>
                <div className='flex space-x-2 items-center'>
                    <input type='checkbox' value={id}/>
                    <label>Add to category</label>
                </div>
            </div>
        </div>
    )
}

export default FileCard;