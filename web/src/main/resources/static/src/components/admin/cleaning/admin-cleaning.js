import React, {Component} from 'react';
import {connect} from 'react-redux';
import CleaningList from './cleaning-list';
import './admin-cleaning.css';
import Pagination from "react-js-pagination";
import * as actions from '../../actions/admin-actions';


class AdminCleaning extends Component {

    entityURN = '/cleaning';

    componentWillMount() {
        const {fetchData} = this.props;
        fetchData(0, this.props.itemsCountPerPage, this.entityURN, this.props.token);
    }

    handlePageChange = (page) => {
        this.props.fetchData(page - 1, this.props.itemsCountPerPage, this.entityURN, this.props.token);
    };

    render() {
        return (
            <div id="admin-cleaning">
                <h1 className="text-center">Список клининговых компаний</h1>

                <nav aria-label="Page navigation" className="mx-auto">
                    <Pagination activePage={this.props.activePage + 1}
                                itemsCountPerPage={this.props.itemsCountPerPage}
                                totalItemsCount={this.props.totalItemsCount}
                                pageRangeDisplayed={this.props.totalPages < 5 ? this.props.totalPages : 5}
                                onChange={this.handlePageChange}
                                itemClass="page-item"
                                linkClass="page-link"
                                innerClass="pagination justify-content-center"
                    />
                </nav>
                <CleaningList cleanings={this.props.cleanings}/>
            </div>)

    }
}

const mapStateToProps = (state) => {
    return {
        ...state.pagination,
        cleanings: state.entities,
        token: state.user.token
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchData: (page, size, entityURN, token) => {
            dispatch(actions.fetchEntities(page, size, entityURN, token));
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(AdminCleaning);