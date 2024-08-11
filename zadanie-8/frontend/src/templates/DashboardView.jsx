import { useEffect, useState } from 'react';
import { DashboardPanel, Navigation } from '../components';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const DashboardView = () => {
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserData = Cookies.get('user_data');

        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setToken(userData.token);
            setEmail(userData.email);
            setFirstName(userData.firstName);
            setLastName(userData.lastName);
        } else {
            navigate('/login');
        }
    }, [navigate]);

    const handleLogout = () => {
        Cookies.remove('user_data');
        navigate('/login');
    };

    return (
        <>
            <Navigation />
            <DashboardPanel
                email={email}
                firstName={firstName}
                lastName={lastName}
                token={token}
                handleLogout={handleLogout}
            />
        </>
    );
};

export default DashboardView;