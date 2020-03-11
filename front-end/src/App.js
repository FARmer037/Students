import React from 'react'
import StudentsList from './componens/StudentsList'
import InputForm from './componens/InputForm'
import './App.css'

const App = () => {
  return (
    <div className='app'>
      <StudentsList />
      <InputForm />
    </div>
  );
}

export default App;
