import React, {Component} from 'react';
import {Bar} from 'react-chartjs-2';

//chart style for languages
export default class Chart2 extends Component{
    constructor(props){
        super(props);
        this.state = {
            chartData2:props.chartData2
        }
    }
    render(){
        return(
            <div className='chart2'>
                <Bar
                data = {this.state.chartData2} 
                options = {{}}
                />
            </div>
        )
    }
}