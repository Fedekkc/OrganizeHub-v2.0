import axios from 'axios';
import React, { useState } from 'react';
import styled from 'styled-components';
import PhoneInput from 'react-phone-number-input';
import { jwtDecode } from 'jwt-decode';

import 'react-phone-number-input/style.css'
import { useAuth } from '../../context/Context';


const FormContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const FormTitle = styled.h2`
    margin-bottom: 20px;
    color: #333;
`;

const FormField = styled.div`
    margin-bottom: 15px;
    width: 100%;
`;

const Label = styled.label`
    display: block;
    margin-bottom: 5px;
    color: #555;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
    }
`;

const CreateOrganization = () => {



    const [formData, setFormData] = useState({
        name: '',
        description: '',
        email: '',
        phone: '',
        address: '',
        ownerId: null,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const authToken = useAuth();
    const handleSubmit = (e) => {
        e.preventDefault();
        
        
        const userId = jwtDecode(authToken.authToken).userId;
        setFormData({
            ...formData,
            ownerId: userId,
        });
        

        axios.post('http://localhost:5000/organizations', formData)
            .then((res) => {
                console.log("CREADO");
                console.log(res.data);
            })
            .catch((err) => {
                console.log(err);
            });

        
        };

    return (
        <FormContainer>
            <FormTitle>Create Organization</FormTitle>
            <form onSubmit={handleSubmit}>
                <FormField>
                    <Label htmlFor="name">Organization Name</Label>
                    <Input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </FormField>
                <FormField>
                    <Label htmlFor="description">Description</Label>
                    <Input
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </FormField>

                <FormField>
                    <Label htmlFor="email">Email</Label>
                    <Input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </FormField>

                <FormField>
                    <Label htmlFor="phone">Phone</Label>
                    <PhoneInput
                        defaultCountry={'AR'}
                        value={formData.phone}
                        onChange={phone => setFormData({ ...formData, phone })}
                        required

                    />
                </FormField>

                <FormField>
                    <Label htmlFor="address">Address</Label>
                    <Input
                        type="text"
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />
                </FormField>




                <Button type="submit">Create</Button>
            </form>
        </FormContainer>
    );
};

export default CreateOrganization;