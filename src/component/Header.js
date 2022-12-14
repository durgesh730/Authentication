import React, { useContext } from 'react'
import './header.css'
import Avatar from '@mui/material/Avatar';
import { LoginContext } from './ContextProvider/Context';
import { useNavigate } from 'react-router-dom';

const Header = () => {
    const { logindata, setLoginData } = useContext(LoginContext);
   
    const history = useNavigate();

    const logoutuser = async () => {
        let token = localStorage.getItem("usersdatatoken");

        const res = await fetch("/logout", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": token,
                Accept: "application/json"
            },
            credentials: "include"
        });

        const data = await res.json();
        console.log(data);

        if (data.status === 201) {
            console.log("user logout");
            localStorage.removeItem("usersdatatoken");
            setLoginData(false)
            history("/");
            console.log("go to login page");
        } else {
            console.log("error")
        }
    }

    return (
        <>
            <header>
                <nav><h1>Durgesh</h1>
                    <div className='avtar' >
                        {
                            logindata.ValidUserOne ? (
                                <>
                                    <button onClick = {()=>{
                                         logoutuser()
                                    }}>logout</button>
                                    <Avatar style={{ backgroundColor: "salmon", fontWeight: "bold", textTransform: "capitalize" }}>{logindata.ValidUserOne.fname[0].toUpperCase()}</Avatar>
                                </>) : (<Avatar style={{ backgroundColor: "blue" }}></Avatar>)
                        }
                    </div>
                </nav>
            </header>
        </>
    )
}

export default Header
