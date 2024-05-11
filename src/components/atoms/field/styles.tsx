import styled from "styled-components";
export const StyledField = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 68px;
  gap: 0.2rem;
`;

export const StyledMessage = styled.p`
  color: ${({ isValid }) => (isValid ? "green" : "red")};
`;
export const StyledLabel = styled.label`
  color: ${({ isValid = true }) => (isValid ? "#000" : "red")};
`;
