import React, {Component} from "react";
import Select from 'react-select';

class SortList extends Component {

    state = {
        selectedSortOption: null
    };

    sortOptions = [
        {value: 'price', label: 'Price'},
        {value: 'ranking', label: 'Ranking'},
        {value: 'remoteness', label: 'Remoteness'}
    ];

    selectSortHandler = (selectedSortOption) => {
        this.setState({selectedSortOption});
        this.props.selectHandler(selectedSortOption);
    };

    render() {

        const {selectedSortOption} = this.state;

        return (
            <Select options={this.sortOptions} onChange={this.selectSortHandler} name="sort"
                    className="search-item" isClearable={true} placeholder="Sort by"
                    value={selectedSortOption}
            />
        )
    }
}

export default SortList;