import React, {Component} from 'react';
import Chart from '../order-schedules/Chart';
import {fetchNumber} from "../api/api-actions";
import connect from "react-redux/es/connect/connect";

class TypeDiagram extends Component {


    entityURN = '/order/getNumber';


    constructor(props){
        super(props);
        this.state = {
            chartData:{
                labels: ['Standard room cleaning', 'Spring cleaning', 'Cleaning after repair and construction', 'Dry carpet cleaning',
                    'Office cleaning', 'Dry cleaning of furniture and coatings', 'Industrial cleaning', 'Pool cleaning'],
                datasets:[
                    {
                        label:'Orders by types cleaning',
                        data: this.state.dataArr,
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
            },
            dataArr: []
        }
    }

    componentWillMount(){
        this.getChartData();
    }

    getChartData(){
        // Ajax calls here
        fetch().then(response.json()).then(
            data => {
                this.setState({dataArr: data});
                console.log(data)
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

        token: state.user.token,
        userID: state.user.id,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchOrders: ( entityURN, token, userID, cleaningType) => {
            dispatch(fetchNumber( entityURN, token, userID, cleaningType))
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps) (TypeDiagram);
