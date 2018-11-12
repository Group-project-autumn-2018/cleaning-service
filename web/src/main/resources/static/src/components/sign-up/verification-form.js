import React from "react";

const VerificationForm = (props) => {
    return (
        <div className="card person-card verification">
            <div className="card-body">
                <div className="row">
                    <p>The confidential code has been sent to you,
                        please check your email/phone for code and enter it in field below</p>
                    <div className="form-group col-md-6">
                        <input id="code" type="number" className="form-control" placeholder="Code"
                               value={props.code} onChange={props.changeCode}/>
                    </div>
                    <div className="form-group col-md-6">
                        <button type="button" className="btn btn-outline-primary btn-lg float-right"
                                onClick={props.verify}>
                            Verify !
                        </button>
                    </div>
                </div>
                <p>{props.verificationStatus ? 'Successful' : ''}</p>
            </div>
        </div>
    )
};

export default VerificationForm;