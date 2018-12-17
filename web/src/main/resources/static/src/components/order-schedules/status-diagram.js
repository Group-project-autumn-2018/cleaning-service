import React, {Component} from 'react';
import ChartBar from './ChartBar';
import {fetchNumber} from "../api/api-actions";
import connect from "react-redux/es/connect/connect";

class StatusDiagram extends Component {

    entityURN = '/order/getNumber';

    status = "NEW;CONFIRMED;REJECTED;COMPLETED";

    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ['New', 'Confirmed', 'Rejected', 'Completed'],
                datasets: [
                    {
                        label: 'Orders by status',
                        data: [1,1,2,2],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(255, 0, 255, 0.6)'
                        ]
                    }
                ]
            }
        }
    }

    componentDidMount() {
        fetchNumber(this.entityURN, this.props.token, this.props.userID,0,this.status).then((object) => {

                const updatedDatasets = {
                    ...this.state.chartData.datasets[0],
                    data: object
                };
                const updatedChartData = {
                    ...this.state.chartData,
                    datasets: [updatedDatasets]
                };
                console.log(updatedChartData);
                this.setState({chartData: updatedChartData});
            }
        );
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
        userID: state.user.id
    }
};

export default connect(mapStateToProps)(StatusDiagram);

