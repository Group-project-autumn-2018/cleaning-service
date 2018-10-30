const fetchCustomers = (page) =>
{
    fetch(`/customer?page=${pageNumber}&size=${this.state.itemsCountPerPage}`).then(resolve => resolve.json()).then(response => {

        this.setState({
            customers: response.content,
            totalItemsCount: response.totalElements,
            activePage: response.number,
            totalPages: response.totalPages
        });
    });
};

const fetchCustomersStart = () => {
    return {
        type: 'FETCH_CUSTOMERS_START'
    };
};

const fetchCustomersSuccess = (content, pagination) => {
    return {
        type: 'FETCH_CUSTOMERS_SUCCESS',
        payload: {
            content,
            pagination
        }

    };
};



export default {
    setSearchText,
    toggleShowCompleted,
    addTodo,
    toggleTodo
};