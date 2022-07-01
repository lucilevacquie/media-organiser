import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';

//COMPONENTS
import Navigation from '../components/navigation';
import Footer from '../components/footer';

//DATA
import { getCategories, putCategories, getPlaylists, putPlaylists, getData, putData } from "../localStorage";
export const easyAccessData = {
    audio:
    {
        id: 'audio',
        name: 'Audio',
        icon: 'boombox',
        colour: 'orange',
        fileType: ['wav', 'mp3', 'flac', 'aac', 'wma']
    },
    images:
    {
        id: 'images',
        name: 'Images',
        icon: 'camera-retro',
        colour: 'pink',
        fileType: ['jpg', 'png', 'bmp']
    },
    videos:
    {
        id: 'videos',
        name: 'Videos',
        icon: 'camcorder',
        colour: 'lightBlue',
        fileType: ['mov', 'mp4', 'avi', 'wmv', 'flv']
    },
    documents:
    {
        id: 'documents',
        name: 'Documents',
        icon: 'books',
        colour: 'darkBlue',
        fileType: ['pdf', 'doc', 'html', 'txt']
    }
};

//Set context provider
const ThemeContext = createContext();
export const useThemeContext = () => useContext(ThemeContext);

export default function ThemeProvider({ children }) {

    //Store and load the data from localStorage
    const [categories, setCategories] = useState(getCategories());
    useEffect(() => { putCategories(categories) }, [categories]);

    const [playlists, setPlaylists] = useState(getPlaylists());
    useEffect(() => { putPlaylists(playlists) }, [playlists]);

    const [dataList, setDataList] = useState(getData());
    useEffect(() => { putData(dataList) }, [dataList]);

    const [isSearchOpen, setIsSearchOpen] = useState(false);

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

    //Edit a category's name and update its items
    const editCategory = (id, items, newName) => {
        const existingCategory = categories[id];
        existingCategory.name = newName || existingCategory.name;
        existingCategory.items = items || existingCategory.items;
        setCategories({
            ...categories,
            [existingCategory.id]: existingCategory
        })
    };
    //Edit a playlist's name and update its items
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
    //Edit comment from media files
    const editComment = (id, newComment) => {
        const existingMediaFile = dataList[id];
        existingMediaFile.comment = newComment;
        setDataList({
            ...dataList,
            [existingMediaFile.id]: existingMediaFile
        })
    };
    //Handle media file's image
    const editImage = (id, newImage) => {
        console.log(newImage)
        const existingMediaFile = dataList[id];
        existingMediaFile.img = newImage;
        setDataList({
            ...dataList,
            [existingMediaFile.id]: existingMediaFile
        })
    };

    //Available to the provider children
    const values = {
        editImage,
        editComment,
        dataList,
        categories,
        playlists,
        isSearchOpen,
        setIsSearchOpen,
        createCategory,
        editCategory,
        deleteCategory,
        createPlaylist,
        editPlaylist,
        deletePlaylist
    };

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