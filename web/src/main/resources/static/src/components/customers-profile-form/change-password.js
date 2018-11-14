import React from 'react';

const ChangePassword = () => {

    return (
        <div>
            <div className="form-group row">
                <label htmlFor="profileFormOldPassword" className="col-sm-4 col-form-label">Old password</label>
                <div className="col-sm-8">
                    <input type="password" className="form-control" id="profileFormOldPassword"
                           placeholder="Old password"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="profileFormNewPassword" className="col-sm-4 col-form-label">New password</label>
                <div className="col-sm-8">
                    <input type="password" className="form-control" id="profileFormNewPassword"
                           placeholder="New password"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="profileFormConfirmPassword" className="col-sm-4 col-form-label">Confirm password</label>
                <div className="col-sm-8">
                    <input type="password" className="form-control" id="profileFormConfirmPassword"
                           placeholder="Confirm password"/>
                </div>
            </div>
        </div>
    )
};

export default ChangePassword;