import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const TeamsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
`;

const TeamCard = styled.div`
    background-color: #f9f9f9;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 20px;
    margin: 10px;
    width: 300px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TeamName = styled.h2`
    margin: 0;
    font-size: 1.5em;
    color: #333;
`;

const Teams = () => {
    const [teams, setTeams] = useState([]);
    const [loading, setLoading] = useState(true);  // Para manejar el estado de carga
    const [organizationId, setOrganizationId] = useState(null);

    useEffect(() => {
        // Intentar obtener el organizationId desde el localStorage
        const storedOrganizationId = localStorage.getItem('organization');

        if (storedOrganizationId) {
            setOrganizationId(storedOrganizationId);
        } else {
            // Si no está disponible inmediatamente, puedes establecer un mecanismo de espera o dar un mensaje.
            console.log(storedOrganizationId);
            console.error('No se encontró el organizationId en localStorage');
            setLoading(false);  // Dejar de cargar si no se encuentra el ID
        }
    }, []);

    useEffect(() => {
        if (organizationId) {
            console.log('Obteniendo equipos para la organización', organizationId);
            axios.get(`http://localhost:5000/teams/organization/${organizationId}`)
                .then(response => {
                    console.log('Equipos obtenidos:', response.data);
                    setTeams(response.data);
                    setLoading(false);  // Ya no estamos cargando
                })
                .catch(error => {
                    console.error('Hubo un error al obtener los equipos', error);
                    setLoading(false);
                });
        }
    }, [organizationId]);  // Este efecto se ejecutará solo cuando organizationId tenga un valor

    if (loading) {
        return <p>Cargando equipos...</p>;
    }

    return (
        <TeamsContainer>
            {teams.length > 0 ? (
                teams.map(team => (
                    <TeamCard key={team.teamId}>
                        <TeamName>{team.name}</TeamName>
                    </TeamCard>
                ))
            ) : (
                <p>No se encontraron equipos para la organización.</p>
            )}
        </TeamsContainer>
    );
};

export default Teams;
