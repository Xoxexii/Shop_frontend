import React, { useState,Suspense } from 'react';
import styles from './Products.module.scss';
import Loading from '../../Loading';

export default function ProductsImage({ imPath }) {

    const [loading, setLoading] = useState(true);

    
    return (<>
        
            <img src={imPath} alt="image" loading="lazy"  />
        
    </>)
}
