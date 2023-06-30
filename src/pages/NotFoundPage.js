import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NotFoundPageStyles = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .logo {
    margin-bottom: 40px;
    display: inline-block;
  }
  .heading {
    font-size: 60px;
    font-weight: bold;
    margin-bottom: 40px;
  }
  .back {
    background-color: ${(props) => props.theme.primary};
    color: white;
    padding: 15px 20px;
    border-radius: 4px;
    font-weight: 500;
    display: inline-block;
  }
`;

const NotFoundPage = () => {
  return (
    <NotFoundPageStyles>
      <NavLink to="/" className="logo">
        <img srcSet="/logo.png 2x" alt="monkey-blogging" />
      </NavLink>
      <h1 className="heading">Oops! Page not found</h1>
      <NavLink to="/" className={"back"}>
        Back to Home Page
      </NavLink>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
