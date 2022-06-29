import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useThemeContext } from '../providers/ThemeContext';

//ASSETS
import Background from '../img/background-img.jpeg';

//COMPONENTS
import Modal from '../components/modal';

const File = () => {

    const { id } = useParams();

    const [showEditCommentModal, setShowEditCommentModal] = useState(false);

    const { dataList, editComment } = useThemeContext();

    const { name, title, artist, genre, path, comment, img, type } = dataList[id];

    const onEditComment = (event) => {
        event.preventDefault();
        const fd = new FormData(event.target);
        editComment(id, fd.get('comment'));
        setShowEditCommentModal(false);
    }

    return (
        <>
            {showEditCommentModal && (
                <Modal>
                    <div className='flex justify-between'>
                        <h3 className='font-bold'>Update media file comment</h3>
                        <button onClick={() => setShowEditCommentModal(false)}>
                            <i className="fa-solid fa-xmark"></i>
                        </button>
                    </div>
                    <form onSubmit={onEditComment} className='mt-4 flex flex-col space-y-2'>
                        <label>New comment</label>
                        <input type='text' name='comment' className='py-2 px-4 border rounded-lg' />
                        <button type='submit' className='mt-4 w-full py-2 px-4 text-center bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white font-semibold'>Update</button>
                    </form>
                </Modal>
            )}
            <div className='pt-8 pb-16 max-w-7xl mx-auto px-4 lg:px-8'>
                {name ?
                    <h2 className='text-2xl font-bold'>{name}</h2>
                    :
                    <h2 className='text-2xl'><span className='font-bold'>{title}</span> by <span className='italic'>{artist}</span></h2>
                }
                <div className='mt-8 grid md:grid-cols-2 gap-8'>
                    <div>
                        <div className='p-4 bg-white rounded-xl'>
                            <h3 className='mb-4 font-bold'>Media file's details</h3>
                            <div className='flex flex-col space-y-4'>
                                {genre && <p><span className='underline'>Genre:</span> {genre}</p>}
                                <p><span className='underline'>Type:</span> {type}</p>
                                <p><span className='underline'>Path:</span> {path}</p>
                                <p><span className='underline'>Comment:</span> {comment}</p>
                            </div>
                        </div>
                        <div className='flex space-x-4'>
                            <button onClick={() => setShowEditCommentModal(true)} className='mt-4 w-1/3 py-2 px-4 text-center bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white font-semibold'>Update comment</button>
                            {/* <button onClick={() => onDeleteComment()} className='mt-4 w-1/3 py-2 px-4 text-center bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white font-semibold'>Delete comment</button> */}
                        </div>
                    </div>

                    {img ?
                        <div>
                            <div>
                                <img src={img} alt={name} />
                            </div>
                            <button className='mt-4 w-1/3 py-2 px-4 text-center bg-gradient-to-r from-lightBlue to-pink rounded-xl text-white font-semibold'>Change image</button>
                        </div>
                        :
                        <div className='w-full h-full bg-center rounded-xl flex justify-center items-center' style={{ backgroundImage: `url(${Background})` }}>
                            <button className='py-2 px-4 text-center bg-white rounded-xl text-pink font-semibold'>Add image</button>
                        </div>
                    }

                </div>
            </div>
        </>

    )
}

export default File;