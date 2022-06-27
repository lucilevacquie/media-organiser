import React, { createContext, useContext, useRef, useState } from 'react';
import Footer from '../components/footer';

//COMPONENTS
import Navigation from '../components/navigation';

//DATA
import Categories from './categoryData';
import Playlists from './playlistData';


const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {

    const [categories, setCategories] = useState(Categories);
    const [playlists, setPlaylists] = useState(Playlists);

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState('');

    const setTitle = () => {
        //default (dashboard)
        let title = ''

        if (window.location.pathname === 'categories') {
            //if slug = categories -> 'Categories'
            title = 'Categories'
        } else if (window.location.pathname === 'playlists') {
            //if slug = playlists -> 'Playlists'
            title = 'Playlists'
        } else {
            title = 'Welcome to Media Org'
        }
        return title
    };

    //Create new category / playlist
    const newObject = useRef({});

    const handleChange = (event) => {
        event.preventDefault();
        newObject.current.name = event.target.value;

        console.log(newObject.current.name)
    };

    const create = (event) => {
        event.preventDefault();

        newObject.current.path = `${modalType}/${newObject.current.name.replaceAll(' ', '-').toLowerCase()}`;
        console.log(newObject.current.path);

        newObject.current.numFiles = 0;
        console.log(newObject.current.numFiles);

        if (modalType === 'category') {
            setCategories([...categories, newObject.current]);
        } else {
            setPlaylists([...playlists, newObject.current]);
        }

        setIsModalOpen(false);
    };

    const values = { categories, playlists, isSearchOpen, setIsSearchOpen, setIsModalOpen, setModalType };

    return (
        <ThemeContext.Provider value={values}>
            <div className='bg-gray-200 py-1'>
                <div className='relative min-h-screen mx-1'>
                    <Navigation title={setTitle()} isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
                    {children}
                    <Footer />
                </div>
            </div>

            {isModalOpen &&
                <div className='absolute z-20 top-0 left-0'>
                    <div className='w-screen h-screen bg-black/40'></div>
                    <div className='absolute top-0 w-96 mx-auto p-4 bg-white rounded-xl'>
                        <div className='flex justify-between'>
                            <h3 className='font-bold'>Create a {modalType}</h3>
                            <button onClick={() => setIsModalOpen(false)}>
                                <i className="fa-solid fa-xmark"></i>
                            </button>
                        </div>
                        <form onSubmit={create} className='mt-4 flex flex-col space-y-2'>
                            <label>{modalType.charAt(0).toUpperCase() + modalType.slice(1)} name</label>
                            <input type='text' onChange={handleChange} name='name' className='py-2 px-4 border rounded-lg' />
                            <button type='submit' className='mt-4 w-full py-2 px-4 text-center bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white font-semibold'>Create</button>
                        </form>
                    </div>
                </div>
            }
        </ThemeContext.Provider>
    )
}