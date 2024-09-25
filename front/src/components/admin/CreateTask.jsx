import React, { useState } from 'react';
import styled from 'styled-components';

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 300px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

const Label = styled.label`
    margin-bottom: 10px;
    font-weight: bold;
`;

const Input = styled.input`
    margin-top: 5px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Select = styled.select`
    margin-top: 5px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
`;

const Button = styled.button`
    margin-top: 15px;
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    &:hover {
        background-color: #0056b3;
    }
`;

const CreateTask = () => {
    const [formData, setFormData] = useState({
        assigneeType: 'group',
        assignee: '',
        task: '',
        priority: 'low'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form data submitted:', formData);
    };

    return (
        <Form onSubmit={handleSubmit}>
            <div>
                <Label>
                    Asignar a:
                    <Select name="assigneeType" value={formData.assigneeType} onChange={handleChange}>
                        <option value="group">Grupo</option>
                        <option value="user">Usuario</option>
                    </Select>
                </Label>
            </div>
            <div>
                <Label>
                    {formData.assigneeType === 'group' ? 'Grupo' : 'Usuario'}:
                    <Input
                        type="text"
                        name="assignee"
                        value={formData.assignee}
                        onChange={handleChange}
                        required
                    />
                </Label>
            </div>
            <div>
                <Label>
                    Tarea:
                    <Input
                        type="text"
                        name="task"
                        value={formData.task}
                        onChange={handleChange}
                        required
                    />
                </Label>
            </div>
            <div>
                <Label>
                    Nivel de prioridad:
                    <Select name="priority" value={formData.priority} onChange={handleChange}>
                        <option value="low">Baja</option>
                        <option value="medium">Media</option>
                        <option value="high">Alta</option>
                    </Select>
                </Label>
            </div>
            <Button type="submit">Crear Tarea</Button>
        </Form>
    );
};

export default CreateTask;
