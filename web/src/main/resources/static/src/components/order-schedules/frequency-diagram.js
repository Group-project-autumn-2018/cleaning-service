import React, {Component} from 'react';
import ChartLine from '../order-schedules/ChartLine';
import {fetchNumber} from "../api/api-actions";
import connect from "react-redux/es/connect/connect";

class FrequencyDiagram extends Component {

    entityURN = '/order/getNumber';
    frequency="ONLY_ONCE;EVERY_WEEK;EVERY_TWO_WEEKS;EVERY_MONTH";


    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ['Only once', 'Every week', 'Every two weeks', 'Every month'],
                datasets: [
                    {
                        label: 'Orders by frequency',
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
        fetchNumber(this.entityURN, this.props.token, this.props.userID, 0,0,this.frequency).then((object) => {

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
            <div className="modal fade" id="confirm-modal-days" tabIndex="-1" role="dialog"
                 aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content px-5">
                        <h3 className="text-center"><b>Orders by frequency</b></h3>
                        <ChartLine chartData={this.state.chartData}  legendPosition="bottom"/>
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



export default connect(mapStateToProps)(FrequencyDiagram);
