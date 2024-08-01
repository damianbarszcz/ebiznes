import {TopPanel, ChatBlock, ChatRecipients} from '../components';
import styled from "styled-components";
import axios from 'axios';
import {useState} from "react";

const ChatRoot = styled.main`
    display: grid;
    grid-template-columns: 1fr 1fr;
    min-height: 100vh;
`

const ChatMessages = styled.section`
    background-color:#ffffff;
`

const IndexView = () => {
    const [query, setQuery] = useState('');
    const [messages, setMessages] = useState([]);

    const handleSubmit = async (event) => {
        setQuery('');
        event.preventDefault();
        try {
            const userMessage = { role: 'user', content: query };
            setMessages([...messages, userMessage]);

            const result = await axios.post('http://localhost:8000/query', { query });
            const botMessage = { role: 'bot', content: result.data.response };
            setMessages([...messages, userMessage, botMessage]);
        } catch (error) {
            const errorMessage = { role: 'bot', content: 'Wystąpił błąd podczas przetwarzania zapytania.' };
            setMessages([...messages, { role: 'user', content: query }, errorMessage]);
        }
    };

    return (
        <ChatRoot>
            <ChatRecipients />
            <ChatMessages>
                <TopPanel/>
                <ChatBlock handleSubmit = {handleSubmit} messages= {messages} setQuery = {setQuery} query = {query}/>
            </ChatMessages>
        </ChatRoot>
    );
};

export default IndexView;