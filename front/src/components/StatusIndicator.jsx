import styled from 'styled-components';

const StatusIndicator = styled.span`
    width: 10px;
    height: 10px;
    border-radius: 50%;
    box-shadow: 2px 2px 4px rgba(0, 0, 0, 0.2);
    background-color: ${props => (props.online ? 'green' : 'gray')};
`;

export default StatusIndicator;