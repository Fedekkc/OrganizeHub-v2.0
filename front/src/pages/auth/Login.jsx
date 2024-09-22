import React from 'react';
import styled from 'styled-components';

const LoginContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;

`;

const LoginForm = styled.form`
    display: flex;
    flex-direction: column;
    padding: 2rem;
    background: white;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Input = styled.input`
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: white;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const NotSignedUp = styled.p`
    margin-top: 1rem;
    text-align: center;
    
    a {
        color: #007bff;
        text-decoration: none;
    }
`;

const Login = () => {
    return (
        <LoginContainer>
            <LoginForm>
                <h2>Login</h2>
                <Input type="text" placeholder="Username" />
                <Input type="password" placeholder="Password" />
                <Button type="submit">Login</Button>
                <NotSignedUp>
                    Not signed up yet? <a href="/signup">Sign up</a>
                </NotSignedUp>

            </LoginForm>
        </LoginContainer>
    );
};

export default Login;