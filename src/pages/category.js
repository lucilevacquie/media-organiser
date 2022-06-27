import React from 'react';
import { useParams } from 'react-router-dom';

const Category = () => {

    const { category } = useParams();

    return (
        <div className='max-w-7xl mx-auto px-4 lg:px-8'>
            hello {category}
        </div>
    )
}

export default Category;