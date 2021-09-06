import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.ul`
  display: flex;
  margin-bottom: 10px;
`;

const NavItem = styled.li`
  margin-right: 5px;
`;

const Header = () => {
  return (
    <Nav>
      <NavItem>
        <Link to="/">Home</Link>
      </NavItem>
      <NavItem>
        <Link to="/hi">Hi</Link>
      </NavItem>
    </Nav>
  );
};

export default Header;
