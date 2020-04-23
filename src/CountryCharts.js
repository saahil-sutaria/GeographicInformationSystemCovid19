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
        .then(response => {
            console.log(response)
            return response.json()})
        .then(data => {
            console.log((data))
            let myMap = new Map();
            let myMap2 = new Map();
            for (let i = 0; i < data.stat_by_country.length; i = i+100) {
                const x = data.stat_by_country[i].record_date.split(" ")
                let temp =data.stat_by_country[i].new_cases.replace(/,/g, '');

                if (temp!==""){

                    if (myMap2.has(x[0])){
                        const val = myMap.get(x[0])
                        console.log(val)
                        if (Number(val)>Number(temp)){
                            if (String(val).length<=4){
                                if (Math.abs(Number(temp)-Number(val))<2000)
                                {
                                    myMap2.set(x[0],val)
                                }

                            }

                        }
                    }
                    else{
                        myMap2.set(x[0],temp)
                    }
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
                        borderColor: "#c45850",
                        data:cases.reverse(),
                    }]
                },



            });
            const myc2 = document.getElementById("myChart2").getContext('2d');
            const myChart2= new Chart(myc2, {
                type: 'bar',
                options:{
                    responsive: true,
                    maintainAspectRatio: true,

                },
                data: {
                    labels: dates2.reverse(),
                    datasets: [{
                        label: 'Daily Case VS Dates',
                        borderColor: '#c45850',
                        borderWidth: 2,
                        data:daily.reverse(),
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



        </div>
    )
}
