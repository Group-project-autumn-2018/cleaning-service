import React from 'react';


const CustomerConfirmModalForm = (props) => {

    return (
        <div className="modal fade" id="confirm-modal" tabIndex="-1" role="dialog"
             aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content" onSubmit={props.onSubmit}>
                    <div className="modal-header">
                        <h5 className="modal-title" id="confirmOrderModalTitle">Please confirm your order</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <form className="modal-body container d-flex flex-column justify-content-center">
                    </form>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary btn-danger" data-dismiss="modal">Close
                        </button>
                        <button type="submit" className="btn btn-secondary btn btn-success">Confirm</button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CustomerConfirmModalForm;