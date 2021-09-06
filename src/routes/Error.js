import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
  display: flex;
  justify-content: center;
`;

const Message = styled.h1`
  font-size: 50px;
  color: red;
`;

const Error = ({ message }) => {
  return (
    <Container>
      <Message>{message}</Message>
      <Link to="/">홈으로</Link>
    </Container>
  );
};

export default Error;
