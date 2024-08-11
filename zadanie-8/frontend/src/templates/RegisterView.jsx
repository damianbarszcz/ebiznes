import {useState} from 'react'
import {Navigation,RegisterPanel} from '../components';
import {useNavigate} from "react-router-dom";
import axios from "axios";

const RegisterView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [surename, setSurename] = useState('');
    const navigate = useNavigate();

    const handleRegister  = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/register', { email, password, name, surename });
            console.log(response.data);
            navigate('/login');
        } catch (error) {
            console.error('Error logging in:', error);
        }
    }

    return (
        <>
            <Navigation />
            <RegisterPanel email = {email} password = {password} handleRegister = {handleRegister} setEmail = {setEmail}
                        setPassword = {setPassword} name = {name}  setName = {setName} surename = {surename} setSurename={ setSurename } />
        </>
    );
};

export default RegisterView;
