import styled from "styled-components";

const Container = styled.div`
    display: block;
    margin:auto;
    width: 100%;
    max-width: 1800px;
`

const AlertBlock = styled.div`
    display: block;
    position: fixed;
    bottom:0.25rem;
    left:50%;
    transform: translateX(-50%);
    padding: 0.85rem 0;
    width: 100%;
    max-width: 450px;
    background-color: #00FFA1;
    color: black;
    font-weight: 500;
    text-align: center;
`

const Alert = (props) => {

    return (
        <AlertBlock>
            <Container>
                <div>{props.message}</div>
            </Container>
        </AlertBlock>
    );
};

export default Alert;