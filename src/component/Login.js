import { Link, useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import './mix.css';

const Login = () => {

    const Navigate = useNavigate()
    const [passShow, setPassshow] = useState(false);

    
    const [inpval, setInpval] = useState({
        email: '',
        password: '',
    })
    // console.log(inpval);

    const setVal = (e) => {
        // console.log(e.target.value);
        const { name, value } = e.target;

        setInpval(() => {
            return {
                ...inpval,
                [name]: value
            }
        })
    }


    const loginuser = async (e)=>{
        e.preventDefault();
        const {email,password} = inpval;
        if (email === "") {
            alert('please enter the email')
        } else if (!email.includes('@')) {
            alert('please valid email')
        } else if (password === " ") {
            alert('please your password')
        } else if (password.length < 6) {
            alert('password must be 6 char')
        } else {
            // console.log('user registration succesfully done')
            const data = await fetch('http://localhost:8009/login',{
                method: 'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                     email, password
                })
            });

            const res = await data.json();
            // console.log(res);

            if(res.status === (201)){
                localStorage.setItem('usersdatatoken',res.result.token)
                Navigate('/dashboard')
                setInpval({...inpval, email:" ", password:""})
            }
        }
    }

    return (
        <>
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h1>Welcome Back, Log In</h1>
                        <p>Hi, we are you glad you are back. Please login</p>
                    </div>

                    <form>
                        <div className='form_input'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' name="email" value={inpval.email} id='email' placeholder='Enter Your Email Address' onChange={setVal} />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='password'>Password</label>
                            <div className='two' >
                                <input type={!passShow ? "password": "text"} value={inpval.password} name="password" id='password' placeholder='Enter Your password' onChange={setVal}/>
                                <div className='showpass' onClick={()=>setPassshow(!passShow)}>
                                    {!passShow? "Show": "Hide"}
                                </div>
                            </div>
                        </div>
                        
                        <button className='btn' onClick={loginuser} >Login</button>
                        <p>Don't have an Account? <Link to="/register">Sign Up</Link></p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Login
