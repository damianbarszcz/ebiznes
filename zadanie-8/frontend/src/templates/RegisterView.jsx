import {useState} from 'react'
import {Navigation,RegisterPanel} from '../components';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const RegisterView = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister  = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/register', { username, password });
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    return (
        <>
            <Navigation />
            <RegisterPanel username = {username} password = {password} handleRegister = {handleRegister} setUsername = {setUsername}
                        setPassword = {setPassword}/>
        </>
    );
};

export default RegisterView;
