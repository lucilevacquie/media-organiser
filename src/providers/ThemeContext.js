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
    const [categories, setCategories] = useState(defaultCategories);
    const [playlists, setPlaylists] = useState({});
    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const dataList = useRef(data());

    //Create a new category
    const createCategory = (newName) => {
        const newCategory = {
            id: uuidv4(),
            name: newName,
            items: []
        }
        setCategories(curr => ({
            ...curr,
            [newCategory.id]: { ...newCategory }
        }))
    };
    //Create a new playlist
    const createPlaylist = (newName) => {
        const newPlaylist = {
            id: uuidv4(),
            name: newName,
            items: []
        }

        setPlaylists({
            ...playlists,
            [newPlaylist.id]: newPlaylist
        })
    };

    //Edit a category
    const editCategory = (id, newName) => {
        const existingCategory = categories[id];
        existingCategory.name = newName;
        setCategories({
            ...categories,
            [existingCategory.id]: existingCategory
        })
    };
    //Edit a playlist
    const editPlaylist = (id, newName) => {
        const existingPlaylist = playlists[id];
        existingPlaylist.name = newName;
        setPlaylists({
            ...playlists,
            [existingPlaylist.id]: existingPlaylist
        })
    };
    //Delete a category
    const deleteCategory = (categoryId) => {
        const existingCategories = categories;
        delete existingCategories[categoryId];
        setCategories({ ...existingCategories });
    };
    //Delete a playlist
    const deletePlaylist = (playlistId) => {
        const existingPlaylists = playlists;
        delete existingPlaylists[playlistId];
        setPlaylists({ ...existingPlaylists });
    };

    const values = { dataList: dataList.current, categories, playlists, isSearchOpen, setIsSearchOpen, createCategory, editCategory, deleteCategory, createPlaylist, editPlaylist, deletePlaylist };

    return (
        <ThemeContext.Provider value={values}>
            <div className='bg-gray-200 py-1'>
                <div className='relative min-h-screen mx-1'>
                    <Navigation isSearchOpen={isSearchOpen} setIsSearchOpen={setIsSearchOpen} />
                    {children}
                    <Footer />
                </div>
            </div>
        </ThemeContext.Provider>
    )
}