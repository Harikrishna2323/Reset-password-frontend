import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";

import { clearErrors, updatePassword } from "../../actions/userActions";
import { UPDATE_PASSWORD_RESET } from "../../constants/userConstants";
import Loader from "../layout/Loader";

const UpdatePassword = ({ history }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { isUpdated, error, loading } = useSelector((state) => state.user);

  useEffect(() => {
    if (isUpdated) {
      alert.success("Password updated");
      history.push("/me");
      dispatch({
        type: UPDATE_PASSWORD_RESET,
      });
    }

    if (error) {
      alert.error(error);
      console.log(error);
      dispatch(clearErrors);
    }
  }, [dispatch, alert, isUpdated, error, history]);

  const submitHandler = (e) => {
    e.preventDefault();

    console.log(oldPassword, newPassword);
    dispatch(updatePassword(oldPassword, newPassword));
  };
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="container-container-fluid">
            <div className="row wrapper">
              <div className="col-10 col-lg-5">
                <form className="shadow-lg" onSubmit={submitHandler}>
                  <h1 className="mt-2 mb-5">Update Password</h1>
                  <div className="form-group">
                    <label htmlFor="old_password_field">Old Password</label>
                    <input
                      type="password"
                      id="old_password_field"
                      className="form-control"
                      value={oldPassword}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="new_password_field">New Password</label>
                    <input
                      type="password"
                      id="new_password_field"
                      className="form-control"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn update-btn btn-block mt-4 mb-3"
                    disabled={loading ? true : false}
                  >
                    Update Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default UpdatePassword;
