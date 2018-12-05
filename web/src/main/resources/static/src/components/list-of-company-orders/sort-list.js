import React, {Component} from 'react';
import Select from 'react-select';

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
        {value: 'new ', label: 'new'},
        {value: 'confirmed', label: 'confirmed'},
        {value: 'canceled', label: 'canceled'}
    ];

    sortOptions = [
        {value: '&sort=estimatedTime,desc', label: 'Time'},
        {value: '&sort=cleaningDay,desc', label: 'Date'}
    ];


    selectTypeHandler = (selectedTypeOption) => {
        this.setState({selectedTypeOption});

    };

    selectStatusHandler = (selectedStatusOption) => {
        this.setState({selectedStatusOption});

    };

    selectSortHandler = (selectedSortOption) => {
        this.setState({selectedSortOption});
        this.props.onSort(selectedSortOption);
    };

    render() {

        const {selectedSortOption, selectedTypeOption, selectedStatusOption} = this.state;

        return (
            <div className="d-flex justify-content-around">


                <Select options={this.typeOptions} onChange={this.selectTypeHandler} name="cleaningType"
                        placeholder="Choose type" className="search-item" value={selectedTypeOption}/>

                <Select options={this.statusOptions} onChange={this.selectStatusHandler} name="cleaningStatus"
                        placeholder="Choose status" className="search-item" value={selectedStatusOption}/>

                <button className="btn btn-secondary" onClick={this.props.onClick}>Search</button>

                <button className="btn btn-secondary " onClick={this.props.showAll}>All</button>

                <Select options={this.sortOptions} onChange={this.selectSortHandler} name="sort"
                        className="search-item" isClearable={true} placeholder="Sort by"
                        value={selectedSortOption}
                />
            </div>
        )

    }


}

export default SortFilter;