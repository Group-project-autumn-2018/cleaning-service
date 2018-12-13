import React, {Component} from 'react';
import Chart from '../order-schedules/Chart';
import {fetchNumberTypes} from "../api/api-actions";
import connect from "react-redux/es/connect/connect";

class TypeDiagram extends Component {


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
                labels: ['Standard room cleaning', 'Spring cleaning', 'Cleaning after repair and construction', 'Dry carpet cleaning',
                    'Office cleaning', 'Dry cleaning of furniture and coatings', 'Industrial cleaning', 'Pool cleaning'],
                datasets:[
                    {
                        label:'Orders by types cleaning',
                        data:[
                            this.props.fetchOrders( this.entityURN, this.props.token, this.props.userID,'Standard room cleaning' ),
                            5,
                            15,
                            10,
                            14,
                            32,
                            0,
                            5
                        ],
                        backgroundColor:[
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 0, 255, 0.6)',
                            'rgba(255, 0, 0, 0.6)'
                        ]
                    }
                ]
            }
        });
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

export default connect(mapStateToProps, mapDispatchToProps) (TypeDiagram);
