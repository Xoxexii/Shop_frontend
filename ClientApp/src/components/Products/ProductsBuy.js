import React, { useState, Suspense,useEffect } from 'react';
import styles from './ProductsDetail.module.scss';
import Loading from '../../Loading';

export default function ProductsBuy({ setBuyStatus, setFirstname, setLastname, setEmail, setAddress, setProvinces, setAmphures, setTumbons, setZips }) {

    const [data, setData] = useState([]);
    const [province, setProvince] = useState([]);
    const [amphure, setAmphure] = useState([]);
    const [tumbon, setTumbon] = useState(null);
    const [zip, setZip] = useState("รหัสไปรษณีย์");

    const fetchProvinces = async () => {
        const res = await fetch(`https://raw.githubusercontent.com/kongvut/thai-province-data/master/api_province_with_amphure_tambon.json`);
        const contents = await res.json();
        setData(contents)
    }
    const addProvince = (e) => {
        setProvince(e.target.value);
        setProvinces(e.target.value);
    }
    const addAmphure = (e) => {
        setAmphure(e.target.value);
        setAmphures(e.target.value);
    }

    const addTumbon = (e) => {
        setTumbon(e.target.value);
        setTumbons(e.target.value);
    }
    
    
    useEffect(() => {

        fetchProvinces();
        
        


    }, [])
    useEffect(() => {

        const zipp = data.filter((l) => l.name_th == province).map((e) =>
            e.amphure.filter((m) => m.name_th == amphure).map((am) =>
                am.tambon.filter((n) => n.name_th == tumbon).map((tb, i) => tb.zip_code

                )
            )
        )
        setZip(zipp[0])
        setZips(zipp[0])




    }, [tumbon])
    return (

        <div className={styles["buy__area"]}>
            <div className={styles["input__area"]}>
                <div className={styles["input__title"]}>
                    ชื่อ
                </div>
                <div className={styles["input__field"]}>
                    <input type="text" required onChange={(e) => setFirstname(e.target.value)} />
                </div>
            </div>
            <div className={styles["input__area"]}>
                <div className={styles["input__title"]}>
                    นามสกุล
                </div>
                <div className={styles["input__field"]}>
                    <input type="text" required onChange={(e) => setLastname(e.target.value)} />
                </div>
            </div>
            <div className={styles["input__area"]}>
                <div className={styles["input__title"]}>
                    e-mail
                </div>
                <div className={styles["input__field"]}>
                    <input type="email" required onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>
            <div className={styles["input__area"]}>
                <div className={styles["input__title"]}>
                    ที่อยู่
                </div>
                <div className={styles["input__field"]}>
                    <input type="text" required onChange={(e) => setAddress(e.target.value)} />
                </div>
            </div>
            <div className={styles["input__area"]}>
                <div className={styles["input__title"]}>
                    จังหวัด
                </div>
                <div className={styles["input__field"]}>
                    <select onChange={(e) => addProvince(e)}>
                        <option value="">เลือกจังหวัด</option>
                        {data.map((e,i) =>
                            <option value={e.name_th} key={i}>{e.name_th}</option>
                        )}
                    </select>
                </div>
            </div>
            <div className={styles["input__area"]}>
                <div className={styles["input__title"]}>
                    อำเภอ
                </div>
                <div className={styles["input__field"]}>
                    <select onChange={(e) => addAmphure(e)}>
                        <option value="">เลือกอำเภอ</option>
                        {data.filter((l) => l.name_th == province).map((e) =>
                            e.amphure.map((am,i) => 
                                <option value={am.name_th} key={i}>{am.name_th}</option>
                            )
                        )}
                    </select>
                </div>
            </div>
            <div className={styles["input__area"]}>
                <div className={styles["input__title"]}>
                    ตำบล
                </div>
                <div className={styles["input__field"]}>
                    <select onChange={(e) => addTumbon(e)}>
                        <option value="">ตำบล</option>
                        {data.filter((l) => l.name_th == province).map((e) =>
                            e.amphure.filter((m) => m.name_th == amphure).map((am) =>
                                am.tambon.map((tb,i) =>
                                    <option value={tb.name_th} key={i}>{tb.name_th}</option>
                                )
                            )
                        )}
                    </select>
                </div>
                
            </div>
            <div className={styles["input__area"]}>
                <div className={styles["input__title"]}>
                    รหัสไปรษณีย์
                </div>
                <div className={styles["input__field"]}>
                    {tumbon ?
                        <>
                            {data.filter((l) => l.name_th == province).map((e) =>
                                e.amphure.filter((m) => m.name_th == amphure).map((am) =>
                                    am.tambon.filter((n) => n.name_th == tumbon).map((tb, i) => <input type="text" value={tb.zip_code} readOnly style={{ backgroundColor: "grey" }} id="zip" key={i} />

                                    )
                                )
                            )
                            }
                        </> :
                        <>
                            รหัสไปรษณีย์
                        </>
                    }
                </div>
            </div>
            <div className={styles["button__area"]}>
                <div className={styles["buy__button"]} onClick={() => document.querySelector("." + styles["payment__area"]).style.display = "flex"}>
                    <div>สั่งซื้อสินค้า</div>
                </div>
                <div className={styles["cancel__button"]} onClick={() => setBuyStatus("view")}>
                    <div>X</div>
                </div>
            </div>
        </div>

    )
}



                            