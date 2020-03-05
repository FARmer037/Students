import React from 'react'
import './ShowStudent.css'

const ShowStudent = (props) => {
    const students = [
        {
            id: '5935512036',
            name: 'Usman',
            surname: 'Sulong',
            major: 'CoE',
            GPA: 2.50
        },
        {
            id: '5935512037',
            name: 'Mustofa',
            surname: 'Sachi',
            major: 'CoE',
            GPA: 2.20
        }
    ]
    return (
        <div className='container'>
            <table>
                <tr>
                    <th>Student ID</th>
                    <th>Name</th>
                    <th>Surname</th>
                    <th>Major</th>
                    <th>GPA</th>
                </tr>

                {
                    students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.id}</td>
                            <td>{student.name}</td>
                            <td>{student.surname}</td>
                            <td>{student.major}</td>
                            <td>{student.GPA}</td>
                        </tr>
                    ))
                }

            </table>
        </div>
    )
}

export default ShowStudent