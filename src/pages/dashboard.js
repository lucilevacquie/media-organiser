import React, { useState } from 'react';
import { useThemeContext } from '../providers/ThemeContext';

//COMPONENTS
import CategoryCard from '../components/categoryCard';
import PlaylistCard from '../components/playlistCard';
import FileCard from '../components/fileCard';
import Modal from '../components/modal';

const Dashboard = () => {

    const [showCreateModal, setShowCreateModal] = useState(false);
    const [modalType, setModalType] = useState('');

    const onClickCreateCategory = () => {
        setShowCreateModal(true)
        setModalType('category')
    }

    const onClickCreatePlaylist = () => {
        setShowCreateModal(true)
        setModalType('playlist')
    }

    const { dataList, categories, playlists, createCategory, createPlaylist } = useThemeContext();

    const onCreateCategoryName = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        createCategory(fd.get('name'));
        setShowCreateModal(false);
    }

    const onCreatePlaylistName = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        createPlaylist(fd.get('name'));
        setShowCreateModal(false);
    }

    return (
        <>
            {showCreateModal &&
                <Modal>
                    {modalType === 'category' ?
                        <>
                            <div className='flex justify-between'>
                                <h3 className='font-bold'>Create a category</h3>
                                <button onClick={() => setShowCreateModal(false)}>
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <form onSubmit={onCreateCategoryName} className='mt-4 flex flex-col space-y-2'>
                                <label>Category name</label>
                                <input type='text' name='name' className='py-2 px-4 border rounded-lg' />
                                <button type='submit' className='mt-4 w-full py-2 px-4 text-center bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white font-semibold'>Create</button>
                            </form>
                        </>
                        :
                        <>
                            <div className='flex justify-between'>
                                <h3 className='font-bold'>Create a playlist</h3>
                                <button onClick={() => setShowCreateModal(false)}>
                                    <i className="fa-solid fa-xmark"></i>
                                </button>
                            </div>
                            <form onSubmit={onCreatePlaylistName} className='mt-4 flex flex-col space-y-2'>
                                <label>Playlist name</label>
                                <input type='text' name='name' className='py-2 px-4 border rounded-lg' />
                                <button type='submit' className='mt-4 w-full py-2 px-4 text-center bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white font-semibold'>Create</button>
                            </form>
                        </>
                    }
                </Modal>
            }

            <div className='relative max-w-7xl mx-auto px-4 lg:px-8'>
                <div className='mt-8'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-xl font-bold'>Categories</h2>
                        <button onClick={() => onClickCreateCategory()} className='md:hidden text-xs text-white font-semibold px-4 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl'>
                            Create category
                        </button>
                    </div>
                    <div>
                        {categories.length === 0 ?
                            <button onClick={() => onClickCreateCategory()} className='hidden mt-4 px-8 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white text-2xl font-bold md:block'>+ Create category</button>
                            :
                            <div className='mt-4 grid grid-col-2 md:grid-cols-5 gap-4'>
                                {Object.values(categories).map(category => (
                                    <CategoryCard key={category.id} id={category.id} name={category.name} />
                                ))}
                                <button onClick={() => onClickCreateCategory()} className='hidden px-8 py-4 bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white font-bold md:block'>+ Create a category</button>
                            </div>
                        }
                    </div>
                </div>
                <div className='mt-8'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-xl font-bold'>Playlists</h2>
                        <button onClick={() => onClickCreatePlaylist()} className='md:hidden text-xs text-white font-semibold px-4 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl'>
                            Create playlist
                        </button>
                    </div>
                    <div>
                        {playlists.length === 0 ?
                            <button onClick={() => onClickCreatePlaylist()} className='hidden mt-4 px-8 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white text-2xl font-bold md:block'>+ Create playlist</button>
                            :
                            <div className='mt-4 grid grid-col-2 md:grid-cols-5 gap-4'>
                                {Object.values(playlists).map(playlist => (
                                    <PlaylistCard key={playlist.id} id={playlist.id} name={playlist.name} />
                                ))}
                                <button onClick={() => onClickCreatePlaylist()} className='hidden px-8 py-4 bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white font-bold md:block'>+ Create a playlist</button>
                            </div>
                        }
                    </div>
                </div>
                {/* List of all the files */}
                <div className='mt-8'>
                    <h2 className='text-xl font-bold'>All Files</h2>
                    <div className='mt-4 grid md:grid-cols-2 gap-4'>
                        {Object.values(dataList).map(file => (
                            <FileCard key={file.id} id={file.id} title={file.title} img={file.img} artist={file.artist} genre={file.genre} name={file.name} size={file.size} path={file.path} duration={file.duration} comment={file.comment} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;