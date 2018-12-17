import React, {Component} from 'react';
import {Line} from 'react-chartjs-2';

class ChartLine extends Component{
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <div className="chart">
                <Line
                    data={this.props.chartData}
                    options={{
                        title: {
                            display: true,
                            fontSize: 25
                        },
                        legend: {
                            display: true,
                            position: this.props.legendPosition ? this.props.legendPosition : 'right'
                        }
                    }}
                />
            </div>
        )
    }
}

export default ChartLine;
