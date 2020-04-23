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
    let x = ['orange', 'red', 'black', 'gray', 'yellow', 'blue', 'green','#c45850','#344e4f']

    const rand1 = x[Math.floor(Math.random() * x.length)];
    const rand2 = x[Math.floor(Math.random() * x.length)];
    console.log(props.country)
    fetch(`https://coronavirus-monitor-v2.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=${props.country}`, {
        "method": "GET",
        "headers": {
            "x-rapidapi-host": "coronavirus-monitor-v2.p.rapidapi.com",
            "x-rapidapi-key": "ebf8d75e2dmsh37e9046fd3028eep14281ajsn7d548a9e63d1"
        }
    })
        .then(response => {
            console.log(response)
            return response.json()})
        .then(data => {
            console.log((data))
            let new_cases =[];
            let total_deaths =[];
            let total_cases =[];
            let myMap = new Map();
            let myMap2 = new Map();
            let myMap3 = new Map();
            for (let i = 0; i < data.stat_by_country.length; i = i+100) {
                const x = data.stat_by_country[i].record_date.split(" ")
                let total =  data.stat_by_country[i].total_cases.replace(/,/g, '');
                let dth =data.stat_by_country[i].total_deaths.replace(/,/g, '');
                let newc = data.stat_by_country[i].new_cases.replace(/,/g, '');
                myMap.set(x[0],total)
                myMap3.set(x[0],dth)



            }
            myMap.forEach((key,index)=>{
                dates.push(index)
                total_cases.push(key)
                new_cases.push(myMap2.get(index))
                total_deaths.push(myMap3.get(index))

            })
            console.log(myMap2);
            const myc = document.getElementById("myChart").getContext('2d');
            const myChart = new Chart(myc, {
                type: 'line',
                options:{
                    responsive: true,
                    maintainAspectRatio: true,
                },
                data: {
                    labels: dates.reverse(),
                    backgroundColor: ["#3e95cd"],
                    datasets: [{
                        label: 'Case VS Dates',
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
                    labels: dates.reverse(),
                    datasets: [{
                        label: 'Death VS Dates',
                        borderColor: rand2,
                        borderWidth: 2,
                        data:total_deaths.reverse(),
                    }]
                }

            });


        })
        .catch(err => {console.log(err);});

    return(
        <div id='main' style={sty}>
            <canvas id="myChart" > </canvas>
            <br/>
            <br/>

            <canvas id="myChart2"> </canvas>



        </div>
    )
}
