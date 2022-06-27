import React, {createContext, useContext, useState} from 'react';
import Footer from '../components/footer';

//COMPONENTS
import Navigation from '../components/navigation';
import Dashboard from '../pages/dashboard';

//DATA
const categories = [
    {
        name: 'Images',
        nbOfFiles: 15 
    },
    {
        name: 'Documents',
        nbOfFiles: 10 
    },
    {
        name: 'Videos',
        nbOfFiles: 5 
    },
    {
        name: 'Audios',
        nbOfFiles: 0 
    }
];

const playlists = [
    {
        name: 'Playlist 1',
        nbOfFiles: 25
    },
    {
        name: 'Playlist 2',
        nbOfFiles: 35 
    },
    {
        name: 'Playlist 3',
        nbOfFiles: 45 
    },
    {
        name: 'Playlist 4',
        nbOfFiles: 55 
    }
];

const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

export default function ThemeProvider() {

    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');

    const createCategory = () => {}

    const createPlaylist = () => {}

    const values = {isSearchOpen, setIsSearchOpen, setIsModalOpen, setModalType}

    return(
        <ThemeContext.Provider value={values}>
            <div className='bg-gray-200 py-1'>
                <div className='relative min-h-screen mx-1'>
                    <Navigation isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen}/>
                    <Dashboard categories={categories} playlists={playlists} setIsModalOpen={setIsModalOpen} setModalType={setModalType}/>
                    <Footer/>
                </div>
            </div>

            {isModalOpen && 
            <div className='absolute top-0 left-0'>
                <div className='w-screen h-screen bg-black/40'></div>
                <div className='absolute top-0 max-w-3xl mx-auto p-4 bg-white rounded-xl'>
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
                        <form onSubmit={createCategory()}>
                            <label>Category name</label>
                            <input type='text'/>
                        </form>
                    : 
                        <form onSubmit={createPlaylist()}>
                            <label>Playlist name</label>
                            <input type='text'/>
                        </form>
                    }
                    <button type='submit'>Create</button>
                </div>
            </div>
            }
        </ThemeContext.Provider>
    )
}