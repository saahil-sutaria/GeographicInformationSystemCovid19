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
                    <h1 id="displayleft">Corona Case Tracker</h1>
                    <br />
                    <h1 id="displayleft" >Global Cases</h1>
                    <Total />
                    <Country/>
                </div>

        );

    }

}

export default App;
