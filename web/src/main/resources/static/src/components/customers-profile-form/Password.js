import React from 'react';

const Password = () => {

    return(
        <div>
            <div className="form-group row">
                <label htmlFor="profileFormOldPassword" className="col-sm-4 col-form-label">Старый пароль</label>
                <div className="col-sm-8">
                    <input type="password" className="form-control" id="profileFormOldPassword" placeholder="Старый пароль"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="profileFormNewPassword" className="col-sm-4 col-form-label">Новый пароль</label>
                <div className="col-sm-8">
                    <input type="password" className="form-control" id="profileFormNewPassword" placeholder="Новый пароль"/>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="profileFormConfirmPassword" className="col-sm-4 col-form-label">Подтвердите пароль</label>
                <div className="col-sm-8">
                    <input type="password" className="form-control" id="profileFormConfirmPassword" placeholder="Подтвердите пароль"/>
                </div>
            </div>
        </div>
    )
};

export default Password;