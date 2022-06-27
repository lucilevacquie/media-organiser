import React, {createContext, useContext, useState} from 'react';
import Footer from '../components/footer';

//COMPONENTS
import Navigation from '../components/navigation';
import Dashboard from '../pages/dashboard';

//DATA
import Categories from './categoryData';
import Playlists from './playlistData';


const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

export default function ThemeProvider() {

    const [categories, setCategories] = useState(Categories);
    const [playlists, setPlaylists] = useState(Playlists);

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');

    const createCategory = (category) => {
        //name
        //nbOfFiles = 0
        //generate path: categories/category-name
        //push to categories array
        const newCategories = [...categories];
        newCategories.push(category);
        setCategories(newCategories);
    }

    const createPlaylist = (playlist) => {
        //name
        //nbOfFiles = 0
        //generate path: playlists/playlist-name
        //push to playlists array
        const newPlaylists = [...playlists];
        newPlaylists.push(playlist);
        setPlaylists(newPlaylists);
    }

    const values = {isSearchOpen, setIsSearchOpen, setIsModalOpen, setModalType}

    const setTitle = () => {
        //default (dashboard)
        let title = ''

        if(window.location.pathname === 'categories'){
            //if slug = categories -> 'Categories'
            title = 'Categories'
        } else if(window.location.pathname === 'playlists'){
            //if slug = playlists -> 'Playlists'
            title = 'Playlists'
        } else {
            title = 'Welcome to Media Org'
        }
        return title
    }

    return(
        <ThemeContext.Provider value={values}>
            <div className='bg-gray-200 py-1'>
                <div className='relative min-h-screen mx-1'>
                    <Navigation title={setTitle()} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}/>
                    <Dashboard categories={categories} playlists={playlists} setIsModalOpen={setIsModalOpen} setModalType={setModalType}/>
                    <Footer/>
                </div>
            </div>

            {isModalOpen && 
            <div className='absolute top-0 left-0'>
                <div className='w-screen h-screen bg-black/40'></div>
                <div className='absolute top-0 w-96 mx-auto p-4 bg-white rounded-xl'>
                    <div className='flex justify-between'>
                    {modalType === 'category' ? 
                        <h3 className='font-bold'>Create a category</h3>
                    : 
                        <h3 className='font-bold'>Create a playlist</h3>
                    }
                        <button onClick={() => setIsModalOpen(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    {modalType === 'category' ? 
                        <form onSubmit={createCategory()} className='mt-4 flex flex-col space-y-2'>
                            <label>Category name</label>
                            <input type='text' className='py-2 px-4 border rounded-lg'/>
                        </form>
                    : 
                        <form onSubmit={createPlaylist()} className='mt-4 flex flex-col space-y-2'>
                            <label>Playlist name</label>
                            <input type='text' className='py-2 px-4 border rounded-lg'/>
                        </form>
                    }
                    <button type='submit' className='mt-4 w-full py-2 px-4 text-center bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white font-semibold'>Create</button>
                </div>
            </div>
            }
        </ThemeContext.Provider>
    )
}