import React, { useState, useEffect } from 'react'
import axios from 'axios'
import 'antd/dist/antd.css'
import { Form, Input, InputNumber, Modal, Button, Table } from 'antd'
import { ExclamationCircleOutlined } from '@ant-design/icons'
import './ShowStudent.css'

const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
}

const validateMessages = {
    required: 'This field is required!',
    types: {
        email: 'Not a validate email!',
        number: 'Not a validate number!',
    },
    number: {
        range: 'Must be between ${min} and ${max}',
    },
}

const { confirm } = Modal;

const ShowStudent2 = () => {
    const [visible, setVisible] = useState(false)
    const [students, setStudents] = useState([])
    const [student, setStudent] = useState('')

    const columns = [
        {
            title: 'Student ID',
            dataIndex: 'id',
            key: 'id',
            render: text => <a onClick={() => getStudent(text)}>{text}</a>,
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
                    {/* <a style={{ marginRight: 16 }} onClick={() => console.log(record.id)}>Update</a> */}
                    <a style={{ marginRight: 16 }} onClick={showConfirm}>Update</a>
                    <a onClick={() => deleteStudent(record.id)}>Delete</a>
                </span>
            )
        }
    ]

    const getStudents = async () => {
        const result = await axios.get(`http://localhost:8000/api/students`)
        setStudents(result.data)
    }

    const addStudent = async (id, name, surname, major, GPA) => {
        const result = await axios.post(`http://localhost:8000/api/students`, {
            id,
            name,
            surname,
            major,
            GPA
        })
        console.log(result.data)
        getStudents()
    }

    const deleteStudent = async (id) => {
        const result = await axios.delete(`http://localhost:8000/api/students/${id}`)
        console.log(result.data)
        getStudents()
    }

    const getStudent = async (id) => {
        const result = await axios.get(`http://localhost:8000/api/students/${id}`)
        console.log('Student ID: ', result.data)
        setStudent(result.data)
        showModal()
    }

    // const updateStudent = async (id) => {
    //     const result = await axios.put(`http://localhost:8000/api/students/${id}`, {
    //         name,
    //         surname,
    //         major,
    //         GPA
    //     })
    //     console.log(result.data)
    //     getStudents()
    // }

    const showModal = () => {
        setVisible(true)
    }

    const handleOk = e => {
        console.log(e)
        setVisible(false)
    }

    const handleCancel = e => {
        console.log(e)
        setVisible(false)
    }

    const onFinish = values => {
        console.log(values.student);
        addStudent(values.student.id, values.student.name, values.student.surname, values.student.major, values.student.GPA)
    }

    const showConfirm = () => {
        confirm({
            title: 'Update Student',
            // icon: <ExclamationCircleOutlined />,
            content: <div>
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item className='form-item' name={['student', 'id']} label="Student ID" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item className='form-item' name={['student', 'name']} label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item className='form-item' name={['student', 'surname']} label="Surname" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item className='form-item' name={['student', 'major']} label="Major" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item className='form-item' name={['student', 'GPA']} label="GPA" rules={[{ required: true, type: 'number', min: 0, max: 4 }]}>
                        <InputNumber />
                    </Form.Item>
                </Form>
            </div>,
            onOk() {
                console.log('OK');
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    useEffect(() => {
        getStudents()
    }, [])

    return (
        <div className='container'>
            <div className='table'>
                <Table columns={columns} dataSource={students} />
            </div>
            <Modal
                title="Student Information"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <p>Student ID : {student.id}</p>
                <p>Name : {student.name}</p>
                <p>Surname : {student.surname}</p>
                <p>Major : {student.major}</p>
                <p>GPA : {student.GPA}</p>
            </Modal>

            <div className='form'>
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}>
                    <Form.Item className='form-item' name={['student', 'id']} label="Student ID" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item className='form-item' name={['student', 'name']} label="Name" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item className='form-item' name={['student', 'surname']} label="Surname" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item className='form-item' name={['student', 'major']} label="Major" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item className='form-item' name={['student', 'GPA']} label="GPA" rules={[{ required: true, type: 'number', min: 0, max: 4 }]}>
                        <InputNumber />
                    </Form.Item>
                    <Form.Item className='form-item' wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>
                        <Button type="primary" htmlType="submit">
                            Add Student
                    </Button>
                    </Form.Item>
                </Form>
                <Button onClick={showConfirm}>Confirm</Button>
            </div>
        </div>
    )
}

export default ShowStudent2