import React, { useContext, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { Link } from 'react-router-dom';
import { formatPrice } from '../utils/formatPrice';

const ProductItem = ({ id, image, name, price }) => {
    const { currency } = useContext(ShopContext);
    const [imageLoaded, setImageLoaded] = useState(false);

    return (
        <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
            <div className='overflow-hidden rounded-lg'>
                <img 
                    className={`w-full h-64 sm:h-72 md:h-80 object-cover hover:scale-110 transition ease-in-out duration-300 ${
                        imageLoaded ? 'opacity-100' : 'opacity-0'
                    }`}
                    src={image[0]} 
                    alt={name}
                    loading="lazy"
                    onLoad={() => setImageLoaded(true)}
                />
                {!imageLoaded && (
                    <div className="w-full h-64 sm:h-72 md:h-80 bg-gray-200 animate-pulse rounded-lg"></div>
                )}
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{formatPrice(price)}</p>
        </Link>
    );
}

export default ProductItem;