import React, { useState } from 'react';
import styles from "./Category.module.scss";
import { useSelector, useDispatch } from 'react-redux';
import { setItem } from "../slice";
import { useParams } from "react-router-dom";

export default function EditCategory() {
    const params = useParams();
    const token = sessionStorage.getItem("token");
    const value = useSelector((e) => e.admin.items);
    const dispatch = useDispatch();

    

    const item = value.filter(e => e.id == params.id)

    const [newCategory, setNewCategory] = useState(item.map((e) => e.category)[0])
    const [newName, setNewName] = useState(item.map((e) => e.name)[0])
    const [newPrice, setNewPrice] = useState(item.map((e) => e.price)[0])
    const [newAmount, setNewAmount] = useState(item.map((e) => e.amount)[0])

    const EditItem = async () => {
        const obj = {
            category: newCategory,
            name: newName,
            price: newPrice,
            amount: newAmount,
            token: sessionStorage.getItem("token")

        }
        const response = await fetch(`https://localhost:7067/api/edititem/${params.id}`, {
            method: "PUT",
            headers: {
                
                'Content-Type': 'application/json'
            },

            //make sure to serialize your JSON body
            body: JSON.stringify(obj)
        });

        const content = await response.json();
        if (content) {
            window.location.replace("/category")
        }
    }
    

    return (
        <>
            {item.map((e,index) => 
                <div className={styles["background__edit"]} key={index}>
                    <div className={styles["background__edit__image"]}>
                        <img src={e.imPath1} alt="image" />
                    </div>
                    <div className={styles["background__edit__detail"]}>
                        <div className={styles["background__edit__detail__area"]}>
                            <div className={styles["background__edit__detail__area__category"]}>
                                <div className={styles["background__edit__detail__area__category__label"]}>ประเภทสินค้า</div>
                                <input type="text" placeholder="ใส่ประเภทสินค้า" name="category" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                            </div>
                            <div className={styles["background__edit__detail__area__name"]}>
                                <div className={styles["background__edit__detail__area__name__label"]}>ชื่อสินค้า</div>
                                <input type="text" placeholder="ใส่ชื่อสินค้า" name="name" value={newName} onChange={(e) => setNewName(e.target.value)} />
                            </div>
                            <div className={styles["background__edit__detail__area__price"]}>
                                <div className={styles["background__edit__detail__area__price__label"]}>ราคาสินค้า</div>
                                <input type="text" placeholder="ใส่ราคาสินค้า" name="price" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} />
                            </div>
                            <div className={styles["background__edit__detail__area__amount"]}>
                                <div className={styles["background__edit__detail__area__amount__label"]}>จำนวนสินค้า</div>
                                <input type="text" placeholder="ใส่จำนวนสินค้า" name="amount" value={newAmount} onChange={(e) => setNewAmount(e.target.value)} />
                            </div>
                            <div className={styles["background__edit__detail__area__button"]}>
                                <button onClick={() => EditItem()}>แก้ไขสินค้า</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );

}
