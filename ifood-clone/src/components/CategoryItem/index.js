import React from 'react';

import { CategoryView, CategoryPhoto, CategoryText } from './style';

const CategoryItem = ({ photo, text, key }) => {
    return (
        <CategoryView key={key}>
            <CategoryPhoto source={{
                uri: photo.trim(),
                width: 98,
                height: 58
            }} />
            <CategoryText>{text}</CategoryText>
        </CategoryView>
    );
}

export default CategoryItem;