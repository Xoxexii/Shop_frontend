import React, { useState, Suspense} from 'react';
import styles from './custom.module.css';
import BeatLoader from "react-spinners/BeatLoader";


export default function Loading() {

    

    


    

    return (<>
        
        <BeatLoader
            color="#36d7b7"
            cssOverride={{ }}
            loading={true}
            margin={2}
            size={5}
            speedMultiplier={1}

        />
        
    </>)
}