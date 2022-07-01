import React from 'react';

const FileCardSelect = ({ id, img, name, title, artist, genre, size, path, duration, onSelectItem, comment }) => {

    return (
        <div className='w-full bg-white rounded-xl flex flex-col justify-between text-left shadow-xl hover:shadow-2xl focus:shadow-2xl'>
            <div className='p-4 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0'>
                <div>
                    <img src={img} alt={name} />
                </div>
                <div className='flex flex-col space-y-2'>
                    {name ?
                        <p><span className='underline text-darkBlue font-semibold'>Name:</span> {name}</p>
                        :
                        <p><span className='underline text-darkBlue font-semibold'>Title:</span> {title} by <span className='italic'>{artist}</span></p>
                    }

                    {genre &&
                        <p><span className='underline text-darkBlue font-semibold'>Genre:</span> {genre}</p>
                    }
                    {duration &&
                        <p><span className='underline text-darkBlue font-semibold'>Duration:</span> {duration}min</p>
                    }
                    <p><span className='underline text-darkBlue font-semibold'>Path:</span> {path}</p>
                    <p><span className='underline text-darkBlue font-semibold'>Size:</span> {size}kB</p>
                    <p><span className='underline text-darkBlue font-semibold'>Comment:</span> {comment}</p>
                </div>
            </div>
            <div className='bg-lightBlue/20 rounded-b-xl p-4'>
                <div className='flex space-x-2 items-center'>
                    <input type='checkbox' name='checkbox' onChange={(event) => onSelectItem(event, id)} />
                    <label className='font-semibold'>Add to the list</label>
                </div>
            </div>
        </div>
    )
}

export default FileCardSelect;