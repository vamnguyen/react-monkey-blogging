import { Button } from "components/button";
import { useAuth } from "contexts/auth-context";
import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const menuLinks = [
  {
    url: "/",
    title: "Home",
  },
  {
    url: "/blog",
    title: "Blog",
  },
  {
    url: "/contact",
    title: "Contact",
  },
];

const HeaderStyles = styled.header`
  padding: 35px 0;
  .logo-app {
    display: block;
    max-width: 100px;
    height: 80px;
  }
  .header-main {
    display: flex;
    align-items: center;
  }
  .menu {
    display: flex;
    align-items: center;
    list-style: none;
    gap: 20px;
    margin-left: 40px;
    font-weight: 500;
  }
  .search {
    position: relative;
    margin-left: auto;
    border: 1px solid #ccc;
    border-radius: 8px;
    width: 100%;
    max-width: 320px;
    padding: 15px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-right: 20px;
  }
  .search-input {
    padding-right: 30px;
    flex: 1;
    font-weight: 500;
  }
  .search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
  }
  .header-button {
    margin-left: 25px;
    height: 56px;
  }
`;

function getLastName(fullName) {
  if (!fullName) return "User";
  const length = fullName.split(" ").length;
  return fullName.split(" ")[length - 1];
}

const Header = () => {
  const { userInfo } = useAuth();

  return (
    <HeaderStyles>
      <div className="container">
        <div className="header-main">
          <NavLink to="/">
            <img src="/logo.png" alt="monkey-blogging" className="logo-app" />
          </NavLink>
          <ul className="menu">
            {menuLinks.map((item) => (
              <li className="menu-item" key={item.title}>
                <NavLink to={item.url} className="menuLink">
                  {item.title}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="search">
            <input
              type="text"
              className="search-input"
              placeholder="Search posts..."
            />
            <span className="search-icon">
              <svg
                width="18"
                height="17"
                viewBox="0 0 18 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="7.66669"
                  cy="7.05161"
                  rx="6.66669"
                  ry="6.05161"
                  stroke="#999999"
                  strokeWidth="1.5"
                />
                <path
                  d="M17.0001 15.5237L15.2223 13.9099L14.3334 13.103L12.5557 11.4893"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
                <path
                  d="M11.6665 12.2964C12.9671 12.1544 13.3706 11.8067 13.4443 10.6826"
                  stroke="#999999"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </div>
          {!userInfo ? (
            <Button
              style={{ maxWidth: "150px" }}
              className="header-button"
              type="button"
              to="/sign-up"
              kind="primary"
            >
              Sign Up
            </Button>
          ) : (
            <div className="header-auth">
              <span>Welcome back, </span>
              <strong className="text-primary">
                {getLastName(userInfo?.displayName)}
              </strong>
            </div>
          )}
        </div>
      </div>
    </HeaderStyles>
  );
};

export default Header;
