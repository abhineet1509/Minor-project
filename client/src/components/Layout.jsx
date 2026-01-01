import React from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
    const location = useLocation();
    const isLandingPage = location.pathname === '/';

    return (
        <div className="flex flex-col min-h-screen">
            <Navbar />
            <div className="flex-grow pt-24">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;
