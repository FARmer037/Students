import React from 'react'
import 'antd/dist/antd.css'
import {  Modal } from 'antd'

const StudentModal = (props) => {
    return (
        <div>
            <Modal
                title="Student Information"
                visible={props.visible}
                onOk={props.handleOk}
                onCancel={props.handleCancel}
            >
                <p>Student ID : {props.student.id}</p>
                <p>Name : {props.student.name}</p>
                <p>Surname : {props.student.surname}</p>
                <p>Major : {props.student.major}</p>
                <p>GPA : {props.student.GPA}</p>
            </Modal>
        </div>
    )
}

export default StudentModal