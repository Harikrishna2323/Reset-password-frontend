import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";

import {
  clearErrors,
  updateProfile,
  loadUser,
} from "../../actions/userActions";
import { UPDATE_USER_RESET } from "../../constants/userConstants";
const UpdateProfile = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { user } = useSelector((state) => state.auth);

  const { error, isUpdated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
    console.log(error);

    if (error) {
      alert.error(error);
      console.log(error);
      dispatch(clearErrors);
    }

    if (isUpdated) {
      alert.success("Updated Successfully.");
      dispatch(loadUser());

      history.push("/me");
      dispatch({
        type: UPDATE_USER_RESET,
      });
    }
  }, [dispatch, alert, isUpdated, error, history, user]);

  const submitHandler = (e) => {
    e.preventDefault();
    console.log("name, email: ", name, email);
    dispatch(updateProfile(name, email));
  };

  return (
    <Fragment>
      <div className="container-container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form
              className="shadow-lg"
              encType="multipart/form-data"
              onSubmit={submitHandler}
            >
              <h1 className="mt-2 mb-5">Update Profile</h1>

              <div className="form-group">
                <label htmlFor="email_field">Name</label>
                <input
                  type="name"
                  id="name_field"
                  className="form-control"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="email_field">Email</label>
                <input
                  type="email"
                  id="email_field"
                  className="form-control"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <button
                type="submit"
                className="btn update-btn btn-block mt-4 mb-3"
                disabled={loading ? true : false}
              >
                Update
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default UpdateProfile;
