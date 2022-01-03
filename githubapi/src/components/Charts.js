import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

//chart style for followers and following
export default class Chart extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData:props.chartData
        }
    }
    render(){
        return(
            <div className='chart'>
                <Bar
                data = {this.state.chartData} 
                options = {{}}
                />
            </div>
        )
    }
}