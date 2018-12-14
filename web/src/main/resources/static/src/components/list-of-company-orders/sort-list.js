import React, {Component} from 'react';
import Select from 'react-select';
import './list-of-company-orders.css';

class SortFilter extends Component {


    state = {
        selectedSortOption: null,
        selectedTypeOption: null,
        selectedStatusOption: null
    };


    typeOptions = [
        {value: 'Standard room cleaning', label: 'Standard room cleaning'},
        {value: 'Spring cleaning', label: 'Spring cleaning'},
        {value: 'Cleaning after repair and construction', label: 'Cleaning after repair and construction'},
        {value: 'Dry carpet cleaning', label: 'Dry carpet cleaning'},
        {value: 'Office cleaning', label: 'Office cleaning'},
        {value: 'Dry cleaning of furniture and coatings', label: 'Dry cleaning of furniture and coatings'},
        {value: 'Industrial cleaning', label: 'Industrial cleaning'},
        {value: 'Pool cleaning', label: 'Pool cleaning'}
    ];

    statusOptions= [
        {value: 'NEW', label: 'New'},
        {value: 'CONFIRMED', label: 'Confirmed'},
        {value: 'REJECTED', label: 'Rejected'},
        {value: 'COMPLETED', label: 'Completed'}
    ];

    sortOptions = [
        {value: '&sort=estimatedTime,desc', label: 'Time'},
        {value: '&sort=cleaningDay,desc', label: 'Date'}
    ];


    selectTypeHandler = (selectedTypeOption) => {
        this.setState({selectedTypeOption});
        this.props.onChange(selectedTypeOption);

    };

    selectStatusHandler = (selectedStatusOption) => {
        this.setState({selectedStatusOption});
        this.props.onChange(selectedStatusOption);
    };



    render() {

        const { selectedTypeOption, selectedStatusOption} = this.state;

        return (
            <div className="d-flex justify-content-around">


                <Select options={this.typeOptions} onChange={this.selectTypeHandler} name="cleaningType"
                        placeholder="Choose type" className="search-item" value={selectedTypeOption}/>

                <Select options={this.statusOptions} onChange={this.selectStatusHandler} name="cleaningStatus"
                        placeholder="Choose status" className="search-item" value={selectedStatusOption}/>

                <button className="btn btn-secondary btnProposals" onClick={this.props.onClick}>Search</button>

                <button className="btn btn-secondary "  onClick={this.props.showAll}>All</button>

                <button type="button" data-toggle="modal" data-target="#confirm-modal"
                        className="btn btn-secondary btn btn-success"
                        onClick={this.onClick}>
                    Chart by types
                </button>

                <button type="button" data-toggle="modal" data-target="#confirm-modal-status"
                        className="btn btn-secondary btn btn-success"
                        onClick={this.onClick}>
                    Chart by status
                </button>

                <button type="button" data-toggle="modal" data-target="#confirm-modal-days"
                        className="btn btn-secondary btn btn-success"
                        onClick={this.onClick}>
                    Chart by days
                </button>

            </div>
        )

    }


}

export default SortFilter;