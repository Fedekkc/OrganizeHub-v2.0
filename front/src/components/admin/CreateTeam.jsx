import React, { useState } from "react";
import styled from "styled-components";
import Button from "../Button";
import Modal from "../Modal";
import axios from "axios";

const Section = styled.div`
    width: 100%;
    margin: 2rem 0;
    padding: 2rem;
    border: 1px solid #ddd;
    border-radius: 5px;
    gap: 2rem;
`;

const SectionTitle = styled.h2`
    font-size: 1.5em;
    color: #555;
    margin-bottom: 10px;
`;

const Input = styled.input`
    width: 100%;
    padding: 10px;
    margin: 10px 0;
    border: 1px solid #ccc;
    border-radius: 5px;
`;

const Title = styled.h1`
    font-size: 2em;
    color: white;
`;

const CreateTeam = ({ users, organizationId }) => {
    const [formData, setFormData] = useState({
        name: "",
        users: [],
        organization: parseInt(organizationId, 10),
    });
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addSelectedUser = (userId) => {   
        if (userId !== "" && userId !== "select-user") {
            if (selectedUsers.includes(parseInt(userId))) {
                setSelectedUsers(selectedUsers.filter((id) => id !== parseInt(userId)));
            } else {
                setSelectedUsers([...selectedUsers, parseInt(userId)]);
            }
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateTeam = () => {
        setFormData({
            ...formData,
            users: selectedUsers,
        });
        console.log(selectedUsers);
        const updatedFormData = {
            ...formData,
            users: selectedUsers,
        };
        

        axios.post("http://localhost:5000/teams", updatedFormData)
            .then((response) => {
            console.log(response.data);
            setIsModalOpen(false);  // Close the modal on success
            })
            .catch((error) => {
            console.error(error);
            });

        setSelectedUsers([]);

        
        setFormData({
            name: "",
            users: [],
            organization: parseInt(organizationId, 10),
        });

    };

    return (
        <Section>
            <SectionTitle>Create Team</SectionTitle>

            <Button onClick={() => setIsModalOpen(true)}>Create Team</Button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <Title>Add Team</Title>
                <Input type="text" name="name" placeholder="Team Name" onChange={handleInputChange} />
                <select onChange={(e) => {
                    addSelectedUser(e.target.value);
                    e.target.value = "select-user";  // Resetear el valor del select
                }}>
                    <option value="select-user">Select User</option>
                    {users.map((user) => (
                        <option key={user.userId} value={user.userId}>
                            {user.email}
                        </option>
                    ))}
                </select>
                <ul>
                    {selectedUsers.map((userId) => (
                        <li key={userId}>{users.find( (user) => user.userId == userId)?.email}</li>
                    ))}
                </ul>

                <Button onClick={handleCreateTeam}>Add Team</Button>
            </Modal>
        </Section>
    );
};

export default CreateTeam;
