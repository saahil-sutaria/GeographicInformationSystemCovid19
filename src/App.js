import React,{useState, Component} from 'react';
import './App.css';
import Total from './total';
import Country from  './country'
import {useSpring, animated} from 'react-spring'


import './country'
import ParticlesBg from "particles-bg";

class App extends Component {

    constructor(props) {
        super(props);

    }


    render(){
        let config ={
            life: [1.5, 30],
        }

        return(
                <div className="App" >
                    <div className="bubbles">
                    <ParticlesBg  num={15}  type="cobweb" bg={true} />
                    </div>
                    <br />
                    <h1 id="displayleft" className="text-danger bg-red card-header ">Global COVID-19 Statistics</h1>
                    <br/>
                    <br/>
                    <Total />
                    <Country/>

                </div>


        );

    }

}

export default App;
