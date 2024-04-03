import React from 'react';
import { Alert } from 'react-bootstrap';
import styled from 'styled-components';

const StyledAlert = styled(Alert)`
  margin-top: 20px;
  max-width: 500px;
  margin: 0 auto;
  margin-bottom: 30px;

  h4 {
    text-align: center;
  }
`;

export const Message = ({ type, children }) => {

  const typeOfAlert = () => {
    switch (type) {
      case 'error':
        return 'danger';
      case 'warning':
        return 'warning'
      default:
        return 'success';
    }
  }
  return (
    <StyledAlert  variant={typeOfAlert()}>
      <h4>{children}</h4>
    </StyledAlert>
  );
};
