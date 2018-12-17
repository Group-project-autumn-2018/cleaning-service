import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

class ChartBar extends Component{
    constructor(props) {
        super(props);
    }
    static defaultProps = {
        displayTitle:true,
        displayLegend: true,
        legendPosition:'right',
    }


    render() {
        return (
            <div className="chart">
                <Bar
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

export default ChartBar;
