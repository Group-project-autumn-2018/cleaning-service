import React, {Component} from 'react';
import './sign-up.css';
import MaskedInput from 'react-text-mask';
import ServiceApi from '../services/Service-api';
import VerificationForm from './verification-form';

class SignUpService extends Component {
    serviceApi = new ServiceApi();

    constructor(props) {
        super(props);
        this.state = {
            avatar: '',
            logotype: '',
            description: '',
            priceDto: {
                basePrice: 0,
                standardRoomCleaning: 1,
                springCleaning: 0,
                repairAndConstructionCleaning: 0,
                dryCarpetCleaning: 0,
                officeCleaning: 0,
                furnitureAndCoatingsCleaning: 0,
                industrialCleaning: 0,
                poolCleaning: 0,
                smallRoom: 0,
                bigRoom: 0,
                bathroom: 0
            },
            cleaningTimeDto: {
                standardRoomCleaningTime: 0,
                springCleaningTime: 0,
                repairAndConstructionCleaningTime: 0,
                dryCarpetCleaningTime: 0,
                officeCleaningTime: 0,
                furnitureAndCoatingsCleaningTime: 0,
                industrialCleaningTime: 0,
                poolCleaningTime: 0,
                smallRoomCleaningTime: 0,
                bigRoomCleaningTime: 0,
                bathroomCleaningTime: 0
            },
            username: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            disabled: false,
            code: '',
            verificationStatus: false,
            message: '',

            checkStandardRoomCleaning: false,
            checkSpringCleaning: false,
            checkRepairAndConstructionCleaning: false,
            checkDryCarpetCleaning: false,
            checkOfficeCleaning: false,
            checkFurnitureAndCoatingsCleaning: false,
            checkIndustrialCleaning: false,
            checkPoolCleaning: false
        }
    }

    changeUsername = (event) => {
        this.setState({username: event.target.value});
        if (event.target.value.length < 3) {
            event.target.classList.add('is-invalid');
        } else {
            event.target.classList.remove('is-invalid');
        }
    };

    changeCode = (event) => {
        this.setState({code: event.target.value});
        if (event.target.value.length !== 6) {
            event.target.classList.add('is-invalid');
        } else {
            event.target.classList.remove('is-invalid');
        }
    };

    changeEmail = (event) => {
        this.setState({email: event.target.value});
    };

    changePhone = (event) => {
        this.setState({phone: event.target.value});
        if (event.target.value.length < 18) {
            event.target.classList.add('is-invalid');
        } else {
            event.target.classList.remove('is-invalid');
        }
    };

    changePassword = (event) => {
        this.setState({password: event.target.value});
    };

    changePasswordConfirm = (event) => {
        this.setState({confirmPassword: event.target.value});
        if (event.target.value !== this.state.password) {
            event.target.classList.add('is-invalid');
        } else {
            event.target.classList.remove('is-invalid');
        }
    };

    validate = () => {
        if (this.state.password !== this.state.confirmPassword) {
            return false;
        }
        if (this.state.username.length < 3) {
            return false;
        }
        return !(this.state.email === '' && this.state.phone === '+375');
    };


    preRegister = () => {
        if (this.validate()) {
            this.setState({disabled: true});
            const objDto = {
                description: this.state.description,
                username: this.state.username,
                email: this.state.email,
                phone: this.state.phone,
                password: this.state.password,
                priceDto: {
                    ...this.state.priceDto
                },
                cleaningTimeDto: {
                    ...this.state.cleaningTimeDto
                }
            };

            //let obj = new FormData();
            //obj.append("objDto", JSON.stringify(objDto));
            //if (this.logotype !== '') obj.append("logotype", this.state.logotype);
            let obj = JSON.stringify(objDto);
            this.serviceApi.preRegisterService(obj).then(resp => {
                if (resp === 202) {
                    const key = (this.state.email !== '') ? this.state.email : this.state.phone;
                    const credentials = {
                        username: this.state.username,
                        base64Token: this.base64EncodeUnicode(key + this.state.password)
                    };
                    //this.props.setCredentials(credentials);
                } else {
                    this.setState({disabled: false});
                }
            });
        }
    };

    verify = () => {
        const token = this.state.username + this.state.password;
        const obj = {
            code: this.state.code,
            encodedString: this.base64EncodeUnicode(token)
        };
        this.serviceApi.verifyService(obj).then(status => {
            switch (status) {
                case 201:
                    this.setState({verificationStatus: true});
                    break;
                case 423:
                    this.setState({
                        disabled: false,
                        message: 'Credentials has been deleted, you need to re-register'
                    });
                    break;
                case 406:
                    this.setState({
                        message: 'Wrong verification code'
                    });
            }
        });
    };

    base64EncodeUnicode = (str) => {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
            function toSolidBytes(match, p1) {
                return String.fromCharCode('0x' + p1);
            }));
    };


    InputSpringCleaning = () => {
        return (
            <div>
                <input type="text"
                       placeholder={"coefficient for spring cleaning price"}
                       id="springCleaningPriceCoeff"
                       onChange={this.state.priceDto.springCleaning}

                />
                <input type="text"
                       placeholder={"Time for spring cleaning"}
                       id="springCleaningCleaningTime"
                       onChange={this.state.cleaningTimeDto.springCleaningTime}

                />
            </div>
        )
    };

    InputRepairAndConstructionCleaning = () => {
        return (
            <div>
                <input type="text"
                       placeholder={"coefficient for repair and construction cleaning price"}
                       id="repairAndConstructionCleaningPriceCoeff"
                       onChange={this.state.priceDto.repairAndConstructionCleaning}

                />
                <input type="text"
                       placeholder={"Time for repair and construction cleaning"}
                       id="repairAndConstructionCleaningTime"
                       onChange={this.state.cleaningTimeDto.repairAndConstructionCleaningTime}

                />
            </div>
        )
    };

    InputDryCarpetCleaning = () => {
        return (
            <div>
                <input type="text"
                       placeholder={"coefficient for dry carpet cleaning price"}
                       id="dryCarpetCleaningPriceCoeff"
                       onChange={this.state.priceDto.dryCarpetCleaning}

                />
                <input type="text"
                       placeholder={"Time for dry carpet cleaning"}
                       id="dryCarpetCleaningTime"
                       onChange={this.state.cleaningTimeDto.dryCarpetCleaningTime}

                />
            </div>
        )
    };

    InputOfficeCleaning = () => {
        return (
            <div>
                <input type="text"
                       placeholder={"coefficient for office cleaning price"}
                       id="officeCleaningPriceCoeff"
                       onChange={this.state.priceDto.officeCleaning}

                />
                <input type="text"
                       placeholder={"Time for office cleaning"}
                       id="officeCleaningTime"
                       onChange={this.state.cleaningTimeDto.officeCleaningTime}

                />
            </div>
        )
    };

    InputFurnitureAndCoatingsCleaning = () => {
        return (
            <div>
                <input type="text"
                       placeholder={"coefficient for furniture and coatings cleaning price"}
                       id="furnitureAndCoatingsCleaningPriceCoeff"
                       onChange={this.state.priceDto.furnitureAndCoatingsCleaning}

                />
                <input type="text"
                       placeholder={"Time for furniture and coatings cleaning"}
                       id="furnitureAndCoatingsCleaningTime"
                       onChange={this.state.cleaningTimeDto.furnitureAndCoatingsCleaningTime}

                />
            </div>
        )
    };

    InputIndustrialCleaning = () => {
        return (
            <div>
                <input type="text"
                       placeholder={"coefficient for industrial cleaning price"}
                       id="industrialCleaningPriceCoeff"
                       onChange={this.state.priceDto.industrialCleaning}

                />
                <input type="text"
                       placeholder={"Time for industrial cleaning"}
                       id="industrialCleaningTime"
                       onChange={this.state.cleaningTimeDto.industrialCleaningTime}

                />
            </div>
        )
    };


    InputPoolCleaning = () => {
        return (
            <div>
                <input type="text"
                       placeholder={"coefficient for pool cleaning price"}
                       id="poolCleaningPriceCoeff"
                       onChange={this.state.priceDto.poolCleaning}
                />
                <input type="text"
                       placeholder={"Time for pool cleaning "}
                       id="poolCleaningPriceCleaningTime"
                       onChange={this.state.cleaningTimeDto.poolCleaningTime}
                />
            </div>
        )
    };

    openAvatar = (event) => {
        let input = event.target;
        this.setState({logotype: input.files[0]});
        let fileReader = new FileReader();
        fileReader.readAsDataURL(input.files[0]);
        fileReader.onload = () => {
            this.setState({avatar: fileReader.result});
        }
    };

    handleInputChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
        this.state.checkFurnitureAndCoatingsCleaning = value;
        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <div className="container signup-component">
                <div className="overlay"/>
                <form>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h2 id="Logotype" className="card-title">
                                        Logotype
                                    </h2>
                                    <div className="form-group col-md-5">
                                        <img src={this.state.avatar}/>
                                        <input
                                            id="logotype"
                                            type="file"
                                            className="form-control"
                                            accept="image/*"
                                            onChange={this.openAvatar}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h2 id="company_description" className="card-title">
                                        What is the your company?
                                    </h2>
                                    <div className="form-group">
                                        <label htmlFor="description" className="col-form-label">
                                            Description
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="description"
                                            placeholder="Smb about company"
                                            required
                                        />
                                        <label htmlFor="address" className="col-form-label">
                                            Address
                                        </label>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="address"
                                            placeholder="country, city, street, home, flat"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-body">
                                <div className="form-group">
                                    <h2 htmlFor="Types" className="card-title">
                                        Types of services provided and their cost
                                    </h2>
                                    <div id="standardRoomCleaning">
                                        <label>Standard room cleaning coefficient</label>
                                        <input type="text" defaultValue={1} disabled={true}/>
                                        <input type="text"/>
                                    </div>

                                    <div id="springCleaningDiv">
                                        <label>Spring cleaning</label>
                                        <input type="checkBox" name={"checkSpringCleaning"}
                                               onChange={this.handleInputChange}/>
                                        {this.state.checkSpringCleaning ? <InputSpringCleaning /> : ''}
                                    </div>

                                    <div id="repairAndConstructionCleaningDiv">
                                        <label>Repair and construction cleaning</label>
                                        <input type="checkBox" name={"checkRepairAndConstructionCleaning"}
                                               onChange={this.handleInputChange}/>

                                        {this.state.checkRepairAndConstructionCleaning ?
                                            <InputRepairAndConstructionCleaning /> : ''}
                                    </div>

                                    <div id="dryCarpetCleaningDiv">
                                        <label>Dry carpet cleaning</label>
                                        <input type="checkBox" name={"checkDryCarpetCleaning"}
                                               onChange={this.handleInputChange}/>
                                        {this.state.checkDryCarpetCleaning ? <InputDryCarpetCleaning /> : ''}
                                    </div>

                                    <div id="officeCleaningDiv">
                                        <label>Office cleaning</label>
                                        <input type="checkBox" name={"checkOfficeCleaning"}
                                               onChange={this.handleInputChange}/>
                                        {this.state.checkOfficeCleaning ? <InputOfficeCleaning /> : ''}
                                    </div>

                                    <div id="furnitureAndCoatingsCleaningDiv">
                                        <label>Furniture and coatings cleaning</label>
                                        <input type="checkBox" name={"checkFurnitureAndCoatingsCleaning"}
                                               onChange={this.handleInputChange}/>
                                        {this.state.checkFurnitureAndCoatingsCleaning ?
                                            <InputFurnitureAndCoatingsCleaning /> : ''}
                                    </div>

                                    <div id="industrialCleaningDiv">
                                        <label>Industrial cleaning</label>
                                        <input type="checkBox" name={"checkIndustrialCleaning"}
                                               onChange={this.handleInputChange}/>
                                        {this.state.checkIndustrialCleaning ? <InputIndustrialCleaning /> : ''}
                                    </div>
                                    <div id="poolCleaningDiv">
                                        <label>Pool cleaning</label>
                                        <input type="checkBox" name={"checkPoolCleaning"}
                                               onChange={this.handleInputChange}/>
                                        {this.state.checkPoolCleaning ? <InputPoolCleaning /> : ''}
                                    </div>

                                    <div id="RoomsDiv">
                                        <label>Small room </label>
                                        <input type="text"/>
                                        <label>Big room </label>
                                        <input type="text"/>
                                        <label>Bathroom</label>
                                        <input type="text"/>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="card person-card">
                        <div className="card-body">
                            <h2 id="who_message" className="card-title">Who are you ?</h2>
                            <div className="row">
                                <div className="form-group col-md-6">
                                    <input id="first_name" type="text" className="form-control" placeholder="Username"
                                           value={this.state.username} onChange={this.changeUsername}
                                           disabled={this.state.disabled}/>
                                    <div id="first_name_feedback" className="invalid-feedback"/>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title">How to contact you ?</h2>
                                    <div className="form-group">
                                        <label htmlFor="email" className="col-form-label">Email</label>
                                        <input type="email" className="form-control" id="email"
                                               placeholder="example@gmail.com" value={this.state.email}
                                               onChange={this.changeEmail} disabled={this.state.disabled}/>
                                        <div className="email-feedback"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="tel" className="col-form-label">Phone number</label>
                                        <MaskedInput
                                            mask={['+', '3', '7', '5', '(', /[0-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-',
                                                /\d/, /\d/, '-', /\d/, /\d/]}
                                            className="form-control"
                                            placeholder="+375(__)___-__-__"
                                            guide={false}
                                            id="customer-phone"
                                            value={this.state.phone}
                                            onChange={this.changePhone}
                                            disabled={this.state.disabled}
                                        />
                                        <div className="phone-feedback"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="card">
                                <div className="card-body">
                                    <h2 className="card-title">Securize your account !</h2>
                                    <div className="form-group">
                                        <label htmlFor="password" className="col-form-label">Pasword</label>
                                        <input type="password" className="form-control" id="password"
                                               placeholder="Type your password" value={this.state.password}
                                               onChange={this.changePassword} disabled={this.state.disabled}/>
                                        <div className="password-feedback"/>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password_conf" className="col-form-label">Pasword
                                            (confirm)</label>
                                        <input type="password" className="form-control" id="password_conf"
                                               placeholder="Type your password again" value={this.state.confirmPassword}
                                               onChange={this.changePasswordConfirm} disabled={this.state.disabled}/>
                                        <div className="password_conf-feedback"/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <button type="button" className="btn btn-primary btn-lg float-right"
                                onClick={this.preRegister} disabled={this.state.disabled}>
                            Sign up !
                        </button>
                    </div>
                    <span>{this.state.message}</span>
                    {this.state.disabled ? <VerificationForm code={this.state.code} changeCode={this.changeCode}
                                                             verify={this.verify}
                                                             verificationStatus={this.state.verificationStatus} /> : ''}
                </form>
            </div>
        );
    };
}

export default SignUpService;