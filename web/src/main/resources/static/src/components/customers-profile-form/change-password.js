import React from 'react';

const ChangePassword = (props) => {

    return (
        <div>
            <div className="form-group row">
                <label htmlFor="profileFormOldPassword" className="col-sm-4 col-form-label">Old password</label>
                <div className="col-sm-8">
                    <input type="password" className="form-control"
                           id="profileFormOldPassword"
                           placeholder="Old password"
                           name="oldPassword"
                    />
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