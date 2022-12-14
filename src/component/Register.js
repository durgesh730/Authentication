import { Link } from 'react-router-dom';
import React, { useState } from 'react'
import './mix.css'
// import { set } from 'mongoose';

const Register = () => {

    const [passShow, setPassshow] = useState(false);
    const [cpassShow, setCPassshow] = useState(false);

    const [inpval, setInpval] = useState({
        fname: '',
        email: '',
        password: '',
        cpassword: ''
    });

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

    const addUserdata = async (e) => {
        e.preventDefault();

        const { fname, email, password, cpassword } = inpval;

        if (fname === '') {
            alert("Please enter Your name")
        } else if (email === "") {
            alert('please enter the email')
        } else if (!email.includes('@')) {
            alert('please valid email')
        } else if (password === " ") {
            alert('please your password')
        } else if (password.length < 6) {
            alert('password must be 6 char')
        } else if (cpassword === " ") {
            alert('please your password')
        } else if (cpassword.length < 6) {
            alert('password must be 6 char')
        } else if (password !== cpassword) {
            alert('password and confirm password is not matched')
        } else {
            // console.log('user registration succesfully done')
            const data = await fetch('http://localhost:8009/register',{
                method: 'POST',
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({
                    fname, email, password, cpassword
                })
            });

            const res = await data.json();
            // console.log(res)

            if(res.status === (201)){
                alert("user registration done")
                setInpval({...inpval, fname:" ", email:" ", password:"", cpassword:""})
            }
        }
    }

    return (
        <>
            <section>
                <div className='form_data'>
                    <div className='form_heading'>
                        <h1>Sign Up</h1>
                        <p style={{ textAlign: "center" }} >We are glad that you will be using Project Cloud to manage <br /> your tacks! We hope that you will get like it.</p>
                    </div>

                    <form>
                        <div className='form_input'>
                            <label htmlFor='fname'>Name</label>
                            <input type='text' onChange={setVal} value={inpval.fname} name="fname" id='fname' placeholder='Enter Your Name' />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='email'>Email</label>
                            <input type='email' onChange={setVal} value={inpval.email} name="email" id='email' placeholder='Enter Your Email Address' />
                        </div>

                        <div className='form_input'>
                            <label htmlFor='password'>Password</label>
                            <div className='two' >
                                <input onChange={setVal} type={!passShow ? "password" : "text"} value={inpval.password} name="password" id='password' placeholder='Enter Your passsword' />
                                <div className='showpass' onClick={() => setPassshow(!passShow)}>
                                    {!passShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <div className='form_input'>
                            <label htmlFor='password'>Confirm Password</label>
                            <div className='two' >
                                <input onChange={setVal} type={!cpassShow ? "password" : "text"} name="cpassword" value={inpval.cpassword} id='cpassword' placeholder='Confirm Password' />
                                <div className='showpass' onClick={() => setCPassshow(!cpassShow)}>
                                    {!cpassShow ? "Show" : "Hide"}
                                </div>
                            </div>
                        </div>

                        <button className='btn' onClick={addUserdata} >Sign Up</button>
                        <p>Already have an Account? <Link to="/" >Log In</Link></p>
                    </form>
                </div>
            </section>
        </>
    )
}

export default Register
