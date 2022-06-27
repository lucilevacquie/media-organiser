import React from 'react';
import { useThemeContext } from '../providers/ThemeContext';

//COMPONENTS
import Card from '../components/card';

const Dashboard = () => {

    const {categories, playlists, setIsModalOpen, setModalType} = useThemeContext();

    return(
        <div className='relative max-w-7xl mx-auto px-4 lg:px-8'>
            <div className='mt-8'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-xl font-bold'>Categories</h2>
                    <button onClick={() => (setIsModalOpen(true) && setModalType('category'))} className='md:hidden text-xs text-white font-semibold px-4 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl'>
                        Create category
                    </button>
                </div>
                <div>
                    {categories.length === 0 ? 
                    <button onClick={() => (setIsModalOpen(true) && setModalType('category'))} className='hidden mt-4 px-8 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white text-2xl font-bold md:block'>+ Create category</button>
                    : 
                    <div className='mt-4 grid grid-cols-2 gap-4 md:flex md:space-x-8'>
                        {categories.map(category => (
                            <Card name={category.name} nbOfFiles={category.nbOfFiles} path={category.path}/>
                        ))}
                        <button onClick={() => (setIsModalOpen(true) && setModalType('category'))} className='hidden px-8 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white text-2xl font-bold md:block'>+</button>
                    </div>
                    }
                </div>
            </div>
            <div className='mt-8'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-xl font-bold'>Playlists</h2>
                    <button onClick={() => (setIsModalOpen(true) && setModalType('playlist'))} className='md:hidden text-xs text-white font-semibold px-4 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl'>
                        Create playlist
                    </button>
                </div>
                <div>
                    {playlists.length === 0 ? 
                    <button onClick={() => (setIsModalOpen(true) && setModalType('playlist'))} className='hidden mt-4 px-8 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white text-2xl font-bold md:block'>+ Create playlist</button>
                    : 
                    <div className='mt-4 grid grid-cols-2 gap-4 md:flex md:space-x-8'>
                        {playlists.map(playlist => (
                            <Card name={playlist.name} nbOfFiles={playlist.nbOfFiles} path={playlist.path}/>
                        ))}
                        <button onClick={() => (setIsModalOpen(true) && setModalType('playlist'))} className='hidden px-8 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white text-2xl font-bold md:block'>+</button>
                    </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard;