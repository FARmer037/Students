import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'

const InputForm = () => {
    const dispatch = useDispatch()
    const form = useSelector(state => state.form)

    const addStudent = async () => {
        await axios.post(`http://localhost:8000/api/students`, form)
        dispatch({
            type: 'ADD_STUDENT', student: {
                ...form
            }
        })

        console.log(form)
    }

    return (
        <div>
            <h2>Add Student</h2>
            <table>
                <tbody>
                    <tr>
                        <td>Student ID</td>
                        <td>
                            <input className='inpt' type="text" onChange={(e) => dispatch({ type: 'CHANGE_ID', id: e.target.value })} />
                        </td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>
                            <input className='inpt' type="text" onChange={(e) => dispatch({ type: 'CHANGE_NAME', name: e.target.value })} />
                        </td>
                    </tr>
                    <tr>
                        <td>Surname</td>
                        <td>
                            <input className='inpt' type="text" onChange={(e) => dispatch({ type: 'CHANGE_SURNAME', surname: e.target.value })} />
                        </td>
                    </tr>
                    <tr>
                        <td>Major</td>
                        <td>
                            <input className='inpt' type="text" onChange={(e) => dispatch({ type: 'CHANGE_MAJOR', major: e.target.value })} />
                        </td>
                    </tr>
                    <tr>
                        <td>GPA</td>
                        <td>
                            <input className='inpt' type="number" onChange={(e) => dispatch({ type: 'CHANGE_GPA', GPA: e.target.value })} />
                        </td>
                    </tr>
                    <tr>
                        <td></td>
                        <td>
                            <button className='btn' onClick={addStudent}>ADD</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default InputForm