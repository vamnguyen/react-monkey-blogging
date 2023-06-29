import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import React from "react";
import styled from "styled-components";

const HomePageStyles = styled.div``;

const HomePage = () => {
  const handleSignOut = () => {
    signOut(auth);
  };

  return (
    <HomePageStyles>
      <button onClick={handleSignOut}>Sign Out</button>
    </HomePageStyles>
  );
};

export default HomePage;
