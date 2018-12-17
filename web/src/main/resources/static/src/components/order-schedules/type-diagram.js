import React, {Component} from 'react';
import Chart from '../order-schedules/Chart';
import {fetchNumber} from "../api/api-actions";
import connect from "react-redux/es/connect/connect";

class TypeDiagram extends Component {

    entityURN = '/order/getNumber';
    types = "Standard room cleaning;Spring cleaning;Cleaning after repair and construction;Dry carpet cleaning;" +
        "Office cleaning;Dry cleaning of furniture and coatings;Industrial cleaning;Pool cleaning";

    constructor(props) {
        super(props);
        this.state = {
            chartData: {
                labels: ['Standard room cleaning', 'Spring cleaning', 'Cleaning after repair and construction',
                    'Dry carpet cleaning', 'Office cleaning', 'Dry cleaning of furniture and coatings',
                    'Industrial cleaning','Pool cleaning'],
                datasets: [
                    {
                        label: 'Orders by types',
                        data: [1,1,1,1,1,1,1,1],
                        backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(255, 0, 255, 0.6)',
                            'rgba(255, 255, 0, 0.6)',
                            'rgba(128, 0, 0, 0.6)',
                            'rgba(0, 128, 0, 0.6)',
                            'rgba(0, 0, 255, 0.6)'
                        ]
                    }
                ]
            }
        }
    }

    componentDidMount() {
        fetchNumber(this.entityURN, this.props.token, this.props.userID, this.types).then((object) => {

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
            <div className="modal fade" id="confirm-modal" tabIndex="-1" role="dialog"
                 aria-hidden="true">
                <div className="modal-dialog modal-lg" role="document">
                    <div className="modal-content px-5">
                        <h3 className="text-center"><b>Orders by types cleaning</b></h3>
                        <Chart chartData={this.state.chartData} legendPosition="bottom"/>
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



export default connect(mapStateToProps)(TypeDiagram);
