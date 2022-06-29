import React from 'react';
import { Link } from 'react-router-dom'

const Card = ({ id, img, name, title, artist, genre, size, path, duration, comment }) => {
    return (
        <div className='bg-white rounded-xl flex flex-col justify-between shadow-xl hover:shadow-2xl focus:shadow-2xl'>
            <Link to={`/file/${id}`} className='w-full text-left '>
                <div className='p-4 flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0'>
                    <div>
                        <img src={img} alt={name} />
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
                        <p><span className='underline'>Comment:</span> {comment}</p>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default Card;