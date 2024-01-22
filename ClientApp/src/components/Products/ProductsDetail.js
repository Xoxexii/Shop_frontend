import React, { useState,Suspense,lazy,useEffect } from 'react';
import styles from "./ProductsDetail.module.scss";
import { useSelector, useDispatch } from 'react-redux';
import { setItem } from "../slice";
import { useParams } from "react-router-dom";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import Loading from '../../Loading';
import ProductsBuy from './ProductsBuy';
import QR from "./QR.png"

const ProductsImage = lazy(() => import('./ProductsImage.js'));

export default function ProductsDetail() {
    let { productsCategory, productsName, productsId } = useParams();

    const token = sessionStorage.getItem("token");
    const value = useSelector((e) => e.admin.items);
    const dispatch = useDispatch();

    


    const item = value.filter(e => e.id == productsId)

    const [activeImage, setActiveImage] = useState("");
    const [buyStatus, setBuyStatus] = useState("view");
  
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [address, setAddress] = useState("");
    const [provinces, setProvinces] = useState("");
    const [amphures, setAphures] = useState("");
    const [tumbons, setTumbons] = useState("");
    const [zips, setZips] = useState(0);

    const [slipAmount, setSlipAmount] = useState(1);
    const [slipStatus, setSlipStatus] = useState(false);

    const CounterAmount = (icon,e) => {
        if (icon == "+") {
            if (slipAmount < e) {
                setSlipAmount((e) => e + 1);
            } else if (slipAmount >= e) {
                setSlipAmount((e) => e);
            }
        } else if (icon == "-") {
            if (slipAmount <= 1) {
                setSlipAmount((e) => e);
            } else if (slipAmount > 1) {
                setSlipAmount((e) => e - 1);
            }
        }
    }
    const CheckSlip = async (file,p) => {
        const files = file.target.files;
        let form = new FormData();
        await form.append("file", files[0])
        const res = await fetch("https://developer.easyslip.com/api/v1/verify", {
            method: "post",
            'Content-Type': 'multipart/form-data',
            'headers': {
                'Authorization': 'Bearer 9aca7c46-8624-40bc-89b7-f6726ac064df'
            },

            //make sure to serialize your JSON body
            body: form
        });
        const slip = await res.json();
        console.log(slip);
        if (slip.data.amount.amount == (p.price * slipAmount) && slip.data.receiver.account.name.th == "นายชนกชนน์ ค") {
            setSlipStatus((e) => true)
        } else {
            setSlipStatus((e) => e)
        }
    }

    useEffect(() => {

        
        
        setActiveImage(item[0]?.imPath1);
        





    }, [value])

    return (
        <>
            {item.map((e) =>
                <div key={e.id} style={{ display: "flex" }}>
                <div className={styles["background__area"]}>
                    <div className={styles["background__area__left"]}>
                            <div className={styles["main__image__area"]}>
                                <Suspense fallback={<Loading />}>
                                    <ProductsImage imPath={activeImage} />
                                </Suspense>
                            </div>
                            <div className={styles["common__image__area"]}>
                                <div className={styles["common__image__area__element"]}>
                                    <div className={styles["common__image__area__element__image"]} onClick={() => setActiveImage(e.imPath1)}>
                                        <Suspense fallback={<Loading />}>
                                            <ProductsImage imPath={e.imPath1} />
                                        </Suspense>
                                    </div>
                                </div>
                                <div className={styles["common__image__area__element"]}>
                                    <div className={styles["common__image__area__element__image"]} onClick={() => setActiveImage(e.imPath2)}>
                                        <Suspense fallback={<Loading />}>
                                            <ProductsImage imPath={e.imPath2} />
                                        </Suspense>
                                    </div>
                                </div>
                                <div className={styles["common__image__area__element"]}>
                                    <div className={styles["common__image__area__element__image"]} onClick={() => setActiveImage(e.imPath3)}>
                                        <Suspense fallback={<Loading />}>
                                            <ProductsImage imPath={e.imPath3} />
                                        </Suspense>
                                    </div>
                                </div>
                                <div className={styles["common__image__area__element"]}>
                                    <div className={styles["common__image__area__element__image"]} onClick={() => setActiveImage(e.imPath4)}>
                                        <Suspense fallback={<Loading />}>
                                            <ProductsImage imPath={e.imPath4} />
                                        </Suspense>
                                    </div>
                                </div>
                            </div>  
                    </div>
                        <div className={styles["background__area__right"]}>
                            {buyStatus == "view" ?
                                <div className={styles["view__area"]}>
                                    <div className={styles["text__header"]}>
                                        " {e.name} "
                                    </div>
                                    <div className={styles["text__detail"]}>
                                        <div>
                                            {e.describe}
                                        </div>
                                    </div>
                                    <div className={styles["button__area"]}>
                                        <div style={{ padding: 2 + "vw" }}>ใส่รถเข็น</div>
                                        <div style={{ padding: 2 + "vw" }} onClick={() => setBuyStatus("buy")}>ซื้อสินค้า</div>
                                    </div>
                                </div> :
                                <ProductsBuy
                                    setBuyStatus={setBuyStatus}
                                    setFirstname={setFirstname}
                                    setLastname={setLastname}
                                    setEmail={setEmail}
                                    setAddress={setAddress}
                                    setProvinces={setProvinces}
                                    setAmphures={setAphures}
                                    setTumbons={setTumbons}
                                    setZips={setZips}
                                />
                        }
                        </div>
                    </div>
                    <div className={styles["payment__area"]} >
                        <div className={styles["payment__background__area"]} onClick={() => document.querySelector("." + styles["payment__area"]).style.display = "none"}></div>
                        <div className={styles["payment__component__area"]}>
                            <div className={styles["payment__component__area__left"]}>
                                <div className={styles["left__product__name"]}>
                                    {e.name}
                                </div>
                                <div className={styles["left__product__image"]}>
                                    <img src={e.imPath1} loading="lazy" />
                                </div>
                                <div className={styles["left__product__amount"]}>
                                    <div style={{ fontWeight: "bold" }}>จำนวน</div>
                                    <div className={styles["left__product__amount__counter"]}>
                                        <CiSquareMinus className={styles["icon"]} onClick={() => CounterAmount("-",e.amount)} />
                                        <div>{slipAmount}</div>
                                        <CiSquarePlus className={styles["icon"]} onClick={() => CounterAmount("+", e.amount)} />
                                    </div>
                                </div>
                                <div className={styles["left__product__price"]}>
                                    <div style={{ fontWeight: "bold" }}>ราคา</div>
                                    <div style={{ fontSize:2 +"vw" }}>
                                        {e.price * slipAmount}
                                    </div>
                                </div>
                                <div className={styles["left__product__payment"]}>
                                    <div className={styles["left__product__payment__qr"]}>
                                        <img src={QR} />
                                        <div >
                                            <small style={{ display: "flex", justifyContent: "center", alignItems: "center", margin:0.5 + "vw" }}>นาย ชนกชนน์ คงสัมฤทธิ์</small>
                                            <small style={{ display: "flex", justifyContent: "center", alignItems: "center", margin: 0.5 + "vw" }}>
                                                <input type="file" hidden id="slip" onChange={(file) => CheckSlip(file,e)} />
                                                <button onClick={() => document.querySelector("#slip").click()} className={styles["slip__upload"]}>อัพโหลดสลิป</button>
                                            </small>
                                        </div>
                                    </div>
                                    <div className={styles["left__product__payment__status"]}>
                                        <small>สถานะการชำระเงิน</small>
                                        {slipStatus ? 
                                            <small>แล้ว</small> 
                                            :
                                            <small><Loading /></small>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={styles["payment__component__area__right"]}>
                                <div className={styles["payment__component__area__right__detail__area"]}>
                                    <div className={styles["payment__component__area__right__detail__area__topic"]}>ชื่อ</div>
                                    <div className={styles["payment__component__area__right__detail__area__detail"]}>{firstname}</div>
                                </div>
                                <div className={styles["payment__component__area__right__detail__area"]}>
                                    <div className={styles["payment__component__area__right__detail__area__topic"]}>นามสกุล</div>
                                    <div className={styles["payment__component__area__right__detail__area__detail"]}>{lastname}</div>
                                </div>
                                <div className={styles["payment__component__area__right__detail__area"]}>
                                    <div className={styles["payment__component__area__right__detail__area__topic"]}>e-mail</div>
                                    <div className={styles["payment__component__area__right__detail__area__detail"]}>{email}</div>
                                </div>
                                <div className={styles["payment__component__area__right__detail__area"]}>
                                    <div className={styles["payment__component__area__right__detail__area__topic"]}>ที่อยู่</div>
                                    <div className={styles["payment__component__area__right__detail__area__detail"]}>{address}</div>
                                </div>
                                <div className={styles["payment__component__area__right__detail__area"]}>
                                    <div className={styles["payment__component__area__right__detail__area__topic"]}>จังหวัด</div>
                                    <div className={styles["payment__component__area__right__detail__area__detail"]}>{provinces}</div>
                                </div>
                                <div className={styles["payment__component__area__right__detail__area"]}>
                                    <div className={styles["payment__component__area__right__detail__area__topic"]}>อำเภอ</div>
                                    <div className={styles["payment__component__area__right__detail__area__detail"]}>{amphures}</div>
                                </div>
                                <div className={styles["payment__component__area__right__detail__area"]}>
                                    <div className={styles["payment__component__area__right__detail__area__topic"]}>ตำบล</div>
                                    <div className={styles["payment__component__area__right__detail__area__detail"]}>{tumbons}</div>
                                </div>
                                <div className={styles["payment__component__area__right__detail__area"]}>
                                    <div className={styles["payment__component__area__right__detail__area__topic"]}>รหัสไปรษณีย์</div>
                                    <div className={styles["payment__component__area__right__detail__area__detail"]}>{zips}</div>
                                </div>
                                {slipStatus ? 
                                    <div className={styles["payment__component__area__right__button__area"]}>
                                        <div className={styles["payment__component__area__right__button__area__submit"]}>
                                            <button>submit</button>
                                        </div>
                                        <div className={styles["payment__component__area__right__button__area__cancel"]}>
                                            <button onClick={() => document.querySelector("." + styles["payment__area"]).style.display = "none"}>cancel</button>
                                        </div>
                                    </div> :<>
                                    <div className={styles["payment__component__area__right__button__area"]}>
                                        <div className={styles["payment__component__area__right__button__area__submit"]}>
                                                <Loading />
                                                
                                        </div>
                                        <div className={styles["payment__component__area__right__button__area__cancel"]}>
                                            <Loading />
      
                                        </div>
                                        
                                    </div>
                                    
                                    </>
                                }
                            </div>
                        </div>
                    </div>
                </div>

            )}
            
        </>
    );

}
