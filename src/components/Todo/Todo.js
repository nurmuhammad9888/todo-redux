import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { deletToken, userDelet } from '../Register/UserAction';
import { todoGet } from './TodoAction';

export const Todo = () => {
    const todoRef = useRef();
    const state = useSelector(state => state);
    const [sta, setSta] = useState(false);
    const dispatch = useDispatch();
    const handlerSubmit = (evt) => {
        evt.preventDefault();

        axios.post("http://localhost:8080/todos", {
            todo:todoRef.current.value,
        }).then(res => {
            if (res.status === 201) {
                setSta(true)
                console.log(res.data)
            }
        }).catch(err =>  console.log(err))
    }

    useEffect(() => {
		axios.get("http://localhost:8080/todos")
			.then((res) => {
				localStorage.setItem("todo", JSON.stringify(res.data));
				todoGet(res.todo);
                setSta(false)
			})
			.catch((err) => console.log(err));
    }, [sta])

    const handlerEdit = (id) => {
        const edit = prompt("Edit todo");
        axios.put("http://localhost:8080/todos/" + id, {
            todo: edit
        }).then(res => {
                setSta(true)
                console.log(res.data)
        }).catch(err =>  console.log(err))
    }

    const handlerDelet = (id) => {
        axios.delete("http://localhost:8080/todos/" + id
        ).then(res => {
                setSta(true)
                console.log(res.data)
        }).catch(err =>  console.log(err))
    }
    const handlerToken = () => {
        dispatch(deletToken(localStorage.removeItem("token")))
        dispatch(userDelet(localStorage.removeItem("user")))
    }
    return (
        <>
        <div className='d-flex align-items-center justify-content-center mt-5'>
            <h3 className='text-center'>TODO LIST</h3>
            <button className='btn btn-danger ms-3' onClick={handlerToken}>Log out</button>
        </div>
        <div>
            <form className='d-flex align-items-center my-5 w-75 mx-auto' onSubmit={handlerSubmit}>
                <input className='form-control' type="text" ref={todoRef} placeholder="Todo..."/>
                <button className='btn btn-success ms-3' type='submit'>Send</button>
            </form>
            <ul className='list-unstyled w-75 mx-auto mt-4 p-3'>
					{state.todo.todo.map((item) => (
							<li key={item.id} className='d-flex align-items-center justify-content-between border p-3'>
								<div className='d-flex align-items-center gap-4'>
									<span className='m-0'>{item.id}.</span>
									<input type='checkbox' />
									<h4>{item.todo}</h4>
								</div>
								<div className='d-flex align-items-center'>
									<button className='btn btn-warning text-white' onClick={() => handlerEdit(item.id)}>
										EDIT
									</button>
									<button className='btn btn-danger ms-4'	onClick={() => handlerDelet(item.id)}>
										DELET
									</button>
								</div>
							</li>
					))}
			</ul>
        </div>
        </>
        )
    }    