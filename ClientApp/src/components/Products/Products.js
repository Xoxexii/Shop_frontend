import React, { useState } from 'react';
import styles from './Products.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addCssCategory, addStatusCategory } from "../slice";

export default function Products() {
    
    
    const sliceCategory = useSelector((e) => e.admin.category);
    const cssCategory = useSelector((e) => e.admin.csscategory);
    const statusCategory = useSelector((e) => e.admin.statuscategory);
    const items = useSelector((e) => e.admin.items);
    const dispatch = useDispatch();

    const filterItems = items.filter((e) => e.category == statusCategory)
        
    const sidebarActive = (index,status) => {
        dispatch(addCssCategory(cssCategory.map((e,i) => {
            if (index == i) {
                dispatch(addStatusCategory(status))
                return "background__sidebar__area--active"
            } else {
                return "background__sidebar__area"
            }
        })))
        
    
    }
    return (<>
        <div className={styles["background"]}>
            <div className={styles["background__sidebar"]}>
                {sliceCategory.map((e,index) =>
                    <div className={styles[cssCategory[index]]} key={e.id}>
                        <Link onClick={() => sidebarActive(index,e.category)}>
                            {e.category}
                        </Link>
                    </div>
                )}
            </div>
            <div className={styles["background__items"]}>
                <div className={styles["background__items__area"]}>
                    {statusCategory == "" ? 
                        items.map((e, index) =>
                            <div className={styles["background__items__area__block"]} key={index}>
                                <Link className={styles["background__items__area__block__top"]}>
                                    <img src={e.path} alt="image" style={{ height: 20 + "vh", width: 50 + "%" }} loading="lazy" />
                                    <div>{e.name}</div>
                                    <div style={{ fontSize: 1.25 + "vw", transform: "translateY(-0vh)" }}>{e.price} บาท</div>
                                </Link>
                                <div className={styles["background__items__area__block__bottom"]}>
                                    <small>ใส่ตะกร้า</small>
                                    <small>{e.amount} ชิ้น</small>
                                </div>
                            </div>
                        ) :
                        filterItems.map((e, index) =>
                            <div className={styles["background__items__area__block"]} key={index}>
                                <Link className={styles["background__items__area__block__top"]}>
                                    <img src={e.path} alt="image" style={{ height: 20 + "vh", width: 50 + "%" }} loading="lazy" />
                                    <div>{e.name}</div>
                                    <div style={{ fontSize: 1.25 + "vw", transform: "translateY(-1vh)" }}>{e.price} บาท</div>
                                </Link>
                                <div className={styles["background__items__area__block__bottom"]}>
                                    <small>ใส่ตะกร้า</small>
                                    <small>{e.amount} ชิ้น</small>
                                </div>
                            </div>
                        )
                }
                </div>
            </div>
        </div>
    </>)
}