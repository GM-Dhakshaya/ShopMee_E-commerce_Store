import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(()=>{
        if(location.pathname.includes('collection')){
            setVisible(true);
        }else{
            setVisible(false);
        }
    },[location.pathname]);

    return showSearch && visible ? (
        <div className='fixed top-20 left-0 right-0 z-40 border-t border-b bg-white shadow-md'>
            <div className='max-w-7xl mx-auto px-6 py-4'>
                <div className='flex items-center justify-center gap-3'>
                    <div className='inline-flex items-center justify-center border border-gray-400 px-5 py-3 rounded-full w-3/4 sm:w-1/2 bg-white'>
                        <input 
                            className='flex-1 outline-none bg-inherit text-sm' 
                            type="text" 
                            placeholder='Search products...' 
                            value={search} 
                            onChange={(e)=>setSearch(e.target.value)}
                        />
                        <img src={assets.search_icon} alt="" className='w-4'/>
                    </div>
                    <button 
                        onClick={()=>setShowSearch(false)}
                        className='p-2 rounded-full hover:bg-gray-100 transition-colors duration-300'
                    >
                        <img src={assets.cross_icon} alt="" className='w-4'/>
                    </button>
                </div>
            </div>
        </div>
    ) : null;
}

export default SearchBar