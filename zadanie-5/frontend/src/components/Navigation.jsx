import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
    display: block;
    margin:auto;
    width: 100%;
    max-width: 1800px;
`

const NavBlock = styled.nav`
    display: block;
    padding: 1rem 0;
    min-width: 100%;
    background-color: #232631;
    border-bottom: 1px solid #232631;
    text-align: right;
`
const NavList = styled.ul`
    display: inline;
`
const NavListItem = styled.li`
    display: inline;
    list-style-type: none;
    margin-right:1rem;
`
const NavListLink = styled(Link)`
    font-weight: 400;
    color:#fff;
    cursor:pointer;
`

const Navigation = () => {
    return (
        <NavBlock>
            <Container>
                <NavList>
                    <NavListItem>
                        <NavListLink to="/">Strona główna</NavListLink>
                    </NavListItem>

                    <NavListItem>
                        <NavListLink to="/cart">Koszyk</NavListLink>
                    </NavListItem>
                </NavList>
            </Container>
        </NavBlock>

    );
};

export default Navigation;