import React from 'react';
import styled from 'styled-components';

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

const ItemText = styled.a`
    text-decoration: none;
    color: black;
`;

const Navbar = () => {
    return (
        <NavbarContainer>
            <List>
                <Item>
                    <ItemText href="/tasks">Tasks</ItemText>
                </Item>
                <Item>
                    <ItemText href="/attendance">Attendance</ItemText>
                </Item>
                <Item>
                    <ItemText href="/teams">Teams</ItemText>
                </Item>

                <Item>
                    <ItemText href="/documentation">Documentation</ItemText>
                </Item>

                <Item>
                    <ItemText href="/passwords">Passwords</ItemText>
                </Item>

                <Item>
                    <ItemText href="/logout">Logout</ItemText>
                </Item>



            </List>
        </NavbarContainer>
    );
};

export default Navbar;