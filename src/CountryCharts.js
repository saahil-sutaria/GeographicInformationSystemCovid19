import React from "react";
import Chart from "chart.js";
import './ChartStyle.css'

const sty={
    position: "relative",
    height:"30vh",
    width: "60vw",
    align: "center",

}
export default function Test(props) {
    let cases=[];
    let dates=[];
    fetch(`https://coronavirus-monitor-v2.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=${props.country}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor-v2.p.rapidapi.com",
            "x-rapidapi-key": "ebf8d75e2dmsh37e9046fd3028eep14281ajsn7d548a9e63d1"
        }
    })
        .then(response => {return (response.json());})
        .then(data => {
            console.log(data)
            let myMap = new Map();
            for (let i = 0; i < data.stat_by_country.length; i = i + 100) {

                const x = data.stat_by_country[i].record_date.split(" ")
                myMap.set(x[0],data.stat_by_country[i].total_cases.replace(/,/g, ''))

            }
            myMap.forEach((key,index)=>{
                console.log(key+" "+index)
                cases.push(key)
                dates.push(index)

            })
            //console.log((myMap))
            const myc = document.getElementById("myChart").getContext('2d');
            const myChart = new Chart(myc, {
                type: 'line',
                options:{
                    responsive: true,
                    maintainAspectRatio: false,

                },
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'Cases Over Dates',
                        data:cases,
                    }]
                }

            });


        })
        .catch(err => {
            console.log(err);
        });
    return(
        <div id='main' style={sty}>
            <canvas id="myChart" > </canvas>

        </div>
    )
}
