import React, {Component} from 'react';
import Select from 'react-select';

class CompanySearchBar extends Component {


    state = {
        selectedTypeOption: null
    };


    typeOptions = [
        {value: 'standardRoomCleaning', label: 'Standard room cleaning'},
        {value: 'springCleaning', label: 'Spring cleaning'},
        {value: 'repairAndConstructionCleaning', label: 'Cleaning after repair and construction'},
        {value: 'dryCarpetCleaning', label: 'Dry carpet cleaning'},
        {value: 'officeCleaning', label: 'Office cleaning'},
        {value: 'furnitureAndCoatingsCleaning', label: 'Dry cleaning of furniture and coatings'},
        {value: 'industrialCleaning', label: 'Industrial cleaning'},
        {value: 'poolCleaning', label: 'Pool cleaning'}
    ];


    selectTypeHandler = (selectedTypeOption) => {
        this.setState({selectedTypeOption});
        this.props.onChange(selectedTypeOption);
    };


    render() {

        const {selectedTypeOption} = this.state;

        return (
            <div className="d-flex justify-content-around">

                <input type="text" placeholder="Company name" onChange={this.props.onChange}
                       className="search-item" name="company"/>
                <Select options={this.typeOptions} onChange={this.selectTypeHandler} name="cleaningType"
                        placeholder="Choose type" className="search-item" value={selectedTypeOption}/>

                <button className="btn btn-primary search-item" onClick={this.props.onClick}>Search</button>

                <button className="btn btn-secondary" onClick={this.props.showAll}>Clear</button>

            </div>
        )

    }


}

export default CompanySearchBar;
