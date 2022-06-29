import React, { createContext, useContext, useRef, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

//COMPONENTS
import Navigation from '../components/navigation';
import Footer from '../components/footer';

//DATA
import { getCategories, putCategories, getPlaylists, putPlaylists, getData, putData } from "../localStorage";

const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {
    const [categories, setCategories] = useState(getCategories());
    useEffect(() => { putCategories(categories) }, [categories]);

    const [playlists, setPlaylists] = useState(getPlaylists());
    useEffect(() => { putPlaylists(playlists) }, [playlists]);

    const [isSearchOpen, setIsSearchOpen] = useState(false);

    const dataList = useRef(getData());
    useEffect(() => { putData(dataList.current) }, []);

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
    const editCategory = (id, items, newName) => {
        const existingCategory = categories[id];
        existingCategory.name = newName || existingCategory.name;
        existingCategory.items = items || existingCategory.items;
        setCategories({
            ...categories,
            [existingCategory.id]: existingCategory
        })
    };
    //Edit a playlist
    const editPlaylist = (id, items, newName) => {
        const existingPlaylist = playlists[id];
        existingPlaylist.name = newName || existingPlaylist.name;
        existingPlaylist.items = items || existingPlaylist.items;
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
    //Add files to a category
    const addItemToCategory = (id, newItems) => {
        const existingCategory = categories[id];
        existingCategory.items = newItems;
        setCategories({
            ...categories,
            [existingCategory.id]: existingCategory
        })
    }
    //Add files to a playlist
    const addItemToPlaylist = (id, newItems) => {
        const existingPlaylist = playlists[id];
        existingPlaylist.items = newItems;
        setPlaylists({
            ...playlists,
            [existingPlaylist.id]: existingPlaylist
        })
    }

    const values = { addItemToCategory, addItemToPlaylist, dataList: dataList.current, categories, playlists, isSearchOpen, setIsSearchOpen, createCategory, editCategory, deleteCategory, createPlaylist, editPlaylist, deletePlaylist };

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