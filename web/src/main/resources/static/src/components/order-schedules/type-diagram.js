import React, {Component} from 'react';
import Chart from '../order-schedules/Chart';
import {fetchNumber} from "../api/api-actions";
import connect from "react-redux/es/connect/connect";

class TypeDiagram extends Component {


    entityURN = '/order/getNumber';

    componentDidMount() {
        this.props.fetchOrders( this.entityURN, this.props.token, this.props.userID);
    }


    constructor(){
        super();
        this.state = {
            chartData:{}
        }
    }


    componentWillMount(){
        this.getChartData();
    }

    getChartData(){
        // Ajax calls here
        let  cleaningTypeParam = "&cleaningTypes=Standard room cleaning;Spring cleaning;Cleaning after repair and construction;Dry carpet cleaning;" +
            "Office cleaning;Dry cleaning of furniture and coatings;Industrial cleaning;Pool cleaning";

        const userIDParam = this.props.userID ? `&userID=${this.props.userID}` : "";

        this.setState({
            chartData:{
                labels: ['New', 'Confirmed', 'Rejected'],
                datasets:[
                    {
                        label:'Orders by status',
                        data:[
                            13,
                            20,
                            15
                        ],
                        backgroundColor:[
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)'
                        ]
                    }
                ]
            }
        }
        );
    }


    render() {
        return (
            <div className="modal fade" id="confirm-modal" tabIndex="-1" role="dialog"
                 aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content px-5">
                        <h3 className="text-center"><b>Orders by types cleaning</b></h3>
                        <Chart chartData={this.state.chartData}  legendPosition="bottom"/>
                    </div>
                 </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ...state.pagination,
        orders: state.entities,
        token: state.user.token,
        userID: state.user.id,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: (page, size, entityURN, token, userID, cleaningType, status) => {
            dispatch(fetchNumber(page, size, entityURN, token, userID, cleaningType, status))
        }
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(TypeDiagram);
