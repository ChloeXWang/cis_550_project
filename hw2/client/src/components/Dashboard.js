import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import { Table, Tag, Space } from 'antd';

const columns = [
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
    sorter: (a, b) => a.state.localeCompare(b.state),
    //TODO: insert a link and have another route to render a new page
    render: text => <a href="/recommendations">{text}</a>,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    //TODO: change date format
    //render: text => text.format("YYYY-MM-DD"),
  },
  {
    title: 'Cases',
    dataIndex: 'cases',
    key: 'cases',
    //TODO: rename column in the query in the router
    sorter: (a, b) => a.cases - b.cases,
  },
];


export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // The state maintained by this React Component.
    this.state = {
      rows: []
    }
  }

  /* ---- Q1b (Dashboard) ---- */

  componentDidMount() {
    fetch("http://localhost:8081/worstday/",
      {
        method: 'GET' // The type of HTTP request.
      }).then(res => {
        // Convert the response data to a JSON.
        return res.json();
        //console.log(res);
      }, err => {
        // Print the error if there is one.
        console.log(err);
      }).then(topList => {
        //let topListDivs = JSON.parse(JSON.stringify(topList));
        console.log(topList);
        this.setState({
          rows: topList
        });
      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
  }

  render() {
    return (
      <div className="Dashboard" >

        <PageNavbar active="dashboard" />

        <br></br>
        <div className="container movies-container">
          <div className="jumbotron">
            <div className="h5">Worst Covid Day Per State</div>
          </div>

          <br></br>
          <div className="jumbotron">
            <div className="movies-container">
              <Table columns={columns} dataSource={this.state.rows} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}