import {useState} from 'react'
import {Navigation,LoginPanel} from '../components/index.js';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://db-backend-app.azurewebsites.net/api/login', { username, password });
            const { token, username: loggedInUsername } = response.data;

            localStorage.setItem('token', token);
            localStorage.setItem('username', loggedInUsername);

            navigate('/user/dashboard');
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Logowanie nie powiodło się. Sprawdź swoją nazwę użytkownika i hasło, a następnie spróbuj ponownie.');
        }
    };

    return (
        <>
            <Navigation />
            <LoginPanel username = {username} password = {password} handleLogin = {handleLogin}
                        setUsername = {setUsername} setPassword = {setPassword}/>
        </>
    );
};

export default LoginView;
