import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useThemeContext } from '../providers/ThemeContext';

//COMPONENTS
import Card from '../components/card';

//DATA
import { easyAccessData } from '../providers/ThemeContext';

const Type = () => {
    const { id } = useParams();

    const { dataList } = useThemeContext();

    const getFilesByTypes = () => {
        const files = Object.values(dataList).filter(file => easyAccessData[id].fileType.includes(file.fileType));
        return files;
    };

    return (

        <div className='pt-8 pb-16 max-w-7xl mx-auto px-4 lg:px-8'>
            <h2 className='text-2xl font-bold'>{easyAccessData[id].name}</h2>
            <div className='mt-8 grid md:grid-cols-2 gap-4'>
                {getFilesByTypes().map(file => (
                    <Card key={file.id} id={file.id} img={file.img} title={file.title} artist={file.artist} genre={file.genre} name={file.name} size={file.size} path={file.path} duration={file.duration} comment={file.comment} />
                ))}
            </div>
        </div>
    )
}

export default Type;