import React from "react";
import MaskedInput, {conformToMask} from "react-text-mask";
import DropdownAddressList from "./dropdown-address-list";

const MainPanel = (props) => {
    return (
        <React.Fragment>
            <div className="form-group row">
                <label htmlFor="profileFormLogo" className="col-sm-4 col-form-label">Logo</label>
                <div className="custom-file col-sm-5 profile-service-input">
                    <input type="file" className="custom-file-input" id="inputGroupFile01"
                           onChange={props.onChangeLogoHandler} aria-describedby="inputGroupFileAddon01"/>
                    <label className="custom-file-label" htmlFor="inputGroupFile01">
                        {props.logo !== '' ?
                            (props.logo.name.length < 25 ? props.logo.name : props.logo.name.slice(0, 25) + '...') :
                            "Choose file"}</label>
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="profileFormName" className="col-sm-4 col-form-label">Name</label>
                <div className="col-sm-8">
                    <input type="text" className="form-control" id="profileFormName" placeholder="Name"
                           name="username" value={props.service.username} onChange={props.onChangeHandler}
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="profileFormEmail" className="col-sm-4 col-form-label">Email</label>
                <div className="col-sm-8">
                    <input type="email" className="form-control" id="profileFormEmail" placeholder="Email"
                           name="email" value={props.service.email} onChange={props.onChangeHandler}
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="profileFormPhone" className="col-sm-4 col-form-label">Phone</label>
                <div className="col-sm-8">
                    <MaskedInput
                        mask={props.phoneNumberMask}
                        className="form-control"
                        placeholder="375(__)___-____"
                        guide={false}
                        id="profileFormPhone"
                        name="phone"
                        value={conformToMask(props.service.phone ? props.service.phone : "",
                            props.phoneNumberMask, {guide: false}).conformedValue}
                        onChange={props.onChangeHandler}
                    />
                </div>
            </div>
            <div className="form-group row">
                <label htmlFor="profileFormAddress" className="col-sm-4 col-form-label">Address</label>
                <div className="col-sm-8 dropdown">
                    <input type="text" className="form-control dropdown-toggle" id="profileFormAddress"
                           data-toggle="dropdown" placeholder="Address"
                           name="address"
                           value={props.service.address.address}
                           onChange={props.onChangeHandler}
                    />
                    <DropdownAddressList array={props.addresses} onClickHandler={props.onClickAddressHandler}/>
                </div>
            </div>

        </React.Fragment>
    )
};

export default MainPanel;