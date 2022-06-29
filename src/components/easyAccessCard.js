import React from 'react';
import { Link } from 'react-router-dom'

const EasyAccessCard = ({ id, name, icon, colour }) => {
    return (
        <Link to={`/${id}`} className='w-full p-4 bg-white flex items-center space-x-4 text-left rounded-xl shadow-xl hover:shadow-2xl focus:shadow-2xl'>
            <i className={`fa-solid fa-${icon} text-xl text-${colour}`}></i>
            <div>
                <h3 className='text-semibold'>{name}</h3>
                <p className='text-xs'>D:/media/{id}</p>
            </div>

        </Link>
    )
}

export default EasyAccessCard;