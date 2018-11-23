import React from 'react';
import AdditionalInput from './additional-input';

const CleaningTypesForm = (props) => {
    return (
        <React.Fragment>
            <div className="form-group row">
                <label className="col-sm-5">Base price</label>
                <input type="number" name="basePrice" className="form-control col-sm-4" placeholder="Base price"
                       onChange={props.onChangePriceHandler}
                />
            </div>
            <div className="form-group row">
                <label className="col-sm-5">Standard room cleaning coefficient</label>
                <AdditionalInput names={['standardRoomCleaning', 'standardRoomCleaningTime']}
                                 onChangePriceHandler={props.onChangePriceHandler}
                                 onChangeTimeHandler={props.onChangeTimeHandler}/> :
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Spring cleaning</label>
                <input type="checkBox" name="springCleaning"
                       onChange={props.onChangeTypeHandler} value={props.cleaningTypesDto.springCleaning}/>
                {props.cleaningTypesDto.springCleaning ?
                    <AdditionalInput names={['springCleaningPrice', 'springCleaningTime']}
                                     onChangePriceHandler={props.onChangePriceHandler}
                                     onChangeTimeHandler={props.onChangeTimeHandler}/> : ''}
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Repair and construction cleaning</label>
                <input type="checkBox" name="repairAndConstructionCleaning"
                       onChange={props.onChangeTypeHandler}
                       value={props.cleaningTypesDto.repairAndConstructionCleaning}/>

                {props.cleaningTypesDto.repairAndConstructionCleaning ?
                    <AdditionalInput
                        names={['repairAndConstructionCleaningPrice', 'repairAndConstructionCleaningTime']}
                        onChangePriceHandler={props.onChangePriceHandler}
                        onChangeTimeHandler={props.onChangeTimeHandler}/> : ''}
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Dry carpet cleaning</label>
                <input type="checkBox" name="dryCarpetCleaning"
                       onChange={props.onChangeTypeHandler} value={props.cleaningTypesDto.dryCarpetCleaning}/>
                {props.cleaningTypesDto.dryCarpetCleaning ?
                    <AdditionalInput names={['dryCarpetCleaningPrice', 'dryCarpetCleaningTime']}
                                     onChangePriceHandler={props.onChangePriceHandler}
                                     onChangeTimeHandler={props.onChangeTimeHandler}/> : ''}
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Office cleaning</label>
                <input type="checkBox" name="officeCleaning"
                       onChange={props.onChangeTypeHandler} value={props.cleaningTypesDto.officeCleaning}/>
                {props.cleaningTypesDto.officeCleaning ?
                    <AdditionalInput names={['officeCleaningPrice', 'officeCleaningTime']}
                                     onChangePriceHandler={props.onChangePriceHandler}
                                     onChangeTimeHandler={props.onChangeTimeHandler}/> : ''}
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Furniture and coatings cleaning</label>
                <input type="checkBox" name="furnitureAndCoatingsCleaning"
                       onChange={props.onChangeTypeHandler}
                       value={props.cleaningTypesDto.furnitureAndCoatingsCleaning}/>
                {props.cleaningTypesDto.furnitureAndCoatingsCleaning ?
                    <AdditionalInput
                        names={['furnitureAndCoatingsCleaningPrice', 'furnitureAndCoatingsCleaningTime']}
                        onChangePriceHandler={props.onChangePriceHandler}
                        onChangeTimeHandler={props.onChangeTimeHandler}/> : ''}
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Industrial cleaning</label>
                <input type="checkBox" name="industrialCleaning"
                       onChange={props.onChangeTypeHandler} value={props.cleaningTypesDto.industrialCleaning}/>
                {props.cleaningTypesDto.industrialCleaning ?
                    <AdditionalInput names={['industrialCleaningPrice', 'industrialCleaningTime']}
                                     onChangePriceHandler={props.onChangePriceHandler}
                                     onChangeTimeHandler={props.onChangeTimeHandler}/> : ''}
            </div>
            <div className="form-group row">
                <label className="col-sm-5">Pool cleaning</label>
                <input type="checkBox" name="poolCleaning"
                       onChange={props.onChangeTypeHandler} value={props.cleaningTypesDto.poolCleaning}/>
                {props.cleaningTypesDto.poolCleaning ?
                    <AdditionalInput names={['poolCleaningPrice', 'poolCleaningTime']}
                                     onChangePriceHandler={props.onChangePriceHandler}
                                     onChangeTimeHandler={props.onChangeTimeHandler}/> : ''}
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Small room </label>
                <AdditionalInput names={['smallRoom', 'smallRoomCleaningTime']}
                                 onChangePriceHandler={props.onChangePriceHandler}
                                 onChangeTimeHandler={props.onChangeTimeHandler}/>
            </div>
            <div className="form-group row">
                <label className="col-sm-5">Big room </label>
                <AdditionalInput names={['bigRoom', 'bigRoomCleaningTime']}
                                 onChangePriceHandler={props.onChangePriceHandler}
                                 onChangeTimeHandler={props.onChangeTimeHandler}/>
            </div>
            <div className="form-group row">
                <label className="col-sm-5">Bathroom</label>
                <AdditionalInput names={['bathroom', 'bathroomCleaningTime']}
                                 onChangePriceHandler={props.onChangePriceHandler}
                                 onChangeTimeHandler={props.onChangeTimeHandler}/>
            </div>
        </React.Fragment>
    )
};

export default CleaningTypesForm;