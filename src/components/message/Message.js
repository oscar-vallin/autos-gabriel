import React from 'react';
import { Alert } from 'react-bootstrap';
import styled from 'styled-components';

const StyledAlert = styled(Alert)`
  margin-top: 20px;
`;

export const Message = ({ type, children }) => {
  return (
    <StyledAlert  variant={type === 'error' ? 'danger' : 'success'}>
      <h4>{children}</h4>
    </StyledAlert>
  );
};
