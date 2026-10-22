import { useState } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './components/login';
import PrivateRoute from './components/PrivateRoute';
import StudentDetails from './components/StudentDetails';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { Route } from 'react-router-dom';

function App() {

  return (
    <>

      <Navbar />

      <Routes>
        <Route path="/login" element={<Login/>}></Route>

        <Route element={<PrivateRoute />}>
          <Route path="/" element={<StudentList />}></Route>
          <Route path="/add" element={<StudentForm />}></Route>
          <Route path="/details/:id" element={<StudentDetails />}></Route>
          <Route path="/edit/:id" element={<StudentForm />}></Route>
        </Route>

        <Route path='*' element={<Navigate to="/" replace />}></Route>
      </Routes>

    </>
  )
}

export default App
