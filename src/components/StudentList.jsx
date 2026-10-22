import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStudents, deleteStudent } from "./redux/studentSlice";

function StudentList() {
  const dispatch = useDispatch();

  const { students, loading, error } = useSelector(
    (state) => state.students
  );

  const [search, setSearch] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [sortBy, setSortBy] = useState("name");

  useEffect(() => {
    dispatch(fetchStudents());
  }, [dispatch]);

  const filteredStudents = students
    .filter((student) =>
      `${student.name} ${student.rollNumber}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    .filter((student) =>
      studentClass ? student.class === studentClass : true
    )
    .sort((a, b) =>
      String(a[sortBy] || "").localeCompare(
        String(b[sortBy] || ""),
        undefined,
        { numeric: true }
      )
    );

  if (loading) return <h4 className="text-center">Loading...</h4>;

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h2>Student List</h2>
        <Link to="/add" className="btn btn-primary">
          Add Student
        </Link>
      </div>

      <div className="row g-2 mb-3">
        <div className="col-md-4">
          <input
            className="form-control"
            placeholder="Search name or roll number"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={studentClass}
            onChange={(e) => setStudentClass(e.target.value)}
          >
            <option value="">All Classes</option>
            <option value="BCA">BCA</option>
            <option value="MCA">MCA</option>
            <option value="BBA">BBA</option>
          </select>
        </div>

        <div className="col-md-4">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Sort by Name</option>
            <option value="rollNumber">Sort by Roll Number</option>
          </select>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="table-responsive">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Roll No.</th>
              <th>Name</th>
              <th>Email</th>
              <th>Class</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredStudents.map((student) => (
              <tr key={student.id}>
                <td>{student.rollNumber}</td>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.class}</td>
                <td>
                  <Link
                    to={`/details/${student.id}`}
                    className="btn btn-info btn-sm me-2 mb-1"
                  >
                    Details / Edit
                  </Link>

                  <button
                    className="btn btn-danger btn-sm mb-1"
                    onClick={() => {
                      if (window.confirm("Delete this student?")) {
                        dispatch(deleteStudent(student.id));
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}

            {filteredStudents.length === 0 && (
              <tr>
                <td colSpan="5" className="text-center">
                  No students found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentList;