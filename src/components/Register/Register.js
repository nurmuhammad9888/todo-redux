import axios from 'axios'
import React, { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { saveToken, userGet } from './UserAction';

export const Register = () => {
    const lastNameRef = useRef();
    const fristNameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const dispatch = useDispatch();
    const userData = useSelector(state => state);

    const handlerSubmit = (evt) => {
        evt.preventDefault();
        axios.post("http://localhost:8080/register", {
            last_name:lastNameRef.current.value,
            frist_name:fristNameRef.current.value,
            email:emailRef.current.value,
            password:passwordRef.current.value,
        }).then(res => {
            if (res.status === 201) {
                dispatch(saveToken(localStorage.setItem("token", res.data.accessToken)))
                dispatch(userGet(res.data.user, localStorage.setItem("user", JSON.stringify(res.data.user))))
                console.log(res.data)
            }
        }).catch(err =>  console.log(err))
    }
    return (
        <div className='shadow w-75 mt-5 p-4 mx-auto'>
            <h2 className='text-center mb-3'>Register</h2>
            <form className='' onSubmit={handlerSubmit}>
                <input className='form-control mt-4' type="text" ref={lastNameRef}  placeholder="LastName"required/>
                <input className='form-control mt-4' type="text" ref={fristNameRef}  placeholder="Frist name"required/>
                <input className='form-control mt-4' type="email" ref={emailRef} placeholder="Email" required/>
                <input className='form-control mt-4' type="password" ref={passwordRef} placeholder="Password" required/>
                <button className='btn btn-success mt-4 px-4' type='submit'>Send</button>
            </form>
        <h2>{userData.email}</h2>
        </div>
        )
    }