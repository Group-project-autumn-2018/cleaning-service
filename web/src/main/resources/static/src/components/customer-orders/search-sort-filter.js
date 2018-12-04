import React, {Component} from 'react';
import Select from 'react-select';

class SearchSortFilter extends Component {


    state = {
        selectedSortOption: null,
        selectedTypeOption: null
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

    sortOptions = [
        {value: '&sort=price,desc', label: 'Price'},
        {value: '&sort=estimatedTime,desc', label: 'Time'},
        {value: '&sort=cleaningDay,desc', label: 'Date'}
    ];


    selectTypeHandler = (selectedTypeOption) => {
        this.setState({selectedTypeOption});
        this.props.onChange(selectedTypeOption);
    };

    selectSortHandler = (selectedSortOption) => {
        this.setState({selectedSortOption});
        this.props.onSort(selectedSortOption);
    };

    render() {

        const {selectedSortOption, selectedTypeOption} = this.state;

        return (
            <div className="d-flex justify-content-around">


                <Select options={this.typeOptions} onChange={this.selectTypeHandler} name="cleaningType"
                        placeholder="Choose type" className="search-item" value={selectedTypeOption}/>

                <input type="text" placeholder="Address" onChange={this.props.onChange}
                       className="search-item" name="address"/>
                <input type="text" placeholder="Cleaning Company" onChange={this.props.onChange}
                       className="search-item" name="company"/>

                <button className="btn btn-primary search-item" onClick={this.props.onClick}>Search</button>

                <button className="btn btn-secondary " onClick={this.props.showAll}>Clear</button>

                <Select options={this.sortOptions} onChange={this.selectSortHandler} name="sort"
                        className="search-item" isClearable={true} placeholder="Sort by"
                        value={selectedSortOption}
                />
            </div>
        )

    }


}

export default SearchSortFilter;