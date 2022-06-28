import React from 'react';

const DocCard = ({ title, path, size, fileType }) => {
    return (
        <div className='w-full p-4 bg-white flex space-x-4 items-center text-left rounded-xl shadow-xl hover:shadow-2xl focus:shadow-2xl'>
            <div className='text-5xl'>
                {fileType === 'pdf' ?
                    <i className="fa-solid fa-file-pdf text-red-600"></i>
                : fileType === 'doc' ?
                    <i className="fa-solid fa-file-word text-blue-500"></i>
                : fileType === 'html' ?
                    <i className="fa-solid fa-file-code text-green-600"></i>
                :
                    <i className="fa-solid fa-file-lines text-gray-400"></i>
                }
            </div>
            <div>
                <p><span className='underline'>Title:</span> {title}</p>
                <p><span className='underline'>Path:</span> {path}</p>
                <p><span className='underline'>Size:</span> {size}kB</p>
            </div>
        </div>
    )
}

export default DocCard;