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

    let dates=[];
    let total_cases=[];
    let new_cases=[]
    let total_deaths=[];
    let new_deaths=[]
    let country_name="";
    let stats_taken_at="";

    let x = ['orange', 'red', 'black', 'gray', 'yellow', 'blue', 'green','#c45850','#344e4f']

    const rand1 = x[Math.floor(Math.random() * x.length)];
    const rand2 = x[Math.floor(Math.random() * x.length)];


    fetch(`https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=${props.country}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
            "x-rapidapi-key": "ebf8d75e2dmsh37e9046fd3028eep14281ajsn7d548a9e63d1"
        }
    })
        .then(response => {

            return response.json()})
        .then(data => {
            country_name = data.stat_by_country[0].country_name;
            console.log("Data",(data))
            let myMap = new Map();
            let myMap2 = new Map();
            let myMap3 = new Map();
            for (let i = 0; i < data.stat_by_country.length; i = i+1) {
                const x = data.stat_by_country[i].record_date.split(" ")
                let total =  data.stat_by_country[i].total_cases.replace(/,/g, '');
                let dth =data.stat_by_country[i].total_deaths.replace(/,/g, '');

                myMap.set(x[0],total)
                myMap3.set(x[0],dth)
            }
            let val=0;
            let f=0
            myMap.forEach((key,index)=>{
                dates.push(index)
                total_cases.push(key)
                if (f===0){
                    f=myMap3.get(index)
                }
                else{
                    new_deaths.push(f-myMap3.get(index))
                    f=myMap3.get(index)
                }
                total_deaths.push(myMap3.get(index))

            })
            console.log(new_deaths)

            const myc = document.getElementById("myChart").getContext('2d');
             const myChart = new Chart(myc, {
                type: 'line',
                options:{
                    responsive: true,
                    maintainAspectRatio: true,
                    events: ['mousemove'],
                },
                data: {
                    labels: dates.reverse(),
                    backgroundColor: ["#3e95cd"],
                    datasets: [{
                        label: `Case VS Dates in ${country_name}`,
                        borderColor: rand1,
                        data:total_cases.reverse(),
                    }]
                },



            });

            const myc3 = document.getElementById("myChart2").getContext('2d');
            const myChart3= new Chart(myc3, {
                type: 'bar',
                options:{
                    responsive: true,
                    maintainAspectRatio: true,

                },
                data: {
                    labels: dates,
                    datasets: [{
                        label: `Death VS Dates in ${country_name}`,
                        borderColor: rand2,
                        borderWidth: 2,
                        data:total_deaths.reverse(),
                    }]
                }

            });

            const myc4 = document.getElementById("myChart4").getContext('2d');
            const myChart4= new Chart(myc4, {
                type: 'line',
                options:{
                    responsive: true,
                    maintainAspectRatio: true,

                },
                data: {
                    labels: dates.reverse(),
                    datasets: [{
                        label: `Daily Death in ${country_name}`,
                        borderColor: rand2,
                        borderWidth: 2,
                        data:new_deaths,
                    }]
                }

            });

        })
        .catch(err => {console.log(err);});

    return(
        <div id='main'>

            <div className="card text-center">
                <div className="card-header bg-dark text-white">
                    Total Cases - linear comparision
                </div>
                <div className="card-body">
                    <h5 className="card-title"> <canvas id="myChart"> </canvas></h5>

                </div>
                <div className="card-footer text-muted">
                </div>
            </div>

            <br/>
            <br/>
            <div className="card text-center">
                <div className="card-header bg-dark text-white">
                    Total Deaths - linear comparision
                </div>
                <div className="card-body">
                    <h5 className="card-title"> <canvas width="200" height="100" id="myChart2"> </canvas></h5>

                </div>
                <div className="card-footer text-muted">
                </div>
            </div>

            <br/>
            <br/>



        </div>
    )
}

