import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useThemeContext } from '../providers/ThemeContext';

//COMPONENTS
import FileCardSelect from '../components/fileCardSelect';
import FileCard from '../components/fileCard';
import Modal from '../components/modal';

const Category = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const { categories, dataList, editCategory, deleteCategory, addItemToCategory } = useThemeContext();

    console.log(categories);

    const { name, items } = categories[id];

    console.log(items)

    const onEditCategoryName = event => {
        event.preventDefault();
        const fd = new FormData(event.target);
        editCategory(id, null, fd.get('name'));
        setShowEditModal(false);
    }

    const onDeleteCategory = () => {
        deleteCategory(id);
        setShowDeleteModal(false);
        navigate('/');
    }

    const onEditCategoryItems = event => {
        event.preventDefault();
        editCategory(id, selectedItems, null);
        setSelectedItems([]);
        navigate(`/category/${id}`);
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

    return (
        <>
            {showEditModal && (
                <Modal>
                    <div className='flex justify-between'>
                        <h3 className='font-bold'>Edit Category</h3>
                        <button onClick={() => setShowEditModal(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <form onSubmit={onEditCategoryName} className='mt-4 flex flex-col space-y-2'>
                        <label>Category name</label>
                        <input type='text' name='name' className='py-2 px-4 border rounded-lg' />
                        <button type='submit' className='mt-4 w-full py-2 px-4 text-center bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white font-semibold'>Update</button>
                    </form>
                </Modal>
            )}
            {showDeleteModal && (
                <Modal>
                    <div className='flex justify-between'>
                        <h3 className='font-bold'>Delete category</h3>
                        <button onClick={() => setShowDeleteModal(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <button onClick={() => onDeleteCategory()} className='mt-4 w-full py-2 px-4 text-center bg-red-600 rounded-xl text-white font-semibold'>Yes, I want to delete the category</button>
                    <button onClick={() => setShowDeleteModal(false)} className='w-full py-2 px-4 text-center text-gray-500'>No, I want to keep it</button>
                </Modal>
            )}
            <div className='pt-8 pb-16 max-w-7xl mx-auto px-4 lg:px-8'>
                <div className='flex justify-between items-center'>
                    <h2 className='text-2xl font-bold'>{name}</h2>
                    <div className='flex space-x-2'>
                        <button onClick={() => setShowEditModal(true)} className='flex space-x-2 items-center text-xs text-white font-semibold px-4 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl'>
                            <i className="fa-solid fa-pen-to-square"></i>
                            <span className='hidden md:block'>Edit category</span>
                        </button>
                        <button onClick={() => setShowDeleteModal(true)} className='flex space-x-2 items-center text-xs text-white font-semibold px-4 py-2 bg-gradient-to-r from-lightBlue to-pink rounded-xl'>
                            <i className="fa-solid fa-trash"></i>
                            <span className='hidden md:block'>Delete category</span>
                        </button>
                    </div>
                </div>
                {items.length === 0 ?
                    <div className='mt-8'>
                        <h3>{name} is empty. Select the file you want to add to {name}.</h3>
                        <form onSubmit={onEditCategoryItems} className='mt-4 grid md:grid-cols-2 gap-4'>
                            {dataList.map(file => (
                                <FileCardSelect onSelectItem={onSelectItem} key={file.id} id={file.id} img={file.img} title={file.title} artist={file.artist} genre={file.genre} name={file.name} size={file.size} path={file.path} duration={file.duration} />
                            ))}
                            <button type='submit'>Add to {name}</button>
                        </form>
                    </div>
                    :
                    <div className='mt-8'>
                        {items.map(item => (
                            <FileCard key={item.id} id={item.id} img={item.img} title={item.title} artist={item.artist} genre={item.genre} name={item.name} size={item.size} path={item.path} duration={item.duration} />
                        ))}
                    </div>
                }
            </div>
        </>
    )
}

export default Category;