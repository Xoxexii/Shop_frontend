import React from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addAdmin, addAdmin2 } from "./slice";

export default function Home() {
    const value = useSelector((e) => e.admin.admin);
    const value2 = useSelector((e) => e.admin.admin2);
    const dispatch = useDispatch()

    
            return (
                <div>
                    Home
                </div>
            );
        
    
}
