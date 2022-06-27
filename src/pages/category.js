import React from 'react';
import { useParams } from 'react-router-dom';
import audioItems from '../mockData';
import AudioFileCard from '../components/audioFileCard';

const Category = () => {

    const { category } = useParams();
    const items = audioItems();

    console.log(items)

    return (
        <div className='mt-8 max-w-7xl mx-auto px-4 lg:px-8'>
            <h2>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            <div className='mt-4 flex flex-col space-y-4'>
                {items.map(file => (
                    <AudioFileCard key={file.id} title={file.title} artist={file.artist} genre={file.genre} />
                ))}
            </div>
        </div>
    )
}

export default Category;