import React from 'react';
import styled from 'styled-components';

interface inputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
  label?: string;
}

const InputField = ({ error, ...rest }: inputProps, ref: any) => {
  return (
    <FormGroup>
      {rest.label && <Label>{rest.label}</Label>}
      <Input {...rest} ref={ref} />
      {error && <Error>{error}</Error>}
    </FormGroup>
  );
};

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 47px;
`;

const Input = styled.input`
  width: 513px;
  height: 50px;
  padding: 11px 20px;

  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;

  &:focus {
    outline: none;
  }

  color: #232323;
`;

const Label = styled.label`
  font-style: normal;
  font-weight: 700;
  font-size: 22px;
  line-height: 27px;
  font-feature-settings: 'cpsp' on;

  color: #232323;
  margin-bottom: 10px;
`;

const Error = styled.span`
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 19px;
  margin-left: 20px;
  margin-top: 5px;

  color: #f15524;
`;
export default React.forwardRef(InputField);
