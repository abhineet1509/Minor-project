import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = () => {
    const adminInfo = localStorage.getItem('adminInfo');
    return adminInfo ? <Outlet /> : <Navigate to="/auth/admin" replace />;
};

export default AdminRoute;
