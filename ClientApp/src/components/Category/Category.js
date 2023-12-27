import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from "./Category.module.scss";
import { useSelector, useDispatch } from 'react-redux';
import { setItem } from "../slice";

export default function Category() {
    const token = sessionStorage.getItem("token");
    const value = useSelector((e) => e.admin.items);
    const sliceCategory = useSelector((e) => e.admin.category);
    const dispatch = useDispatch();



    const deleteitem = async (path) => {
        
        const res = await fetch("https://localhost:7067" + path, {
            method: "delete"
        });
        const contents = await res.json();
        if (contents) {
            window.location.reload();
        }

    }
    
    const deleteCategory = async (id) => {
        const res = await fetch(`https://localhost:7067/api/deletecategory/${id}`, {
            method: "delete"
            
        });
        const contents = await res.json();
        if (contents) {
            window.location.reload();
        }

    }
    

    return (
        <div className={styles["background"]}>
            <div className={styles["background__nav"]}>
                {sliceCategory.map((e) =>
                    <div className={styles["background__nav__child"]} key={e.id}>
                        <div>{e.category}</div>
                        <div onClick={()=> deleteCategory(e.id) }>delete</div>
                    </div>
                )}
            </div>
            <div className={styles["background__items"]}>
                {value.map((e) => {
                    const path = `/category/edit/${e.id}`;
                    const del = `/api/delete/${e.id}/${e.category}/${e.name}`;

                    return (
                        <div className={styles["background__items__child"]} key={e.id}>
                            <div className={styles["background__items__child__image"]}><img src={e.path} alt="image" /></div>
                            <div className={styles["background__items__child__name"]}>{e.name}</div>
                            <div className={styles["background__items__child__amount"]}>{e.amount}</div>
                            <div className={styles["background__items__child__operation"]}>
                                <Link to={path}>EDit</Link>
                                <button onClick={() => deleteitem(del)}>DELETE</button>
                            </div>
                        </div>)
                })}
            </div>
        </div>
    );
  
}
