import React from 'react';
import { useParams } from 'react-router-dom';

//DATA
import data from '../mockData';

//COMPONENTS
import AudioFileCard from '../components/audioFileCard';
import ImageCard from '../components/imageFileCard';

const Category = () => {

    const { category } = useParams();

    const {audioItems, imageItems, videoItems, docItems} = data();

    return (
        <div className='pt-8 pb-16 max-w-7xl mx-auto px-4 lg:px-8'>
            <h2 className='text-2xl font-bold'>{category.charAt(0).toUpperCase() + category.slice(1)}</h2>
            
                {category === 'audios' ? 
                    <div className='mt-4 flex flex-col space-y-4'>
                        {audioItems.map(file => (
                            <AudioFileCard key={file.id} title={file.title} artist={file.artist} genre={file.genre} size={file.size}/>
                        ))}
                    </div>
                : category === 'images' ?
                    <div className='mt-4 flex flex-col space-y-4'>
                        {imageItems.map(file => (
                            <ImageCard key={file.id} name={file.name} img={file.img} fileCategory={file.fileCategory} path={file.path} size={file.size}/>
                        ))}
                    </div>
                : category === 'videos' ?
                    <div className='mt-4 flex flex-col space-y-4'>
                        {videoItems.map(file => (
                            <ImageCard key={file.id} title={file.title} artist={file.artist} genre={file.genre} size={file.size}/>
                        ))}
                    </div>
                : category === 'documents' ?
                    <div className='mt-4 flex flex-col space-y-4'>
                        {docItems.map(file => (
                            <ImageCard key={file.id} title={file.title} artist={file.artist} genre={file.genre} size={file.size}/>
                        ))}
                    </div>
                :
                // card for the new categories
                    <div className='mt-4 flex flex-col space-y-4'>
                        {imageItems.map(file => (
                            <ImageCard key={file.id} title={file.title} artist={file.artist} genre={file.genre} />
                        ))}
                    </div>
                }
                
        </div>
    )
}

export default Category;