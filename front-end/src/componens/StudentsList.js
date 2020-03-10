import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Table } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import StudentModal from './StudentModal'

const StudentsList = () => {
    const dispatch = useDispatch();
    const form = useSelector(state => state.form)
    const students = useSelector(state => state.student);
    const student = useSelector(state => state.show);
    const visible = useSelector(state => state.modal);

    const columns = [
        {
            title: 'Student ID',
            dataIndex: 'id',
            key: 'id',
            render: text => <a onClick={() => getStudent(text)}>{text}</a>
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Surname',
            dataIndex: 'surname',
            key: 'surname',
        },
        {
            title: 'Major',
            dataIndex: 'major',
            key: 'major',
        },
        {
            title: 'GPA',
            dataIndex: 'GPA',
            key: 'GPA',
        },
        {
            title: 'Action',
            key: 'action',
            render: (text, record) => (
                <span>
                    <a style={{ marginRight: 16 }} onClick={() => updateStudent(record.id)}>Update</a>
                    <a onClick={() => deleteStudent(record.id)}>Delete</a>
                </span>
            )
        }
    ]

    const getStudents = async () => {
        const result = await axios.get(`http://localhost:8000/api/students`)
        console.log(result.data)
        dispatch({ type: 'GET_STUDENTS', students: result.data })
    }

    const getStudent = async (id) => {
        const result = await axios.get(`http://localhost:8000/api/students/${id}`)
        dispatch({ type: 'GET_STUDENT', student: result.data })
        dispatch({type: 'SHOW_MODAL'})
    }

    const deleteStudent = async (id) => {
        await axios.delete(`http://localhost:8000/api/students/${id}`)
        dispatch({ type: 'DELETE_STUDENT', id: id })
    }

    const updateStudent = async (id) => {
        await axios.put(`http://localhost:8000/api/students/${id}`, form)
        dispatch({
            type: 'UPDATE_STUDENT',
            id: id,
            student: { ...form, id: id }
        })
    }

    // const handleOk = e => {
    //     dispatch({type: 'OK'})
    // }

    // const handleCancel = e => {
    //     dispatch({type: 'CANCLE'})
    // }

    useEffect(() => {
        getStudents()
    }, [])

    return (
        <div>
            <Table columns={columns} dataSource={students} />
            <StudentModal {...student} />
        </div>
    )
}

export default StudentsList