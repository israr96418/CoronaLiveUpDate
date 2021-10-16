import React from 'react'
import {Line} from 'react-chartjs-2'
import './Covid19.css'

function Linegraph(props) {
    return (
        //this is the line graph
        <div className="lineGraph">
            <Line
            data=
            {{
                // labels:['janury','Febraury','March','April','May','june','july'],
                labels:props.xAxies.map(l => l.substr(0,10)),
         datasets:[{
             label:'My first data set',
            //  fill:true,
             fill:false,
             lineTension:0.1,
             backgroundColor:'rgba(75,192,192,0.4)',
             borderColor:'rgba(75,192,192,1)',
             borderDash:[],
             borderDashOffset:0.0,
             borderJoinStyle:'miter',
             pointBorderColor:'rgba(75,192,192,1)',
             pointBackgroundColor:'#fff',
             pointBorderWidth:1,
             pointHoverRadius:5,
             pointHoverBackgroundColor:'rgba(75,192,192,1)',
             pointBorderColor:'rgba(220,220,220,1)',
             pointHoverBorderWidth:2,
             pointRadius:1,
             pointHitRadius:10,
             data:props.GraphYAxies
         }]
            }}
            
            />
        </div>
    )
}

export default Linegraph
