import React, { useEffect, useContext, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../../context/Context';

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
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const { login, checkUserStatus, isAuthenticated } = useContext(AppContext);

    useEffect(() => {
        console.log(isAuthenticated)
        const checkStatus = async () => {
            await checkUserStatus();
        };
        checkStatus();
        console.log(isAuthenticated)
    }, [checkUserStatus]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/users/login', {
            email: formData.email,
            password: formData.password,
        }).then((res) => {
            login(res.data);
            checkUserStatus();
            navigate('/home');
        }).catch((err) => {
            console.log(err);
        });
    };

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <LoginContainer>
            <LoginForm onSubmit={handleSubmit}>
                <h2>Login</h2>
                <Input type="text" placeholder="Email" name='email' value={formData.email} onChange={handleChange} />
                <Input type="password" placeholder="Password" name='password' value={formData.password} onChange={handleChange} />
                <Button type="submit">Login</Button>
                <NotSignedUp>
                    Not signed up yet? <a href="/signup">Sign up</a>
                </NotSignedUp>
            </LoginForm>
        </LoginContainer>
    );
};

export default Login;