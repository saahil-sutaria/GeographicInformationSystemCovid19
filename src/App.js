import React,{useState, Component} from 'react';
import './App.css';
import Total from './total';
import Country from  './country'


import './country'

class App extends Component {

    constructor(props) {
        super(props);

    }

    render(){
        return(
                <div className="App" >
                    <br />

                    <h1 id="displayleft" className="text-danger bg-white card-header ">Global COVID-19 Statistics</h1>
                    <br/>
                    <br/>
                    <Total />
                    <Country/>
                </div>


        );

    }

}

export default App;
