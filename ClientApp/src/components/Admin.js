import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { addAdmin, addAdmin2, addToken } from "./slice";
import { jwtDecode } from "jwt-decode";
export default function Admin() {
    
    
    const value = useSelector((e) => e.admin.username);
    const value2 = useSelector((e) => e.admin.password);
    const dispatch = useDispatch()
    
    const submit = async (e) => {
        
        const obj = { user: value, pass: value2 }
        const response = await fetch("https://localhost:7067/api/login", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                //make sure to serialize your JSON body
                body: JSON.stringify(obj)
            });
        const content = await response.json();
        if (content.map((e) => e.token)[0] === "invalid") {
            dispatch(addToken("invalid"));
            window.location.reload();
        } else {
            const tokenString = jwtDecode(content.map((e) => e.token)[0])
            dispatch(addToken(tokenString));
            sessionStorage.setItem("login", tokenString.user);
            const token = content.map((e) => e.token)[0];
            sessionStorage.setItem("token", token);
            window.location.reload();
        }
        
        
    }
    const keysubmit = async (e) => {
        const key = e.key;
        if (key == "Enter") {
            const obj = { user: value, pass: value2 }
            const response = await fetch("https://localhost:7092/api/login", {
                method: "post",
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },

                //make sure to serialize your JSON body
                body: JSON.stringify(obj)
            });
            const content = await response.json();
            if (content.map((e) => e.token)[0] === "invalid") {
                dispatch(addToken("invalid"));
                window.location.reload();
            } else {
                const tokenString = jwtDecode(content.map((e) => e.token)[0])
                dispatch(addToken(tokenString));
                sessionStorage.setItem("login", tokenString.user);
                const token = content.map((e) => e.token)[0];
                sessionStorage.setItem("token", token);
                window.location.reload();
            }
        }
        


    }
    
   
    
    return (
        <>
            <div style={{ marginTop: 5 + "vh", fontFamily: 'SarabunBold' }} >

                <form onKeyPress={keysubmit}>
                    <div style={{ width: 100 + "vw", height: 15 + "vh", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <input type="text" id="form2Example1" className="form-control" style={{ width: 30 + "vw", height: 3 + "vh", textAlign: 'center', fontSize: 12 }} name="username" onChange={(e) => dispatch(addAdmin(e.target.value))} />
                        <label className="form-label" for="form2Example1" style={{ marginTop: 1 + "vh" }}>ชื่อผู้ใช้</label>
                    </div>


                    <div style={{ width: 100 + "vw", height: 15 + "vh", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <input type="password" id="form2Example2" className="form-control" style={{ width: 30 + "vw", height: 3 + "vh", textAlign: 'center' }} name="password" onChange={(e) => dispatch(addAdmin2(e.target.value))} />
                        <label className="form-label" for="form2Example2" style={{ marginTop: 1 + "vh" }}>รหัสผ่าน</label>
                    </div>

                <div style={{ width: 100 + "vw", height: 15 + "vh", display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                    <button type="reset" value="" style={{ width: 10 + "vw", height: 5 + "vh", fontSize: 12, borderRadius: 15, backgroundColor: 'pink' }} onClick={() => submit()} >click in</button>
                    
                </div>
                <div></div>
                    
                </form>   




            </div>
        </>
    )

}