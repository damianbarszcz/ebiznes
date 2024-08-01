import styled from "styled-components";

const Section = styled.section`
    display: block;
    min-width: 100%;
`
const Container = styled.div`
    margin: 2rem 4rem;
`
const MsgBox = styled.div`
    height: 72.5vh;
    padding: 2rem;
    background-color: #e7e7e9;
    border-radius: 5px;
    overflow-y: scroll;
`
const MsgItemMe = styled.div`
    margin-bottom: 2rem;
    padding: 1rem;
    max-width:  480px;
    background-color:#6787ff;
    border-radius: 5px;
`
const MsgItemBot = styled.div`
    margin-bottom: 2rem;
    margin-left: auto;
    padding: 1rem;
    max-width:  480px;
    background-color:#fffefe;
    border-radius: 5px;
    color:#0d0c22;
`
const MsgForm = styled.form`
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    padding: 1rem 0rem 1rem;
`
const MsgFormInput = styled.input`
    box-sizing: border-box;
    background-color: #fff;
    padding: 1rem 2rem;
    width: 85%;
    border: 1.5px solid #e7e7e9;
    border-radius: 5px;
    
`
const MsgFormSubmit = styled.button`
    padding: 0.8rem 2rem;
    background-color:#0d0c22;
    border-radius: 5px;
    color:#fff;
`

const ChatBlock = (props) => {

    return (
        <Section>
            <Container>
                <MsgBox>
                    {props.messages.map((msg, index) => (
                        msg.role === 'user' ? (
                            <MsgItemMe key={index}>{msg.content}</MsgItemMe>
                        ) : (
                            <MsgItemBot key={index}>{msg.content}</MsgItemBot>
                        )
                    ))}
                </MsgBox>

                <MsgForm onSubmit={props.handleSubmit}>
                    <MsgFormInput type="text" value={props.query} onChange={(e) => props.setQuery(e.target.value)}/>
                    <MsgFormSubmit type="submit">Wyślij</MsgFormSubmit>
                </MsgForm>
            </Container>
        </Section>
    );
};

export default ChatBlock;