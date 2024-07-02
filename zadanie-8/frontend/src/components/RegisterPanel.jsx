import styled from "styled-components";

const Container = styled.div`
    display: block;
    margin:auto;
    width: 100%;
    max-width: 1800px;
`

const LoginInner = styled.div`
    margin:3rem auto;
    padding: 1rem 2rem;
    width: 100%;
    max-width: 400px;
    min-height:450px;
    background-color:#232631;
`

const LoginHeader = styled.header`
    display: block;
    padding: 1.5rem 0;
    min-width: 100%;
    text-align: center;
`
const LoginHeaderTitle = styled.h1`
    font-size: 2rem;
    font-weight: 700;
`

const LoginForm = styled.form`
    margin-top:1.5rem;
`

const FormGroup = styled.div`
    margin-bottom:2rem;
    
    &:last-child{
        text-align: right;
    }
`

const FormInput = styled.input`
    width:100%;
    max-width: 100%;
    padding: 1rem;
`

const FormSubmitBtn = styled.button`
    display: inline-block;
    padding: 0.85rem 2.35rem;
    background-color: transparent;
    border: 1px solid #DB1F48;
`

const RegisterPanel = (props) => {

    return (
        <Container>
            <LoginInner>
                <LoginHeader>
                    <LoginHeaderTitle>Rejestracja</LoginHeaderTitle>
                </LoginHeader>

                <LoginForm onSubmit={props.handleRegister}>
                    <FormGroup>
                        <FormInput type="text"  value={props.username}  placeholder="Podaj nazwę użytkownika"
                                   onChange={(e) => props.setUsername(e.target.value)} required />
                    </FormGroup>

                    <FormGroup>
                        <FormInput type="password"  placeholder="Podaj Hasło"  value={props.password}
                                   onChange={(e) => props.setPassword(e.target.value)} required />
                    </FormGroup>

                    <FormGroup>
                        <FormSubmitBtn type="submit">Zarejestruj</FormSubmitBtn>
                    </FormGroup>
                </LoginForm>
            </LoginInner>
        </Container>
    );
};

export default RegisterPanel;