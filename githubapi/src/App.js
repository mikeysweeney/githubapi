import React, { Component } from 'react';
import axios from "axios";
import Popup from "reactjs-popup";
import './App.css';
import UserForm from "./components/UserForm";
import styled from 'styled-components';
import Chart from './components/Charts';

class App extends Component {

  state = {
    name: null,
    id: null,
    avatar: null,
    followers: null,
    company: null,
    location: null,
    numberofrepos: null,
    chartData: []
  }
  // variable users which are the urls
  // retrieve the data from the github api 
  // extract relevant information from api - user info

  retrieveInfo = async (e) => {
    e.preventDefault();

    const user = e.target.elements.username.value
    var users = `https://api.github.com/users/${user}`;
    await axios.get(users)
      .then((res) => {
        const name = res.data.name;
        const id = res.data.id;
        const avatar = res.data.avatar_url;
        const followers = res.data.followers;
        const following = res.data.following;
        const company = res.data.company;
        const location = res.data.location;
        const numberofrepos = res.data.public_repos;
        this.setState({ name, id, avatar, followers, following, company, location, numberofrepos });
      })

      this.getChartData();
  }
  
  // chart data
  // two data points, followers and number of people they're following 

  getChartData(){
    const followerVal = this.state.followers
    const followingVal = this.state.following
    this.setState({
      chartData:{
        labels: ['Followers' , 'Following'
        ],
        datasets: [{
            label:'',
            backgroundColor: ['#000000','#808080'],
            data: [followerVal , followingVal ,  0]
        }]
    }
    })
  }

  // render user info and visualised data 
  // buttons and charts

  renderInfo() {
    return (
      <div className='renders'>
        <a href="/">New Search</a>
        <p> <UserIcon src={this.state.avatar} alt="this.name" /></p>
        <name> {this.state.name} </name>
        <p> {'Location: ' + this.state.location} </p>
        <p> {'Number of Repositories: '+ this.state.numberofrepos} </p>
        <p> {'Github ID: '+this.state.id} </p>
        <div className='chart'>
        <Popup scrolling="yes" trigger={<button className="button"> Followers vs Following </button>} modal closeOnDocumentClick>
          <div>

          <div><Chart chartData={this.state.chartData}/></div>
          </div>
        </Popup>
        </div>
  </div>
    );
  }

  // render page layout and search bar  
  // header, footer, searchbar
  
  render() {

    return (
      <div className="App">
         <header className="App-header">
            <h1 className="App-title">GitHub API Project</h1>
          </header>
        <UserForm retrieveInfo={this.retrieveInfo} />
        {this.state.name ?
          this.renderInfo()
          :
          <p id="loading-statement">Insert Github Username above</p>}
      </div>

    );
  }
}

export default App;

const UserIcon = styled('img')`
    position: 300px 500px;
    width: 500px;
    height: 500px;
    `