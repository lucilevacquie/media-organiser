import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useThemeContext } from '../providers/ThemeContext';

//COMPONENTS
import FileCardSelect from '../components/fileCardSelect';
import FileCard from '../components/fileCard';
import Modal from '../components/modal';

//FILE TYPE
const fileTypes = ['wav', 'mp3', 'flac', 'alac', 'dsd']

const Playlist = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const { playlists, dataList, editPlaylist, deletePlaylist } = useThemeContext();

    const { name, items } = playlists[id];

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showDropdown, setShowDropdown] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const getAudioFiles = () => {
        const audioFiles = Object.values(dataList).filter(file => fileTypes.includes(file.fileType));
        return audioFiles.filter(file => !items.includes(file.id));
    };

    const onEditPlaylistName = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        editPlaylist(id, null, fd.get('name'));
        setShowEditModal(false);
    }

    const onDeletePlaylist = () => {
        deletePlaylist(id);
        setShowDeleteModal(false);
        navigate('/');
    }

    const onEditPlaylistItems = event => {
        event.preventDefault();
        editPlaylist(id, [...items, ...selectedItems], null);
        setSelectedItems([]);
        navigate(`/playlist/${id}`);
    };

    const onSelectItem = (event, id) => {
        if (event.target.checked && !selectedItems.includes(id)) {
            setSelectedItems([...selectedItems, id]);
        } else if (event.target.checked) {
            const items = selectedItems;
            items.splice(items.indexOf(id), 1);
            selectedItems([...items]);
        }
    }

    const newDataList = () => {
        const nonSelectedItems = Object.values(getAudioFiles()).filter(item => !items.includes(item.id));
        return nonSelectedItems;
    }

    const removeItem = (event, fileID) => {
        event.stopPropagation();
        const items = playlists[id].items;
        items.splice(items.indexOf(fileID), 1);
        editPlaylist(id, items, null);
    }

    const sortByAlphabeticalOrder = (order = 'asc') => {
        const sortedItems = items.sort((a, b) => {
            const itemA = dataList[a];
            const itemB = dataList[b];

            if (itemA.title > itemB.title) return order === 'asc' ? 1 : -1;
            if (itemA.title < itemB.title) return order === 'asc' ? -1 : 1;
            return 0
        });
        editPlaylist(id, sortedItems, null);
    }

    return (
        <>
            {showEditModal && (
                <Modal>
                    <div className='flex justify-between'>
                        <h3 className='font-bold'>Edit playlist</h3>
                        <button onClick={() => setShowEditModal(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <form onSubmit={onEditPlaylistName} className='mt-4 flex flex-col space-y-2'>
                        <label>Playlist name</label>
                        <input type='text' name='name' className='py-2 px-4 border rounded-lg' />
                        <button type='submit' className='mt-4 w-full py-2 px-4 text-center bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white font-semibold'>Update</button>
                    </form>
                </Modal>
            )}
            {showDeleteModal && (
                <Modal>
                    <div className='flex justify-between'>
                        <h3 className='font-bold'>Delete playlist</h3>
                        <button onClick={() => setShowDeleteModal(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <button onClick={() => onDeletePlaylist()} className='mt-4 w-full py-2 px-4 text-center bg-red-600 rounded-xl text-white font-semibold'>Yes, I want to delete the playlist</button>
                    <button onClick={() => setShowDeleteModal(false)} className='w-full py-2 px-4 text-center text-gray-500'>No, I want to keep it</button>
                </Modal>
            )}
            <div className='pt-8 pb-16 max-w-7xl mx-auto px-4 lg:px-8'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-2xl font-bold'>{name}</h2>
                    <div className='flex space-x-2'>
                        <div className='relative'>
                            <button onClick={() => setShowDropdown(!showDropdown)} className='flex space-x-2 items-center text-xs text-white font-semibold px-4 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl'>
                                <i className="fa-solid fa-arrow-down-arrow-up"></i>
                                <span className='hidden md:block'>Sort playlist</span>
                            </button>
                            {showDropdown &&
                                <div className='absolute p-2 bg-white text-left text-xs flex flex-col rounded-lg shadow-xl'>
                                    <button onClick={() => sortByAlphabeticalOrder('asc')} className='p-1 rounded-lg hover:bg-gray-100'>By ascending alphabetical order</button>
                                    <button onClick={() => sortByAlphabeticalOrder('des')} className='p-1 rounded-lg hover:bg-gray-100'>By descending alphabetical order</button>
                                </div>
                            }
                        </div>
                        <button onClick={() => setShowEditModal(true)} className='flex space-x-2 items-center text-xs text-white font-semibold px-4 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl'>
                            <i className="fa-solid fa-pen-to-square"></i>
                            <span className='hidden md:block'>Edit playlist</span>
                        </button>
                        <button onClick={() => setShowDeleteModal(true)} className='flex space-x-2 items-center text-xs text-white font-semibold px-4 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl'>
                            <i className="fa-solid fa-trash"></i>
                            <span className='hidden md:block'>Delete playlist</span>
                        </button>
                    </div>
                </div>
                {items.length === 0 ?
                    <div className='mt-8'>
                        <h3>{name} is empty. Select the file you want to add to {name}.</h3>
                        <form onSubmit={onEditPlaylistItems}>
                            <div className='mt-4 grid md:grid-cols-2 gap-4'>
                                {Object.values(getAudioFiles()).map(file => (
                                    <FileCardSelect onSelectItem={onSelectItem} key={file.id} id={file.id} img={file.img} title={file.title} artist={file.artist} genre={file.genre} name={file.name} size={file.size} path={file.path} duration={file.duration} comment={file.comment} />
                                ))}
                            </div>
                            <button type='submit' className='mt-4 w-1/3 py-2 px-4 text-center bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white font-semibold'>Add to {name}</button>
                        </form>

                    </div>
                    :
                    <div className='mt-8 '>
                        <div className='grid md:grid-cols-2 gap-4'>
                            {items.map(item => {
                                const fileItem = dataList[item]
                                return <FileCard removeItem={removeItem} key={fileItem.id} id={fileItem.id} img={fileItem.img} title={fileItem.title} artist={fileItem.artist} genre={fileItem.genre} name={fileItem.name} size={fileItem.size} path={fileItem.path} duration={fileItem.duration} comment={fileItem.comment} />
                            })}
                        </div>
                        {/* Add more files */}
                        <form onSubmit={onEditPlaylistItems} className='mt-12'>
                            <div className='flex justify-between items-center'>
                                <h3 className='font-semibold'>Add more file to {name}</h3>
                                <button type='submit' className='mt-4 w-1/3 py-2 px-4 text-center bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white font-semibold'>Add to {name}</button>
                            </div>
                            <div className='mt-4 grid md:grid-cols-2 gap-4'>
                                {getAudioFiles().map(file => (
                                    <FileCardSelect onSelectItem={onSelectItem} key={file.id} id={file.id} img={file.img} title={file.title} artist={file.artist} genre={file.genre} name={file.name} size={file.size} path={file.path} duration={file.duration} comment={file.comment} />
                                ))}
                            </div>
                        </form>
                    </div>
                }
            </div>
        </>
    )
}

export default Playlist;