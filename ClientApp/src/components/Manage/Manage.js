﻿import React, { useState,useCallback,useEffect }from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addStatus, addCategory } from "../slice";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import styles from "./Manage.module.scss";
import Cropper from 'react-easy-crop';
import getCroppedImg from './cropimage';


export default function Manage() {
    const [fileURL, setFileURL] = useState("");
    const [fileType, setFileType] = useState("");
    const [category, setCategory] = useState("");
    const [name, setName] = useState("");
    const [price, setPrice] = useState(0);
    const [describe, setDescribe] = useState("");
    const [amount, setAmount] = useState(0);
    const [token, setToken] = useState(sessionStorage.getItem("token"));
    const [image1, setImage1] = useState("");
    const [image2, setImage2] = useState("");
    const [image3, setImage3] = useState("");
    const [image4, setImage4] = useState("");
    const [lastimage, setLastImage] = useState("");
    const [form, setForm] = useState(null);
    const [listCategory, setListCategory] = useState([]);
    const [addcategory, setAddCategory] = useState("");

    const [crop, setCrop] = useState({ x: 0, y: 0 })
    const [zoom, setZoom] = useState(1)
    const [cropAreaPixels, setCropAreaPixels] = useState(null)
    const [cropStatus, setCropStatus] = useState(null)



    const status = useSelector((e) => e.admin.status);
    const sliceCategory = useSelector((e) => e.admin.category);
    const dispatch = useDispatch();

    

    const addItem = async (e) => {
        e.preventDefault();
            dispatch(addStatus(false));
            const obj = {
                category: category,
                name: name,
                price: price,
                amount: amount,
                describe: describe,
                image1: image1,
                image2: image2,
                image3: image3,
                image4: image4,
                token: token
            }
            const response = await fetch("https://localhost:7067/api/additem", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                //make sure to serialize your JSON body
                body: JSON.stringify(obj)
            });
            console.log(obj);
            const content = await response.json();
            await dispatch(addStatus(content));
            await setAmount(0);
            await setFileURL(null);



            const imageres = await fetch("https://localhost:7067/api/addimage", {
                method: "post",
                'Content-Type': 'multipart/form-data',

                //make sure to serialize your JSON body
                body: form
            });
            const contents = await imageres.json();
            
        
        setCategory("");
        setName("");
        setDescribe("");
        setPrice(0);
        setAmount(0);
        window.location.reload();
        
    }

    const getFile = async (e) => {
        const files = e.target.files;
        let form = new FormData()
        for (let i = 0; i < files.length; i++) {
            if (i == 0) {
                await setImage1(files[i].name);
            }
            if (i == 1) {
                await setImage2(files[i].name);
            }
            if (i == 2) {
                await setImage3(files[i].name);
            }
            if (i == 3) {
                await setImage4(files[i].name);
            }
            await form.append("file",files[i])
        }
        await setForm(form);
            
            
        
        
        
        
        /*await setFileType(files[0].type)
        await setCropStatus(true);*/
        
    }

    const categoryChange = (e) => {
       
            document.querySelector("#add__category__area").style.display = "flex";
        
    }

    const categoryAdd = async () => {
        const obj = {
            category: addcategory
        }
        const cateres = await fetch("https://localhost:7067/api/addcategory", {
            method: "post",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
        });
        const contents = await cateres.json();
        document.querySelector("#add__category__area").style.display = "none";
        window.location.reload();
    }
    
    const onCropComplete = (croppedArea, croppedAreaPixels) => {
        setCropAreaPixels(croppedAreaPixels);
    }
    

   
    const showCroppedImage = async () => {
        try {
           

            const croppedImage = await getCroppedImg(
                image1,
                cropAreaPixels,

            )
            let blob = await fetch(croppedImage).then(r => r.blob()).then(blobFile => new File([blobFile], fileURL, { lastModified: new Date().getTime(), type: fileType }));
            
            
            console.log(blob)
            var formData = new FormData();
            await formData.append("file", blob)
            await setForm(formData);
            await setLastImage(croppedImage)
            await setCropStatus(null)
        } catch (e) {
            console.error(e)
        }
    }
    return (
        <>
            <div className={styles.manage_background}>
                <form className={styles.form_background} onSubmit={(e) => addItem(e) }>
                    <div className={styles.form_left}>
                        
                                <div>เลือกรูปภาพ</div>
                                <input type="file" accept="image/*" name="image" onChange={getFile} id="input_file" hidden required multiple="multiple" />
                                 <div onClick={() => document.querySelector("#input_file").click()} className={styles.upload_file_button}>Upload</div>
                                {image1}
                               
                        
                
                </div>
                <div className={styles.form_right}>
                    <div className={styles.form_right_input}>
                            <div style={{ color: 'white' }}>เลือกประเภทสินค้า</div>
                            <select name="category" id="category" className={styles.form_right_input_dropdown} onChange={(e) => setCategory(e.target.value)} required>
                                <option value="">เลือกประเภทสินค้า</option>
                                {sliceCategory.map((e) =>
                                    <option value={e.category} key={e.id}>{e.category}</option>
                                )}
                               
                            </select>
                            <div className={styles.form_right_button_addlistcategory} onClick={() => categoryChange()}><CiSquarePlus /></div>
                    </div>
                    <div className={styles.form_right_input}>
                            <div style={{ color: 'white' }}>ชื่อสินค้า</div>
                            <input type="text" placeholder="ใส่ชื่อสินค้า" name="name" className={styles.form_right_input_text} onChange={(e) => setName(e.target.value)} required />
                    </div>
                    <div className={styles.form_right_input}>
                        <div style={{ color: 'white' }}>ราคา</div>
                        <input type="number" placeholder="ใส่ราคา" name="price" className={styles.form_right_input_number} min="0" onChange={(e) => setPrice(e.target.value)} required/>
                    </div>
                     <div className={styles.form_right_input}>
                            <div style={{ color: 'white' }}>คำบรรยายสินค้า</div>
                            <div className={styles.form_right_input_text}>
                                <textarea placeholder="ใส่คำบรรยาย" onChange={(e) => setDescribe(e.target.value)}></textarea>
                            </div>

                     </div>
                        <div className={styles.form_right_input_button}>
                            <div className={styles.form_right_input} style={{ marginLeft: 2.5 + "vw", marginRight:2.5+"vw" }}>
                                <div style={{ color: 'white'}}> จำนวน</div>
                                <div className={styles.form_right_input_amount}>
                                    <div className={styles.form_right_input_amount_decrease} onClick={(e) => setAmount((e) => e == 0 ? e = e : e - 1)}><CiSquareMinus /></div>
                                    <input className={styles.amount} type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
                                    <div className={styles.form_right_input_amount_increase} onClick={() => setAmount((e) => e + 1)}><CiSquarePlus /></div>
                                </div>

                            </div>
                            <button type="submit" className={styles.form_right_add_button}>เพิ่มสินค้า</button>
                    </div>
                </div>
            </form>
            </div>
            <div className={styles["add__category__area"]} id="add__category__area">
                <div className={styles["add__category__area__blur__background"]} onClick={() => document.querySelector("#add__category__area").style.display = "none"}>
                </div>
                <form className={styles["add__category__area__box"]}>
                    <div>ใส่ประเภทสินค้า</div>
                    <input type="text" onChange={(e) => setAddCategory(e.target.value)} />
                    <button onClick={() => categoryAdd()} type="reset">เพิ่ม</button>
                </form>
            </div>
        </>
    );


}