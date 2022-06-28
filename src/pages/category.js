import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useThemeContext } from '../providers/ThemeContext';

//COMPONENTS
import FileCard from '../components/fileCard';

const Category = () => {

    const { id } = useParams();

    const { categories, dataList, setIsEditModalOpen, setIsDeleteModalOpen, setModalType } = useThemeContext();

    const { name, items } = categories[id];

    useEffect(() => {
        setModalType('categories'); 
    }, [])

    return (
        <div className='pt-8 pb-16 max-w-7xl mx-auto px-4 lg:px-8'>
            <div className='flex justify-between items-center'>
                <h2 className='text-2xl font-bold'>{name}</h2>
                <div className='flex space-x-2'>
                    <button onClick={() => setIsEditModalOpen(true)} className='flex space-x-2 items-center text-xs text-white font-semibold px-4 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl'>
                        <i className="fa-solid fa-pen-to-square"></i>
                        <span className='hidden md:block'>Edit category</span>
                    </button>
                    <button onClick={() => setIsDeleteModalOpen(true)} className='flex space-x-2 items-center text-xs text-white font-semibold px-4 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl'>
                        <i className="fa-solid fa-trash"></i>
                        <span className='hidden md:block'>Delete category</span>
                    </button>
                </div>
            </div>
            {items.length === 0 ? 
                <div className='mt-8'>
                    <h3>{name} is empty. Select the file you want to add to {name}.</h3>
                    <div className='mt-4 grid md:grid-cols-2 gap-4'>
                        {dataList.map(file => (
                            <FileCard key={file.id} id={file.id} title={file.title} artist={file.artist} genre={file.genre} name={file.name} size={file.size} path={file.path}/>
                        ))}
                    </div>
                </div>
            : 
                <div className='mt-8'>
                    {items.map(item => (
                        <FileCard/>
                    ))}
                </div>
            }
            
            {/* {category === 'audios' ? 
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
                        <VideoCard key={file.id} title={file.title} img={file.img} artist={file.artist} path={file.path} duration={file.duration} size={file.size}/>
                    ))}
                </div>
            : category === 'documents' ?
                <div className='mt-4 flex flex-col space-y-4'>
                    {docItems.map(file => (
                        <DocCard key={file.id} title={file.title} path={file.path} fileType={file.fileType} size={file.size}/>
                    ))}
                </div>
            :
            // card for the new categories
                <div className='mt-4 flex flex-col space-y-4'>
                    {imageItems.map(file => (
                        <ImageCard key={file.id} title={file.title} artist={file.artist} genre={file.genre} />
                    ))}
                </div>
            } */}
        </div>
    )
}

export default Category;