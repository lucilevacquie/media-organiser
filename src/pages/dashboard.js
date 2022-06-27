import React from 'react';
import { useThemeContext } from '../providers/ThemeContext';

//COMPONENTS
import Card from '../components/card';

const Dashboard = () => {

    const onClickCreate = (name) => {
        setIsModalOpen(true)
        setModalType(name)
    }

    const { categories, playlists, setIsModalOpen, setModalType } = useThemeContext();

    return (
        <div className='relative max-w-7xl mx-auto px-4 lg:px-8'>
            <div className='mt-8'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-xl font-bold'>Categories</h2>
                    <button onClick={() => onClickCreate('category')} className='md:hidden text-xs text-white font-semibold px-4 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl'>
                        Create category
                    </button>
                </div>
                <div>
                    {categories.length === 0 ?
                        <button onClick={() => onClickCreate('category')} className='hidden mt-4 px-8 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white text-2xl font-bold md:block'>+ Create category</button>
                        :
                        <div className='mt-4 grid grid-cols-2 gap-4 md:flex md:space-x-8'>
                            {categories.map(category => (
                                <Card key={category.name} name={category.name} numFiles={category.numFiles} path={category.path} />
                            ))}
                            <button onClick={() => onClickCreate('category')} className='hidden px-8 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white text-2xl font-bold md:block'>+</button>
                        </div>
                    }
                </div>
            </div>
            <div className='mt-8'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-xl font-bold'>Playlists</h2>
                    <button onClick={() => onClickCreate('playlist')} className='md:hidden text-xs text-white font-semibold px-4 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl'>
                        Create playlist
                    </button>
                </div>
                <div>
                    {playlists.length === 0 ?
                        <button onClick={() => onClickCreate('playlist')} className='hidden mt-4 px-8 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white text-2xl font-bold md:block'>+ Create playlist</button>
                        :
                        <div className='mt-4 grid grid-cols-2 gap-4 md:flex md:space-x-8'>
                            {playlists.map(playlist => (
                                <Card key={playlist.name} name={playlist.name} numFiles={playlist.numFiles} path={playlist.path} />
                            ))}
                            <button onClick={() => onClickCreate('playlist')} className='hidden px-8 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white text-2xl font-bold md:block'>+</button>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard;