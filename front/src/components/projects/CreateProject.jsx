import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import { useAuth } from '../../context/Context';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';
import { CiCirclePlus } from 'react-icons/ci';
import Input from '../Input';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;
const Circle = styled(CiCirclePlus)`
    color: white;
    font-size: 2rem;

    &:hover {
        cursor: pointer;
        transition: ease 0.1s;
        transform: scale(1.02);
        color: #DBEEB4;
        
    }
`;
const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
`;

const Input2 = styled(Input)`
    margin-bottom: 10px;
    padding: 8px;
    font-size: 16px;
`;

const Button = styled.button`
    padding: 10px;
    font-size: 16px;
    background-color: #007BFF;
    color: white;
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
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


const CreateProject = () => {
    const [image, setImage] = useState(null);
    const authToken = useAuth();
    const userId = jwtDecode(authToken.authToken).userId;
    const users = []
    const navigate = useNavigate();
    users.push(userId);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        organizationId: parseInt(localStorage.getItem('organization'), 10),
        logo: '',
        users: users,
    });
    
    const handleImageChange = (e) => {
        setImage(e.target.files[0]); 
        setFormData((prevFormData) => ({
            ...prevFormData,
            logo: e.target.files[0], 
        }));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        
        console.log(formData);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        
        setFormData((prevFormData) => ({
            ...prevFormData,
            logo: image,
            users: users.map((user) => user.userId)
        }));
        
        console.log(formData);
        try {
            const response = await axios.post('http://localhost:5000/projects', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },  

            });
            navigate('/documentation');
            

            console.log(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container>
            <h1>Create Project</h1>
            <Form onSubmit={handleSubmit}>
                <Input2
                    type="text"
                    name="name"
                    placeholder="Project Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <Input2
                    type="text"
                    name="description"
                    placeholder="Description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />

                <InputContainer>
                <Input2 style={{ display: 'none' }}
                    type="file"  
                    id='logo'
                    name='logo'
                    placeholder="Upload Image"
                    onChange={handleImageChange}
                />
                <label htmlFor="logo"> <Circle/></label>
                </InputContainer>
                <Button type="submit">Create</Button>
            </Form>
        </Container>
    );
};

export default CreateProject;
