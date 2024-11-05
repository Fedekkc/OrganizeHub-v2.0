import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { AppContext } from '../../context/Context';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input'; 
import Button from '../../components/Button';
import { LuImagePlus } from "react-icons/lu";


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
    height: 80%;
    padding: 30px;
    border-radius: 10px;
    border: 1px solid #ccc;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h2`
    color: white;
`;

const InputContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 1rem;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 10px;   
    margin-bottom: 10px;
    height: 1rem;
    align-items: center;
`;

const InputImage = styled.input`
    display: none;

`;


const LoginText = styled.p`
    margin-top: 15px;
    text-align: center;
    a {
        color: #007bff;
        text-decoration: none;
    }
`;

const Image = styled(LuImagePlus)`
    font-size: 1rem;

    &:hover {
        cursor: pointer;
        transition: ease 0.1s;
        transform: scale(1.02);
        color: #DBEEB4;
        
    }
`;

const Signup = () => {
    const [avatar, setAvatar] = useState('');
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        avatar: '',
    });

    const { login } = useContext(AppContext);  // Supone que `login` es una función que guarda el JWT
    const navigate = useNavigate();

    const handleChange = (e) => {
        e.preventDefault();
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleImageChange = (e) => {
        e.preventDefault();
        setAvatar(e.target.files[0]);
        setFormData({
            ...formData,
            [e.target.name]: e.target.files[0]
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setFormData((prevFormData) => ({
            ...prevFormData,
            avatar: avatar,
        }));
        console.log(formData);
        

        axios.post('http://localhost:5000/users', formData,
            {

                headers: {
                    'Content-Type': 'multipart/form-data',

                },
            }
        )
            .then((res) => {
                console.log(res)
                if (res.data.token) {
                    console.log("adsasd");
                    console.log(res.data.token);
                    login(res.data);  // Usa el contexto o el estado global para manejar el inicio de sesión
                    navigate('/organization');
                    
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


                <InputContainer>
                <InputImage
                    type="file"
                    name="avatar"
                    id='avatar'
                    placeholder="Image"
                    onChange={handleImageChange}
                />

                <label htmlFor="avatar">
                    <Image />
                </label>
                </InputContainer>
                <Button type="submit">Sign Up</Button>
                <LoginText>
                    Already have an account? <a href="/login">Login</a>
                </LoginText>
            </Form>
        </SignupContainer>
    );
};

export default Signup;
