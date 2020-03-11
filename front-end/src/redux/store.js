import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'

const initialForm = {
    id: '',
    name: '',
    surname: '',
    major: '',
    GPA: 0
}

const formReducer = (data = initialForm, action) => {
    switch (action.type) {
        case 'CHANGE_ID': return { ...data, id: action.id };
        case 'CHANGE_NAME': return { ...data, name: action.name };
        case 'CHANGE_SURNAME': return { ...data, surname: action.surname };
        case 'CHANGE_MAJOR': return { ...data, major: action.major };
        case 'CHANGE_GPA': return { ...data, GPA: action.GPA };
        default: return data;
    }
}

export const studentAction = {
    getStudentsSuccess: students => ({
        type: 'GET_STUDENTS_SUCCESS',
        students
    }),
    getStudentsFailed: () => ({ type: 'GET_STUDENTS_FAILED' }),
    getStudents: () => async (dispatch) => {
        try {
            console.log('get student new')
            const response = await axios.get(`http://localhost:8000/api/students`)
            const responseBody = await response.data
            console.log('response:', responseBody)
            dispatch({ type: 'GET_STUDENTS_SUCCESS', students: responseBody })
        } catch (error) {
            console.log(error)
            dispatch({ type: 'GET_STUDENTS_FAILED', error: error})
        }
    }
}

const studentReducer = (students = [], action) => {
    switch (action.type) {
        case 'GET_STUDENTS': return action.students;
        case 'ADD_STUDENT': return [...students, action.student];
        case 'DELETE_STUDENT': return students.filter(student => student.id !== action.id);
        case 'UPDATE_STUDENT': return students.map(student => {
            if (student.id === action.id)
                return action.student;
            else
                return student;
        })
        case 'GET_STUDENTS_SUCCESS': return action.students
        case 'GET_STUDENTS_FAILED': return action.error
        default: return students
    }
}

const showStudentReducer = (student = {}, action) => {
    switch (action.type) {
        case 'GET_STUDENT': return action.student;
        default: return student
    }
}

const showModalReducer = (visible = false, action) => {
    switch (action.type) {
        case 'SHOW_MODAL': return true;
        case 'OK': return false;
        case 'CANCLE': return false;
        default: return visible;
    }
}

const updateModalReducer = (visible = false, action) => {
    switch (action.type) {
        case 'UPDATE_MODAL': return true;
        case 'OK': return false;
        case 'CANCLE': return false;
        default: return visible;
    }
}

export const allActions = {
    change_id: (id) => ({ type: 'CHANGE_ID', id }),
    change_name: (name) => ({ type: 'CHANGE_NAME', name }),
    change_surname: (surname) => ({ type: 'CHANGE_SURNAME', surname }),
    change_major: (major) => ({ type: 'CHANGE_MAJOR', major }),
    change_gpa: (GPA) => ({ type: 'CHANGE_GPA', GPA }),

    get_students: (students) => ({ type: 'GET_STUDENTS', students }),
    get_student: (student) => ({ type: 'GET_STUDENT', student }),
    add_student: (student) => ({ type: 'ADD_STUDENT', student }),
    delete_student: (id) => ({ type: 'DELETE_STUDENT', id }),
    update_student: (id, student) => ({ type: 'UPDATE_STUDENT', id, student }),

    show_modal: () => ({ type: 'SHOW_MODAL' }),
    update_modal: () => ({ type: 'UPDATE_MODAL' }),
    ok: () => ({ type: 'OK' }),
    cancle: () => ({ type: 'CANCLE' })
}

const reducers = combineReducers({
    student: studentReducer,
    form: formReducer,
    show: showStudentReducer,
    showModal: showModalReducer,
    updateModal: updateModalReducer
})

export const store = createStore(reducers, applyMiddleware(logger, thunk));