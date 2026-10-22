import { Navigate, Outlet } from 'react-router-dom';

function PrivateRoute() {
    const user = sessionStorage.getItem("loggrdinuser");

    return user ? <Outlet /> : <Navigate to="/login" replace />

}

export default PrivateRoute;