import { useEffect, useState } from 'react';
import { DashboardPanel, Navigation } from '../components/index.js';
import { useNavigate } from 'react-router-dom';

const DashboardView = () => {
    const [token, setToken] = useState('');
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUsername = localStorage.getItem('username');
        setToken(storedToken);
        setUsername(storedUsername);

    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        navigate('/login');
    };

    return (
        <>
            <Navigation />
            <DashboardPanel username = {username} token = {token} handleLogout = {handleLogout} />
        </>
    );
};

export default DashboardView;
