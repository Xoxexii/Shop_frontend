import React, { Component,useEffect,useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import './NavMenu.scss';


export default function NavMenu () {
    const value = useSelector((e) => e.admin.admin);
    const value2 = useSelector((e) => e.admin.admin2);
    const value3 = useSelector((e) => e.admin.admin3);
    const dispatch = useDispatch()
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [mov, setMov] = useState([])
    const login = sessionStorage.getItem("login")
    const logout = () => {
        sessionStorage.removeItem("login");
        window.location.reload();
    }

    
    return (
        <>
            {login == "itimkrupp" ?  
                <div className="nav_area">
                    <div className="nav_brand">
                        <Link to="/">
                            รวยพร
                        </Link>
                    </div>
                    <div className="nav_item">
                        <div className="item">
                            <Link tag={Link} to="/">หน้าหลัก</Link>
                        </div>
                        <div className="item">
                            <Link tag={Link} to="/products">สินค้า</Link>
                        </div>
                        <div className="cata_area">
                            <div className="item">
                                <Link tag={Link} to="/category">จัดการสินค้า</Link>
                            </div>
                        </div>
                        <div className="item">
                            <Link tag={Link} to="/manage">เพิ่มสินค้า</Link>
                        </div>
                        <div className="item">
                            <div className="logout" onClick={() => logout()}>Logout</div>
                        </div>

                    </div>
                </div> :        
                <div className="nav_area">
                    <div className="nav_brand">
                        <Link to="/">
                            รวยพร
                        </Link>
                    </div>
                    <div className="nav_item">
                        <div className="item">
                            <Link tag={Link} to="/">หน้าหลัก</Link>
                        </div>
                        <div className="cata_area">
                            <div className="item">
                                <Link tag={Link} to="/products">สินค้า</Link>
                            </div>
                            <div className="dropdown"></div>
                        </div>
                        <div className="item">
                            <Link tag={Link} to="/admin">แอดมิน</Link>
                        </div>
                    </div>
                </div>
        }
                
            
      </>
        
    );
  
}
