import { useEffect, useState } from 'react';
import {Link, useNavigate} from "react-router-dom";
import styled from "styled-components";
import Cookies from 'js-cookie';

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

const NavListBtn = styled.button`
    font-weight: 400;
    color:#fff;
    cursor:pointer;
`

const Navigation = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserData = Cookies.get('user_data');

        if (storedUserData) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        navigate('/login');
    };

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

                    {!isLoggedIn ? (
                        <>
                            <NavListItem>
                                <NavListLink to="/login">Logowanie</NavListLink>
                            </NavListItem>

                            <NavListItem>
                                <NavListLink to="/register">Rejestracja</NavListLink>
                            </NavListItem>
                        </>
                    ) : (
                        <NavListItem>
                            <NavListBtn as="button" onClick={handleLogout}>Wyloguj</NavListBtn>
                        </NavListItem>
                    )}
                </NavList>
            </Container>
        </NavBlock>

    );
};

export default Navigation;