import React, {Component} from 'react';
import ChartBar from '../order-schedules/ChartBar';

class StatusDiagram extends Component {

    entityURN = '/order/getNumber';

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


export default StatusDiagram;
