import styled from "styled-components";

export const ModalBackdrop = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 10px;
  width: 90%;
  max-width: 600px;
  height: 50vh;
  display: flex;
  flex-direction: column;
  overflow-y: auto; 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
`;

export const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`;

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const Input = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export const Button = styled.button`
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

export const Select = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
`;

export const PhoneGroup = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

export const CountryCodeSelect = styled.select`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px 0 0 6px;
`;

export const PhoneInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-left: none;
  border-radius: 0 6px 6px 0;
`;

