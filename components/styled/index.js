import styled from 'styled-components';

const getColorFromMeta = ({ meta: { touched, active, valid } }) => {
  if (!valid && touched) return '#ff3860';
  if (valid && !active) return '#62dc7b';
  return '#ccc';
};

export const Row = styled.div`
  position: relative;
  display: flex;
  flex: 1;
  line-height: 2em;
  box-sizing: border-box;
  padding: 5px;
  align-items: stretch;
  justify-content: space-between;
`;

export const Label = styled.label`
  color: #333;
  width: 110px;
  font-size: 1em;
  line-height: 32px;
`;

export const Input = styled.input`
  flex: 1;
  padding: 3px 5px;
  font-size: 1em;
  margin-left: 15px;
  border: 1px solid ${getColorFromMeta};
  border-radius: 3px;
`;

export const Select = styled.select`
  flex: 1;
  padding: 3px 5px;
  font-size: 1em;
  margin-left: 15px;
  border: 1px solid '#ccc';
  border-radius: 3px;
`;

export const ErrorMsg = styled.span`
  line-height: 32px;
  margin-left: 10px;
  color: #ff3860;
  font-weight: bold;
  font-size: 0.7em;
  position: absolute;
  right: 12px;
  text-align: right;
`;
