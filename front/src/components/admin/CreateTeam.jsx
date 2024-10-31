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
    const [isUserListVisible, setIsUserListVisible] = useState(false);

    const handleAddUser = (userId) => {
        if (!selectedUsers.includes(userId)) {
            setSelectedUsers([...selectedUsers, userId]);
        }
    };

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleCreateTeam = () => {
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

                <Button onClick={() => setIsUserListVisible(!isUserListVisible)}>
                    {isUserListVisible ? "Hide Users" : "Add Users"}
                </Button>

                {isUserListVisible && (
                    <ul>
                        {users.map((user) => (
                            <li key={user.userId}>
                                <span>{user.email}</span>
                                <Button onClick={() => handleAddUser(user.userId)}>Add</Button>
                            </li>
                        ))}
                    </ul>
                )}

                <h3>Selected Users:</h3>
                <ul>
                    {selectedUsers.map((userId) => (
                        <li key={userId}>{users.find(user => user.userId === userId)?.email}</li>
                    ))}
                </ul>

                <Button onClick={handleCreateTeam}>Add Team</Button>
            </Modal>
        </Section>
    );
};

export default CreateTeam;
