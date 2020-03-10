import { createStore, combineReducers, applyMiddleware } from 'redux';
import logger from 'redux-logger'

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
        default: return students
    }
}

const showStudentReducer = (student = {}, action) => {
    switch (action.type) {
        case 'GET_STUDENT': return action.student;
        default: return student
    }
}

const modalReducer = (visible = false, action) => {
    switch(action.type) {
        case 'SHOW_MODAL' : return true;
        case 'OK' : return false;
        case 'CANCLE' : return false;
        default: return visible;
    }
}

const reducers = combineReducers({
    student: studentReducer,
    form: formReducer,
    show: showStudentReducer,
    modal: modalReducer
})

export const store = createStore(reducers, applyMiddleware(logger));