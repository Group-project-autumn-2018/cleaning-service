import React, {Component} from 'react';
import {Pie} from 'react-chartjs-2';

class Chart extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="chart">
                <Pie
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

export default Chart;
