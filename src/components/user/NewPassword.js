import React, { Fragment, useState, useEffect } from "react";
import { useAlert } from "react-alert";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, resetPassword } from "../../actions/userActions";

const NewPassword = ({ history, match }) => {
  const alert = useAlert();
  const dispatch = useDispatch();

  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  const { success, error } = useSelector((state) => state.forgotPassword);

  useEffect(() => {
    if (success) {
      alert.success("Password Updated Successfully.");
      history.push("/login");
    }

    if (error) {
      console.log("error:", error);
      alert.error(error);
      dispatch(clearErrors);
    }
  }, [dispatch, alert, success, error, history]);
  console.log(match.params.token);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(resetPassword(match.params.token, password, passwordConfirm));
  };

  return (
    <Fragment>
      <div className="container-container-fluid">
        <div className="row wrapper">
          <div className="col-10 col-lg-5">
            <form className="shadow-lg" onSubmit={submitHandler}>
              <h1 className="mb-3">New Password</h1>

              <div className="form-group">
                <label htmlFor="password_field">Password</label>
                <input
                  type="password"
                  id="password_field"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label htmlFor="confirm_password_field">Confirm Password</label>
                <input
                  type="password"
                  id="confirm_password_field"
                  className="form-control"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />
              </div>

              <button
                id="new_password_button"
                type="submit"
                className="btn btn-block py-3"
              >
                Set Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default NewPassword;
