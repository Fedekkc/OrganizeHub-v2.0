import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AppContext } from '../../context/Context';

const SignupContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    background: white;
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    margin-bottom: 20px;
    color: #333;
`;

const Input = styled.input`
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
`;

const Button = styled.button`
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const LoginText = styled.p`
    margin-top: 15px;
    text-align: center;
    a {
        color: #007bff;
        text-decoration: none;
    }
`;

const Signup = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: ''
    });

    const { login } = useContext(AppContext);  // Supone que `login` es una función que guarda el JWT

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData.email);
        axios.post('http://localhost:5000/users', formData)
            .then((res) => {
                if (res.data.token) {
                    login(res.data.token);  // Usa el contexto o el estado global para manejar el inicio de sesión
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (
        <SignupContainer>
            <Form onSubmit={handleSubmit}>
                <Title>Sign Up</Title>
                <Input
                    type="text"
                    name="firstName"
                    placeholder="Name"
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    name="lastName"
                    placeholder="Surname"
                    onChange={handleChange}
                />
                <Input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                />
                <Input
                    type="email"
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                />
                <Button type="submit">Sign Up</Button>
                <LoginText>
                    Already have an account? <a href="/login">Login</a>
                </LoginText>
            </Form>
        </SignupContainer>
    );
};

export default Signup;
