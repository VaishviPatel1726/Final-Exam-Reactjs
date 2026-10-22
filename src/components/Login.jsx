import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch(
        `http://localhost:5000/users?email=${encodeURIComponent(email)}`
      );

      if (!response.ok) {
        throw new Error("Server error");
      }

      const users = await response.json();

      const user = users.find(
        (item) => item.password === password
      );

      if (user) {
        sessionStorage.setItem(
          "loggedInUser",
          JSON.stringify({ id: user.id, email: user.email })
        );

        navigate("/");
      } else {
        setError("Invalid email or password");
      }
    } catch {
      setError("Unable to connect to server");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow p-4 mx-auto" style={{ maxWidth: "400px" }}>
        <h2 className="text-center mb-4">Student Login</h2>

        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button className="btn btn-primary w-100" type="submit">
            Login
          </button>
        </form>

        <p className="text-muted mt-3 mb-0">
          Demo: admin@gmail.com / 123456
        </p>
      </div>
    </div>
  );
}

export default Login;