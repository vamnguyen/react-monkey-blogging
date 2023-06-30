import Layout from "components/layout/Layout";
import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import HomeBanner from "module/home/HomeBanner";
import React, { useEffect } from "react";
import styled from "styled-components";

const HomePageStyles = styled.div``;

const HomePage = () => {
  const handleSignOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    document.title = "Monkey Blogging";
  }, []);

  return (
    <HomePageStyles>
      <Layout>
        <HomeBanner></HomeBanner>
      </Layout>
    </HomePageStyles>
  );
};

export default HomePage;
