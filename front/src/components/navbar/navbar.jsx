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
                <Item href="/attendance" >Asistencia</Item>
                <Item href="/documentation">Documentación  </Item>
                <Item href="/teams" >Equipos</Item>
                <Item href="/passwords" >Contraseñas</Item>
                <Item>Salir</Item>
            </List>
        </NavbarContainer>
    );
};

export default Navbar;