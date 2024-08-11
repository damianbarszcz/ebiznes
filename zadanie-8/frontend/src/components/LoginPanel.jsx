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
`

const FormGroupInline = styled.div`
    display: flex;
    margin-bottom:2rem;
`

const FormInput = styled.input`
    box-sizing: border-box;
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

const OAuthBtn = styled.a`
    display: block;
    margin-right: auto;
    width:10rem;
    text-decoration: none;
    line-height: 45px;
    text-align: center;
    background-color: #fff;
    border-radius: 25px;
    font-size:0.8rem;
    color:#000;
    border:1px solid #000;
    
    &:hover{
        color:#4c8bf5;
    }
`

const LoginPanel = (props) => {

    return (
        <Container>
            <LoginInner>
                <LoginHeader>
                    <LoginHeaderTitle>Logowanie</LoginHeaderTitle>
                </LoginHeader>

                <LoginForm onSubmit={props.handleLogin}>
                    <FormGroup>
                        <FormInput type="text"  value={props.email}  placeholder="Adres email"
                                   onChange={(e) => props.setEmail(e.target.value)} required />
                    </FormGroup>

                    <FormGroup>
                        <FormInput type="password"  placeholder="Hasło"  value={props.password}
                                   onChange={(e) => props.setPassword(e.target.value)} required />
                    </FormGroup>

                    <FormGroupInline>
                        <OAuthBtn href="http://localhost:8000/api/auth/google/login">Zaloguj przez Google</OAuthBtn>
                        <FormSubmitBtn type="submit">Zaloguj</FormSubmitBtn>
                    </FormGroupInline>
                </LoginForm>
            </LoginInner>
        </Container>
    );
};

export default LoginPanel;