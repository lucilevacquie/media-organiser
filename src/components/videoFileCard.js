import React from 'react';

const VideoCard = ({ img, title, path, size, duration }) => {
    return (
        <div className='w-full p-4 bg-white flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0 text-left rounded-xl shadow-xl hover:shadow-2xl focus:shadow-2xl'>
            <div>
                <img src={img} alt={title}/>
            </div>
            <div>
                <p><span className='underline'>Title:</span> {title} - {duration} minutes</p>
                <p><span className='underline'>Path:</span> {path}</p>
                <p><span className='underline'>Size:</span> {size}kB</p>
            </div>
        </div>
    )
}

export default VideoCard;