import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const { user } = useSelector((state) => state.auth);
  return (
    <div className="home-container">
      <div className="banner">
        <h1>
          My <span>Website</span>
        </h1>
        <p>Create By a RandomGuy</p>
        {user ? (
          <>
            <h3 style={{ color: "white" }}>Welcome {user.name}</h3>
          </>
        ) : (
          <Fragment>
            <Link to="/login">
              <button type="button" className="btn-left">
                Login
              </button>
            </Link>
            <Link to="/register">
              <button type="button" className="btn-right">
                Register
              </button>
            </Link>
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default Home;
