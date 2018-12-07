import React from 'react';
import AdditionalInput from './additional-input';

const CleaningTypesForm = (props) => {
    return (
        <React.Fragment>
            <div className="form-group row">
                <label className="col-sm-5">Base price</label>
                <input type="number" name="basePrice" className="form-control col-sm-4" placeholder="Base price, $"
                       value={props.cleaningTypes.price.basePrice} onChange={props.onChangePriceHandler}
                />
            </div>
            <div className="form-group row">
                <label className="col-sm-5">Standard room cleaning coefficient</label>
                <input type="checkBox" name="springCleaning"
                       onChange={props.onChangeTypeHandler} checked={props.cleaningTypes.standardRoomCleaning}/>
                {props.cleaningTypes.standardRoomCleaning ?
                    <AdditionalInput names={['standardRoomCleaning', 'standardRoomCleaningTime']}
                                     values={[
                                         props.cleaningTypes.price.standardRoomCleaning,
                                         props.cleaningTypes.cleaningTime.standardRoomCleaningTime
                                     ]}
                                     onChangePriceHandler={props.onChangePriceHandler}
                                     onChangeTimeHandler={props.onChangeTimeHandler}/> : ''}
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Spring cleaning</label>
                <input type="checkBox" name="springCleaning"
                       onChange={props.onChangeTypeHandler} checked={props.cleaningTypes.springCleaning}/>
                {props.cleaningTypes.springCleaning ?
                    <AdditionalInput names={['springCleaning', 'springCleaningTime']}
                                     values={[
                                         props.cleaningTypes.price.springCleaning,
                                         props.cleaningTypes.cleaningTime.springCleaningTime
                                     ]}
                                     onChangePriceHandler={props.onChangePriceHandler}
                                     onChangeTimeHandler={props.onChangeTimeHandler}/> : ''}
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Repair and construction cleaning</label>
                <input type="checkBox" name="repairAndConstructionCleaning"
                       onChange={props.onChangeTypeHandler}
                       checked={props.cleaningTypes.repairAndConstructionCleaning}/>

                {props.cleaningTypes.repairAndConstructionCleaning ?
                    <AdditionalInput
                        names={['repairAndConstructionCleaning', 'repairAndConstructionCleaningTime']}
                        values={[
                            props.cleaningTypes.price.repairAndConstructionCleaning,
                            props.cleaningTypes.cleaningTime.repairAndConstructionCleaningTime
                        ]}
                        onChangePriceHandler={props.onChangePriceHandler}
                        onChangeTimeHandler={props.onChangeTimeHandler}/> : ''}
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Dry carpet cleaning</label>
                <input type="checkBox" name="dryCarpetCleaning"
                       onChange={props.onChangeTypeHandler} checked={props.cleaningTypes.dryCarpetCleaning}/>
                {props.cleaningTypes.dryCarpetCleaning ?
                    <AdditionalInput names={['dryCarpetCleaning', 'dryCarpetCleaningTime']}
                                     values={[
                                         props.cleaningTypes.price.dryCarpetCleaning,
                                         props.cleaningTypes.cleaningTime.dryCarpetCleaningTime
                                     ]}
                                     onChangePriceHandler={props.onChangePriceHandler}
                                     onChangeTimeHandler={props.onChangeTimeHandler}/> : ''}
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Office cleaning</label>
                <input type="checkBox" name="officeCleaning"
                       onChange={props.onChangeTypeHandler} checked={props.cleaningTypes.officeCleaning}/>
                {props.cleaningTypes.officeCleaning ?
                    <AdditionalInput names={['officeCleaning', 'officeCleaningTime']}
                                     values={[
                                         props.cleaningTypes.price.officeCleaning,
                                         props.cleaningTypes.cleaningTime.officeCleaningTime
                                     ]}
                                     onChangePriceHandler={props.onChangePriceHandler}
                                     onChangeTimeHandler={props.onChangeTimeHandler}/> : ''}
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Furniture and coatings cleaning</label>
                <input type="checkBox" name="furnitureAndCoatingsCleaning"
                       onChange={props.onChangeTypeHandler}
                       checked={props.cleaningTypes.furnitureAndCoatingsCleaning}/>
                {props.cleaningTypes.furnitureAndCoatingsCleaning ?
                    <AdditionalInput
                        names={['furnitureAndCoatingsCleaning', 'furnitureAndCoatingsCleaningTime']}
                        values={[
                            props.cleaningTypes.price.furnitureAndCoatingsCleaning,
                            props.cleaningTypes.cleaningTime.furnitureAndCoatingsCleaningTime
                        ]}
                        onChangePriceHandler={props.onChangePriceHandler}
                        onChangeTimeHandler={props.onChangeTimeHandler}/> : ''}
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Industrial cleaning</label>
                <input type="checkBox" name="industrialCleaning"
                       onChange={props.onChangeTypeHandler} checked={props.cleaningTypes.industrialCleaning}/>
                {props.cleaningTypes.industrialCleaning ?
                    <AdditionalInput names={['industrialCleaning', 'industrialCleaningTime']}
                                     values={[
                                         props.cleaningTypes.price.industrialCleaning,
                                         props.cleaningTypes.cleaningTime.industrialCleaningTime
                                     ]}
                                     onChangePriceHandler={props.onChangePriceHandler}
                                     onChangeTimeHandler={props.onChangeTimeHandler}/> : ''}
            </div>
            <div className="form-group row">
                <label className="col-sm-5">Pool cleaning</label>
                <input type="checkBox" name="poolCleaning"
                       onChange={props.onChangeTypeHandler} checked={props.cleaningTypes.poolCleaning}/>
                {props.cleaningTypes.poolCleaning ?
                    <AdditionalInput names={['poolCleaning', 'poolCleaningTime']}
                                     values={[
                                         props.cleaningTypes.price.poolCleaning,
                                         props.cleaningTypes.cleaningTime.poolCleaningTime
                                     ]}
                                     onChangePriceHandler={props.onChangePriceHandler}
                                     onChangeTimeHandler={props.onChangeTimeHandler}/> : ''}
            </div>

            <div className="form-group row">
                <label className="col-sm-5">Small room </label>
                <AdditionalInput names={['smallRoom', 'smallRoomCleaningTime']}
                                 values={[
                                     props.cleaningTypes.price.smallRoom,
                                     props.cleaningTypes.cleaningTime.smallRoomCleaningTime
                                 ]}
                                 onChangePriceHandler={props.onChangePriceHandler}
                                 onChangeTimeHandler={props.onChangeTimeHandler}/>
            </div>
            <div className="form-group row">
                <label className="col-sm-5">Big room </label>
                <AdditionalInput names={['bigRoom', 'bigRoomCleaningTime']}
                                 values={[
                                     props.cleaningTypes.price.bigRoom,
                                     props.cleaningTypes.cleaningTime.bigRoomCleaningTime
                                 ]}
                                 onChangePriceHandler={props.onChangePriceHandler}
                                 onChangeTimeHandler={props.onChangeTimeHandler}/>
            </div>
            <div className="form-group row">
                <label className="col-sm-5">Bathroom</label>
                <AdditionalInput names={['bathroom', 'bathroomCleaningTime']}
                                 values={[
                                     props.cleaningTypes.price.bathroom,
                                     props.cleaningTypes.cleaningTime.bathroomCleaningTime
                                 ]}
                                 onChangePriceHandler={props.onChangePriceHandler}
                                 onChangeTimeHandler={props.onChangeTimeHandler}/>
            </div>
        </React.Fragment>
    )
};

export default CleaningTypesForm;