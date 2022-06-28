import React, { createContext, useContext, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

//COMPONENTS
import Navigation from '../components/navigation';
import Footer from '../components/footer';

//DATA
import data from '../mockData';

const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

const defaultCategories = {
    ['123']: {
        id: '123',
        name: "Test Category 1",
        items: [],
    },
}

export default function ThemeProvider({ children }) {

    const dataList = useRef(data());

    const [categories, setCategories] = useState(defaultCategories);
    const [playlists, setPlaylists] = useState({});

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');

    //Create new category / playlist
    let newName = '';
    
    const handleChange = (event) => {
        event.preventDefault();
        newName = event.target.value;
    };

    //Create a new category
    const createCategory = (event) => {
        event.preventDefault();
        // like this bebe
        const newCategory = {
            id:  uuidv4(),
            name: newName,
            items: []
        }
        setCategories({
            ...categories,
            [newCategory.id]: newCategory
        })

        setIsCreateModalOpen(false);
    };
    //Create a new playlist
    const createPlaylist = (event) => {
        event.preventDefault();
        const newPlaylist = {
            id: uuidv4(),
            name: newName,
            items: []
        }

        setPlaylists({
            ...playlists,
            [newPlaylist.id]: newPlaylist
        })

        setIsCreateModalOpen(false);
    };

    //Edit a category
    const editCategory = (event, newName, categoryId) => {
        event.preventDefault();
        
        const existingCategory = categories[categoryId];
        existingCategory.name = newName;
        setCategories({
            ...categories,
            [existingCategory.id]: existingCategory
        })

        setIsEditModalOpen(false);
    };
    //Edit a playlist
    const editPlaylist = (newName, playlistId) => {
        const existingPlaylist = categories[playlistId];
        existingPlaylist.name = newName;
        setPlaylists({
            ...playlists,
            [existingPlaylist.id]: existingPlaylist
        })

        setIsEditModalOpen(false);
    };
    //Delete a category or playlist
    const trashCategory = (categoryId) => {
        const existingCategories = categories;
        delete existingCategories[categoryId];
        setCategories({...existingCategories});

        setIsDeleteModalOpen(false);
    };
    const trashPlaylist = (playlistId) => {
        const existingPlaylists = playlists;
        delete existingPlaylists[playlistId];
        setPlaylists({...existingPlaylists});
        
        setIsDeleteModalOpen(false);
    };

    const values = { dataList: dataList.current, categories, playlists, isSearchOpen, setIsSearchOpen, setIsCreateModalOpen, setIsEditModalOpen, setIsDeleteModalOpen, setModalType };

    return (
        <ThemeContext.Provider value={values}>
            <div className='bg-gray-200 py-1'>
                <div className='relative min-h-screen mx-1'>
                    <Navigation isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
                    {children}
                    <Footer />
                </div>
            </div>

            {modalType === 'category' ? 
            <div>
            {isCreateModalOpen &&
                <div className='absolute z-20 top-0 w-full flex justify-center'>
                    <div className='w-screen h-screen bg-black/40'></div>
                    <div className='absolute top-16 w-96 mx-auto p-4 bg-white rounded-xl'>
                        <div className='flex justify-between'>
                            <h3 className='font-bold'>Create a category</h3>
                            <button onClick={() => setIsCreateModalOpen(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <form onSubmit={createCategory} className='mt-4 flex flex-col space-y-2'>
                            <label>Category name</label>
                            <input type='text' onChange={handleChange} name='name' className='py-2 px-4 border rounded-lg' />
                            <button type='submit' className='mt-4 w-full py-2 px-4 text-center bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white font-semibold'>Create</button>
                        </form>
                    </div>
                </div>
            }
            {isEditModalOpen &&
                <div className='absolute z-20 top-0 w-full flex justify-center'>
                    <div className='w-screen h-screen bg-black/40'></div>
                    <div className='absolute top-16 w-96 mx-auto p-4 bg-white rounded-xl'>
                        <div className='flex justify-between'>
                            <h3 className='font-bold'>Edit category</h3>
                            <button onClick={() => setIsEditModalOpen(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <form onSubmit={editCategory()} className='mt-4 flex flex-col space-y-2'>
                            <label>Category name</label>
                            <input type='text' onChange={handleChange} name='name' className='py-2 px-4 border rounded-lg' />
                            <button type='submit' className='mt-4 w-full py-2 px-4 text-center bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white font-semibold'>Update</button>
                        </form>
                    </div>
                </div>
            }
            {isDeleteModalOpen &&
                <div className='absolute z-20 top-0 w-full flex justify-center'>
                    <div className='w-screen h-screen bg-black/40'></div>
                    <div className='absolute top-16 w-96 mx-auto p-4 bg-white rounded-xl'>
                        <div className='flex justify-between'>
                            <h3 className='font-bold'>Delete category</h3>
                            <button onClick={() => setIsDeleteModalOpen(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <button onClick={() => trashCategory()} className='mt-4 w-full py-2 px-4 text-center bg-red-600 rounded-xl text-white font-semibold'>Yes, I want to delete the category</button>
                        <button onClick={() => setIsDeleteModalOpen(false)} className='w-full py-2 px-4 text-center text-gray-500'>No, I want to keep it</button>
                    </div>
                </div>
            }
            </div>
            : 
            <div>
            {isCreateModalOpen &&
                <div className='absolute z-20 top-0 w-full flex justify-center'>
                    <div className='w-screen h-screen bg-black/40'></div>
                    <div className='absolute top-16 w-96 mx-auto p-4 bg-white rounded-xl'>
                        <div className='flex justify-between'>
                            <h3 className='font-bold'>Create a playlist</h3>
                            <button onClick={() => setIsCreateModalOpen(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <form onSubmit={createPlaylist} className='mt-4 flex flex-col space-y-2'>
                            <label>Playlist name</label>
                            <input type='text' onChange={handleChange} name='name' className='py-2 px-4 border rounded-lg' />
                            <button type='submit' className='mt-4 w-full py-2 px-4 text-center bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white font-semibold'>Create</button>
                        </form>
                    </div>
                </div>
            }
            {isEditModalOpen &&
                <div className='absolute z-20 top-0 w-full flex justify-center'>
                    <div className='w-screen h-screen bg-black/40'></div>
                    <div className='absolute top-16 w-96 mx-auto p-4 bg-white rounded-xl'>
                        <div className='flex justify-between'>
                            <h3 className='font-bold'>Edit playlist</h3>
                            <button onClick={() => setIsEditModalOpen(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <form onSubmit={editPlaylist()} className='mt-4 flex flex-col space-y-2'>
                            <label>Playlist name</label>
                            <input type='text' onChange={handleChange} name='name' className='py-2 px-4 border rounded-lg' />
                            <button type='submit' className='mt-4 w-full py-2 px-4 text-center bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white font-semibold'>Update</button>
                        </form>
                    </div>
                </div>
            }
            {isDeleteModalOpen &&
                <div className='absolute z-20 top-0 w-full flex justify-center'>
                    <div className='w-screen h-screen bg-black/40'></div>
                    <div className='absolute top-16 w-96 mx-auto p-4 bg-white rounded-xl'>
                        <div className='flex justify-between'>
                            <h3 className='font-bold'>Delete playlist</h3>
                            <button onClick={() => setIsDeleteModalOpen(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <button onClick={() => trashPlaylist()} className='mt-4 w-full py-2 px-4 text-center bg-red-600 rounded-xl text-white font-semibold'>Yes, I want to delete the playlist</button>
                        <button onClick={() => setIsDeleteModalOpen(false)} className='w-full py-2 px-4 text-center text-gray-500'>No, I want to keep it</button>
                    </div>
                </div>
            }
            </div>
            }
            
            
        </ThemeContext.Provider>
    )
}