import React from 'react';

const ChangePassword = (props) => {

    return (
        <div>
            <div className="form-group row">
                <label htmlFor="profileFormOldPassword" className="col-sm-4 col-form-label">Old password</label>
                <div className="col-sm-8">
                    <input type="password" className={`form-control ${props.error ? "invalid" : null}`}
                           id="profileFormOldPassword"
                           placeholder="Old password"
                           name="password"
                           onChange={props.updatePassword}
                    />
                    <p className="errorMessage">{props.error ? "Invalid password" :
                        "Password needs to be between 6 and 30 characters long"}</p>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="profileFormNewPassword" className="col-sm-4 col-form-label">New password</label>
                <div className="col-sm-8">
                    <input type="password" className={`form-control ${!props.passwordMatch ? "invalid" : null}`}
                           id="profileFormNewPassword"
                           placeholder="New password"
                           name="newPassword"
                           onChange={props.checkPasswordMatch}
                    />
                    {props.newPasswordError ?
                        <p className="errorMessage">Password needs to be between 6 and 30 characters long</p> :
                        <p className="errorMessage"></p>}
                </div>
            </div>

            <div className="form-group row">
                <label htmlFor="profileFormConfirmPassword" className="col-sm-4 col-form-label">Confirm password</label>
                <div className="col-sm-8">
                    <input type="password" className={`form-control ${!props.passwordMatch ? "invalid" : null}`}
                           id="profileFormConfirmPassword"
                           placeholder="Confirm password"
                           name="confPassword"
                           onChange={props.checkPasswordMatch}
                    />
                </div>
            </div>
            {!props.passwordMatch ? <p className="text-center text-danger">Passwords don't match</p> : null}
        </div>
    )
};

export default ChangePassword;