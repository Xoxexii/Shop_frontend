import React, { useState,useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import AppRoutes from './AppRoutes';
import Layout from './components/Layout';
import { useSelector, useDispatch } from 'react-redux';
import { addStatus, addCategory, setItem, addCssCategory } from "../src/components/slice";
import './custom.css';

export default function App() {
    const sliceCategory = useSelector((e) => e.admin.category);
    const token = sessionStorage.getItem("token")
    const dispatch = useDispatch();

    const fetchItim = async () => {
        const res = await fetch(`https://localhost:7067/api/getitem`);
        const contents = await res.json();
        dispatch(setItem(contents));

    }
    const getCategory = async () => {
        const cateres = await fetch("https://localhost:7067/api/getcategory");
        const contents = await cateres.json();
        await dispatch(addCategory(contents));
        


    }
    

    
    useEffect(() => {
        
            fetchItim();
            getCategory();
            
        
        
    },[])
    return (
      <Layout>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </Layout>
    );
  }
