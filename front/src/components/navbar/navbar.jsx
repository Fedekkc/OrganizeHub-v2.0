import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useAuth } from '../../context/Context';
import { useNavigate } from 'react-router-dom';

const NavbarContainer = styled.nav`
    background-color: #f2f2f2;
    padding: 20px;
    width: 100vw;
`;
const List = styled.ul`
    display: flex;
    list-style: none;
    padding: 0;
    margin: 0;
    justify-content: center;
    align-items: center;
`;
const Item = styled.li`
    margin-right: 20px;
    cursor:pointer;
    &:hover {
        text-decoration: underline;
    }

`;

const ItemText = styled(Link)`
    text-decoration: none;
    color: black;
`;

const Navbar = () => {

    const navigate = useNavigate();
    const { logout } = useAuth();
    const { isAuthenticated } = useAuth();
    const handleLogout = () => {
        logout();
        navigate('/login');

    }


    return (
        <>

            <NavbarContainer>
                <List>
                    <Item>
                        <ItemText to="/tasks">Tasks</ItemText>
                    </Item>
                    <Item>
                        <ItemText to="/attendance">Attendance</ItemText>
                    </Item>
                    <Item>
                        <ItemText to="/teams">Teams</ItemText>
                    </Item>

                    <Item>
                        <ItemText to="/documentation">Documentation</ItemText>
                    </Item>

                    <Item>
                        <ItemText to="/passwords">Passwords</ItemText>
                    </Item>

                    {isAuthenticated
                        ?
                        <>
                            <Item>
                                <ItemText to="/logout" onClick={handleLogout} >Logout</ItemText>
                            </Item>
                            <Item>
                                <ItemText to="/admin">Admin</ItemText>
                            </Item>
                        </>

                        : null
                    }

                    {!isAuthenticated &&
                        <>
                            <Item>
                                <ItemText to="/login">Login</ItemText>
                            </Item>


                        </>


                    }




                </List>
            </NavbarContainer>
        </>
    );
};

export default Navbar;