import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import {
    addStudent,
    fetchStudents,
    updateStudent
} from "./redux/studentSlice";

const initialForm = {
    name: "",
    rollNumber: "",
    phone: "",
    email: "",
    age: "",
    class: "BCA",
    grade: "",
    image: ""
};

function StudentForm() {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { students } = useSelector((state) => state.students);
    const existingStudent = students.find(
        (student) => student.id === id
    );

    const [form, setForm] = useState(initialForm);

    useEffect(() => {
        if (id && !existingStudent) {
            dispatch(fetchStudents());
        }
    }, [id, existingStudent, dispatch]);

    useEffect(() => {
        if (existingStudent) {
            setForm({
                ...initialForm,
                ...existingStudent
            });
        } else if (!id) {
            setForm(initialForm);
        }
    }, [existingStudent, id]);

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const student = {
                ...form,
                age: Number(form.age)
            };

            if (id) {
                await dispatch(
                    updateStudent({ ...student, id })
                ).unwrap();
            } else {
                await dispatch(addStudent(student)).unwrap();
            }

            navigate("/");
        } catch (error) {
            alert("Unable to save student. Please try again.");
        }
    };

    if (id && !existingStudent) {
        return <div className="container mt-4">Loading student...</div>;
    }

    return (
        <div className="container mt-4">
            <div className="card shadow p-4 mx-auto" style={{ maxWidth: "700px" }}>
                <h2 className="mb-4">
                    {id ? "Update Student" : "Add Student"}
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-md-6 mb-3">
                            <label className="form-label">Student Name</label>
                            <input
                                className="form-control"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Roll Number</label>
                            <input
                                className="form-control"
                                name="rollNumber"
                                value={form.rollNumber}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Phone</label>
                            <input
                                className="form-control"
                                name="phone"
                                value={form.phone}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-6 mb-3">
                            <label className="form-label">Email</label>
                            <input
                                type="email"
                                className="form-control"
                                name="email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label className="form-label">Age</label>
                            <input
                                type="number"
                                min="1"
                                className="form-control"
                                name="age"
                                value={form.age}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-md-4 mb-3">
                            <label className="form-label">Class</label>
                            <select
                                className="form-select"
                                name="class"
                                value={form.class}
                                onChange={handleChange}
                            >
                                <option value="BCA">BCA</option>
                                <option value="MCA">MCA</option>
                                <option value="BBA">BBA</option>
                            </select>
                        </div>

                        <div className="col-md-4 mb-3">
                            <label className="form-label">Grade</label>
                            <input
                                className="form-control"
                                name="grade"
                                value={form.grade}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="col-12 mb-3">
                            <label className="form-label">Image URL (optional)</label>
                            <input
                                className="form-control"
                                name="image"
                                value={form.image}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button className="btn btn-success me-2" type="submit">
                        {id ? "Update Student" : "Add Student"}
                    </button>

                    <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={() => navigate("/")}
                    >
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
}

export default StudentForm;