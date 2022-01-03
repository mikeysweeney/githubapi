import React, { Component } from 'react';
import axios from "axios";
import Popup from "reactjs-popup";
import './App.css';
import UserInput from "./components/UserInput";
import styled from 'styled-components';
import Chart from './components/Charts';
import Chart2 from './components/Charts2';
import logo from './components/giphy.gif';

class App extends Component {

  state = {
    name: null,
    id: null,
    avatar: null,
    followers: null,
    company: null,
    location: null,
    numberofrepos: null,
    link: null,
    chartData: [],
    chartData2:[],
    chartData3:[],
    repos: []
  }
  
  //retrievs data from the github api using axios and stores in constants
  retrieveInfo = async (e) => {
    e.preventDefault();

    const user = e.target.elements.username.value
    var repos = `https://api.github.com/users/${user}/repos`;
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
        const link = res.data.html_url;
        this.setState({ name, id, avatar, followers, following, company, location, numberofrepos, link });
      })
    await axios.get(repos)
      .then((res) => {
        const repos = res.data;
        const languages = res.data;
        this.setState({ repos , languages });
      })
      this.getChartData();
      this.getChartData2();
  }

  //creates a list of the languages used
  listOfLanguages(){
    const arr = [];
    {this.state.languages.map(language => (arr.push(language.language)))};
    arr.filter(function(val) { return val == null; }).join(", ")
    var langsUnique = ([...new Set(arr)]);

    return(langsUnique)
  }
  
  //compiles the amount that specific languages are used
  renderLanguages(){
    const arr = [];
    {this.state.languages.map(language => (arr.push(language.language)))};
    var langsUnique = ([...new Set(arr)]);
    var arrayLength = langsUnique.length;
    const size=[];
    {this.state.languages.map(language => (size.push(language.size)))};
    const subA = size.slice(0,arrayLength);
    return(subA)
  }


  // chart followers and number of people they're following 
  getChartData(){
    const followerVal = this.state.followers
    const followingVal = this.state.following
    this.setState({
      chartData:{
        labels: ['Followers' , 'Following'
        ],
        datasets: [{
            label:'',
            backgroundColor: ['#76e0d2','#81007f'],
            data: [followerVal , followingVal ,  0]
        }]
    }
    })
  }

  // chart language data
  getChartData2(){
    const labelLangs = this.listOfLanguages()
    const dataLangs = this.renderLanguages()
    this.setState({
      chartData2:{
        labels: labelLangs,
        datasets: [{
            label:'',
            backgroundColor: ['#76e0d2','#bde4df','#a080bd','#6f439c','#81007f', '#00ffcc', '#ffcc66','#99ff99','#9900cc','#cc66ff'],
            data: dataLangs
        }]
    }
    })
  }

  //list the repos and their links
  listOfRepos() {
    return (
      <ul>
        {this.state.repos.map(repo => (
          <li  key={repo.id}>
               <a href={repo.html_url}>{repo.name}</a>
          </li>
        ))}
      </ul>
    )
  }

  //render layout
  renderInfo() {
    return (
      <div className='renders'>
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
        <div className='chart2'>
        <Popup scrolling="yes" trigger={<button className="button2"> Languages Used </button>} modal closeOnDocumentClick>
          <div>
          <div><Chart2 chartData2={this.state.chartData2}/></div>
          </div>
        </Popup>
        </div>
        <repolist>
        <div>
          List of Repositories
          {this.state.repos ? this.listOfRepos() : null}
        </div>
        </repolist>
        <a href="/">HOME</a>
  </div>
    );
  }

  // render page layout   
  render() {

    return (
      <div className="App">
         <header className="App-header">
            <h1 className="App-title">GitHub API Project</h1>
          </header>
        <UserInput retrieveInfo={this.retrieveInfo} />
        {this.state.name ?
          this.renderInfo()
          :
          <img src={logo} alt="loading..." />
          }

      </div>
    );
  }
}
export default App;

//size and location of avatar
const UserIcon = styled('img')`
    position: 0px 0px;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    `