import React, {Component} from 'react';
import ChartBar from '../order-schedules/ChartBar';
import {fetchNumberTypes} from "../api/api-actions";
import connect from "react-redux/es/connect/connect";

class StatusDiagram extends Component {


    entityURN = '/order/getNumber';

    componentDidMount() {
        this.props.fetchOrders(0, this.props.itemsCountPerPage, this.entityURN, this.props.token, this.props.userID);
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
        this.setState({
            chartData:{
                labels: ['New', 'Confirmed', 'Rejected'],
                datasets:[
                    {
                        label:'Orders by status',
                        data:[
                            this.props.fetchOrders( this.entityURN, this.props.token, this.props.userID,'NEW' ),
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
        });
    }

    render() {
        return (
            <div className="modal fade" id="confirm-modal-status" tabIndex="-1" role="dialog"
                 aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content px-5">
                        <h3 className="text-center"><b>Orders by status</b></h3>
                        <ChartBar chartData={this.state.chartData}  legendPosition="bottom"/>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.entities,
        token: state.user.token,
        userID: state.user.id,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: ( entityURN, token, userID, cleaningType) => {
            dispatch(fetchNumberTypes( entityURN, token, userID, cleaningType))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (StatusDiagram);
