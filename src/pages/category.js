import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useThemeContext } from '../providers/ThemeContext';

//COMPONENTS
import FileCardSelect from '../components/fileCardSelect';
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
                            <FileCardSelect key={file.id} id={file.id} img={file.img} title={file.title} artist={file.artist} genre={file.genre} name={file.name} size={file.size} path={file.path} duration={file.duration}/>
                        ))}
                    </div>
                </div>
            : 
                <div className='mt-8'>
                    {items.map(item => (
                        <FileCard key={item.id} id={item.id} img={item.img} title={item.title} artist={item.artist} genre={item.genre} name={item.name} size={item.size} path={item.path} duration={item.duration}/>
                    ))}
                </div>
            }
        </div>
    )
}

export default Category;