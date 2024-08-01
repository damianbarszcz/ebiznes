import styled from "styled-components";

const Section = styled.section`
    display: block;
    min-width: 100%;
`

const Container = styled.div`
    padding: 1.5rem 3rem;
    border: 1.5px solid #e7e7e9;
`

const ChatProfile = styled.div`
    display: flex;
    align-items: center;
`

const ChatProfileAvatar = styled.div`
    display: block;
    width: 50px;
    height: 50px;
    border-radius: 100%;
    background-color:#e7e7e9;
`

const ChatProfileCaption = styled.div`
    display: block;
    margin-left:1rem;
    font-size:1.25rem;
    font-weight: 700;
    color:#0d0c22;
`

const TopPanel= (props) => {

    return (
        <Section>
            <Container>
                <ChatProfile>
                    <ChatProfileAvatar />
                    <ChatProfileCaption>Zadanie-9 Bot</ChatProfileCaption>
                </ChatProfile>
            </Container>
        </Section>
    );
};

export default TopPanel;