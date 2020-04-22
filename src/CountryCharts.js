import React from "react";
import Chart from "chart.js";
import './ChartStyle.css'

const sty={
    margin:"auto",
    height:"fit-content",
    width: "120vh",
    align: "center",
    paddingBottom:"30px",


}
export default function Test(props) {

    let cases=[];
    let dates=[];
    let daily=[]
    let dates2=[];
    console.log(props.country)
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
            console.log(data.stat_by_country[0].new_cases.replace(/,/g, ''))
            let myMap = new Map();
            let myMap2 = new Map();
            for (let i = 0; i < data.stat_by_country.length; i = i + 100) {
                const x = data.stat_by_country[i].record_date.split(" ")

                let temp =data.stat_by_country[i].new_cases.replace(/,/g, '');

                if (temp!==""){
                    myMap2.set(x[0],temp)
                    myMap.set(x[0],data.stat_by_country[i].total_cases.replace(/,/g, ''))
                }


            }
            myMap.forEach((key,index)=>{
                cases.push(key)
                dates.push(index)
                if (myMap2.has(index)){
                    daily.push(myMap2.get(index))
                    dates2.push(index)
                }
            })

            const myc = document.getElementById("myChart").getContext('2d');
            const myChart = new Chart(myc, {

                height: "50",
                type: 'line',
                width: 120,

                options:{
                    responsive: true,
                    maintainAspectRatio: true,
                },
                data: {
                    labels: dates,
                    datasets: [{
                        label: 'Case VS Dates',
                        data:cases,
                    }]
                }

            });
            const myc2 = document.getElementById("myChart2").getContext('2d');
            const myChart2= new Chart(myc2, {
                type: 'bar',
                height: 1,
                options:{
                    responsive: true,
                    maintainAspectRatio: true,
                },
                data: {
                    labels: dates2,
                    datasets: [{
                        label: 'Daily Case VS Dates',
                        data:daily,
                    }]
                }

            });


        })
        .catch(err => {console.log(err);});

    return(
        <div id='main' style={sty}>
            <canvas id="myChart2" > </canvas>
            <br/>
            <br/>
            <canvas id="myChart" > </canvas>
        </div>
    )
}
