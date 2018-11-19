import React from 'react';
import AdditionalInput from './additional-input';

const CleaningTypesForm = (props) => {
    return (
        <React.Fragment>
            <div className="form-group row">
                <label className="col-sm-5">Standard room cleaning coefficient</label>
                <input name="standardRoomCleaning" type="text" className="form-control col-sm-4" defaultValue={1}
                       disabled={true}/>
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Spring cleaning</label>
                <input type="checkBox" name="springCleaning"
                       onChange={props.onChangeTypeHandler}/>
                {props.cleaningTypesDto.springCleaning ?
                    <AdditionalInput names={['springCleaningPrice', 'springCleaningTime']}
                                     onChangePriceHandler={props.onChangePriceHandler}
                                     onChangeTimeHandler={props.onChangeTimeHandler}/> : ''}
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Repair and construction cleaning</label>
                <input type="checkBox" name="repairAndConstructionCleaning"
                       onChange={props.onChangeTypeHandler}/>

                {props.cleaningTypesDto.repairAndConstructionCleaning ?
                    <AdditionalInput
                        names={['repairAndConstructionCleaningPrice', 'repairAndConstructionCleaningTime']}/> : ''}
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Dry carpet cleaning</label>
                <input type="checkBox" name="dryCarpetCleaning"
                       onChange={props.onChangeTypeHandler}/>
                {props.cleaningTypesDto.dryCarpetCleaning ?
                    <AdditionalInput names={['dryCarpetCleaningPrice', 'dryCarpetCleaningTime']}/> : ''}
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Office cleaning</label>
                <input type="checkBox" name="officeCleaning"
                       onChange={props.onChangeTypeHandler}/>
                {props.cleaningTypesDto.officeCleaning ?
                    <AdditionalInput names={['officeCleaningPrice', 'officeCleaningTime']}/> : ''}
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Furniture and coatings cleaning</label>
                <input type="checkBox" name="furnitureAndCoatingsCleaning"
                       onChange={props.onChangeTypeHandler}/>
                {props.cleaningTypesDto.furnitureAndCoatingsCleaning ?
                    <AdditionalInput
                        names={['furnitureAndCoatingsCleaningPrice', 'furnitureAndCoatingsCleaningTime']}/> : ''}
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Industrial cleaning</label>
                <input type="checkBox" name="industrialCleaning"
                       onChange={props.onChangeTypeHandler}/>
                {props.cleaningTypesDto.industrialCleaning ?
                    <AdditionalInput names={['industrialCleaningPrice', 'industrialCleaningTime']}/> : ''}
            </div>
            <div className="form-group row">
                <label className="col-sm-5">Pool cleaning</label>
                <input type="checkBox" name="poolCleaning"
                       onChange={props.onChangeTypeHandler}/>
                {props.cleaningTypesDto.poolCleaning ?
                    <AdditionalInput names={['poolCleaningPrice', 'poolCleaningTime']}/> : ''}
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Small room </label>
                <input type="number" name="smallRoom" className="form-control col-sm-4"/>
            </div>
            <div className="form-group row">
                <label className="col-sm-5">Big room </label>
                <input type="number" name="bigRoom" className="form-control col-sm-4"/>
            </div>
            <div className="form-group row">
                <label className="col-sm-5">Bathroom</label>
                <input type="number" name="bathroom" className="form-control col-sm-4"/>
            </div>
        </React.Fragment>
    )
};

export default CleaningTypesForm;