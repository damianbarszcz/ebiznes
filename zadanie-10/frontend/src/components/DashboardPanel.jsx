import styled from "styled-components";

const Container = styled.div`
    display: block;
    margin:auto;
    width: 100%;
    max-width: 1800px;
`
const DashboardPanelInner = styled.div`
    margin:3rem auto;
    padding: 1rem 2rem;
    width: 100%;
    max-width: 600px;
    min-height:300px;
    background-color:#232631;
    text-align: left;
`
const DashboardPanelHeader = styled.header`
    margin-bottom:2.5rem;
    word-break: break-all;
`
const DashboardPanelHeaderCaption = styled.h1`
    font-size: 1.5rem;
    font-weight: 400;
`

const DashboardPanelHeaderSmallCaption = styled.p`
    font-size: 1rem;
    font-weight: 400;
`

const DashboardPanelLogout = styled.a`
    display: inline-block;
    padding: 0.85rem 2.35rem;
    background-color: transparent;
    border: 1px solid #DB1F48;
    color:#fff;
    cursor:pointer;
`

const DashboardPanel = (props) => {

    return (
        <Container>
            <DashboardPanelInner>
                <DashboardPanelHeader>
                    <DashboardPanelHeaderCaption>Witaj, <strong>{props.username}</strong></DashboardPanelHeaderCaption>
                    <DashboardPanelHeaderSmallCaption>Twój token: <strong>{props.token}</strong></DashboardPanelHeaderSmallCaption>
                </DashboardPanelHeader>

                <DashboardPanelLogout onClick={props.handleLogout}>Wyloguj</DashboardPanelLogout>
            </DashboardPanelInner>
        </Container>
    );
};

export default DashboardPanel;