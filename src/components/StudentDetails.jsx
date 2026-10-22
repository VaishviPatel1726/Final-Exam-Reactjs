import React from 'react'
import { useEffect } from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Link, useParams } from 'react-router-dom';
import { fetchStudents } from '../redux/studentslice';
import images from "../assets/images/student"


function StudentDetails() {

    const {id} = useParams();
    const dispatch = useDispatch();

    const {students, loading } = useSelector(
        (state) => state.students
    );

    const student =students.find(
        (item) => item.id === id
    );

    useEffect(()=>{
        if (!student){
            dispatch(fetchStudents());
        }
    },[student.dispatch]);

    if (loading || !student){
        return <div className='container mt-4'>Loading details...</div>;
    }

    return (
        <>
            <div className='container mt-4'>
                <div className='card shadow p-4 mx-auto' style={{ maxwidth: "600px" }}>
                    <h2>Student Details</h2>
                    {student.image && (
                    <img src={student.image} alt={student.name} className='rounded-circle mb-3' style={{ width: "100px", height: "100px", objectFit: "cover" }} />
                    )}

                    <p><strong>Name:</strong>{student.name}</p>
                    <p><strong>Roll Number:</strong>{student.rollNumber}</p>
                    <p><strong>Email:</strong>{student.email}</p>
                    <p><strong>Phone:</strong>{student.phone}</p>
                    <p><strong>Age:</strong>{student.age}</p>
                    <p><strong>Class:</strong>{student.class}</p>
                    <p><strong>Grade:</strong>{student.grade}</p>

                    <div>
                        <link to={`/edit/${student.id}`} className='btn btn-warning me-2'>
                            Edit
                        </link>

                        <link to="/" className='btn btn-secondary me-2'>
                            Back
                        </link>
                    </div>

                </div>
            </div>
        </>
    )
}

export default StudentDetails;