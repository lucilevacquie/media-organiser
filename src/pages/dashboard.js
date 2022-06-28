import React from 'react';
import { useThemeContext } from '../providers/ThemeContext';

//COMPONENTS
import Card from '../components/card';
import FileCard from '../components/fileCard';

const Dashboard = () => {

    const onClickCreate = (name) => {
        setIsCreateModalOpen(true)
        setModalType(name)
    }

    const { dataList, categories, playlists, setIsCreateModalOpen, setModalType } = useThemeContext();


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
                        <div className='mt-4 grid grid-col-2 md:grid-cols-5 gap-4'>
                            {Object.keys(categories).map(key => (
                                <Card key={categories[key].id} id={categories[key].id} name={categories[key].name} />
                            ))}
                            <button onClick={() => onClickCreate('category')} className='hidden px-8 py-4 bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white font-bold md:block'>+ Create a category</button>
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
                        <div className='mt-4 grid grid-col-2 md:grid-cols-5 gap-4'>
                            {Object.keys(playlists).map(key => (
                                <Card key={playlists[key].id} id={playlists[key].id} name={playlists[key].name} />
                            ))}
                            <button onClick={() => onClickCreate('playlist')} className='hidden px-8 py-4 bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white font-bold md:block'>+ Create a playlist</button>
                        </div>
                    }
                </div>
            </div>
            {/* List of all the files */}
            <div className='mt-8'>
                <h2 className='text-xl font-bold'>All Files</h2>
                <div className='mt-4 grid md:grid-cols-2 gap-4'>
                    {dataList.map(file => (
                        <FileCard key={file.id} id={file.id} title={file.title} img={file.img} artist={file.artist} genre={file.genre} name={file.name} size={file.size} path={file.path} duration={file.duration}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Dashboard;