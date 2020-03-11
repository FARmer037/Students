import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { allActions } from '../redux/store'
import { bindActionCreators } from 'redux'

const InputForm = () => {
    const form = useSelector(state => state.form)
    const actions = bindActionCreators(allActions, useDispatch())

    const addStudent = async () => {
        await axios.post(`http://localhost:8000/api/students`, form)
        actions.add_student({...form})

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
                            <input className='inpt' type="text" onChange={(e) => actions.change_id(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Name</td>
                        <td>
                            <input className='inpt' type="text" onChange={(e) => actions.change_name(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Surname</td>
                        <td>
                            <input className='inpt' type="text" onChange={(e) => actions.change_surname(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>Major</td>
                        <td>
                            <input className='inpt' type="text" onChange={(e) => actions.change_major(e.target.value)} />
                        </td>
                    </tr>
                    <tr>
                        <td>GPA</td>
                        <td>
                            <input className='inpt' type="number" onChange={(e) => actions.change_gpa(e.target.value)} />
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