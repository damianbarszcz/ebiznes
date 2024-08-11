import {useState} from 'react'
import {Navigation,LoginPanel} from '../components';
import { useNavigate } from 'react-router-dom';
import axios from "axios";

const LoginView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/login', { email, password }, { withCredentials: true });
            navigate('/user/dashboard');
        } catch (error) {
            console.error('Error logging in:', error);
            alert('Logowanie nie powiodło się. Sprawdź swoją nazwę użytkownika i hasło, a następnie spróbuj ponownie.');
        }
    };

    return (
        <>
            <Navigation />
            <LoginPanel email = {email} password = {password} handleLogin = {handleLogin}
                        setEmail = {setEmail} setPassword = {setPassword}/>
        </>
    );
};

export default LoginView;
