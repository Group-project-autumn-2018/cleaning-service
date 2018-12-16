import React, {Component} from 'react';
import ChartLine from '../order-schedules/ChartLine';

class FrequencyDiagram extends Component {

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
                labels: ['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
                datasets:[
                    {
                        label:'Population',
                        data:[
                            617594,
                            181045,
                            153060,
                            106519,
                            105162,
                            95072
                        ],
                        backgroundColor:[
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)'
                        ]
                    }
                ]
            }
        });
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



export default FrequencyDiagram;
