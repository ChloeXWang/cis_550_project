import React from 'react';
import '../style/Dashboard.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import PageNavbar from './PageNavbar';
import { Table, Tag, Space } from 'antd';
import moment from 'moment';

const columns = [
  {
    title: 'State',
    dataIndex: 'state',
    key: 'state',
    sorter: (a, b) => a.state.localeCompare(b.state),
    render: (text, record) => <a href={"/" + record.state} >{text}</a>,
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: text => moment(text).format("MM-DD-YYYY"),
  },
  {
    title: 'Cases',
    dataIndex: 'cases',
    key: 'cases',
    sorter: (a, b) => a.cases - b.cases,
  },
];
const countyColumns = [
  {
    title: 'County',
    dataIndex: 'county',
    key: 'county',
    sorter: (a, b) => a.state.localeCompare(b.state),
  },
  {
    title: 'Date',
    dataIndex: 'date',
    key: 'date',
    render: text => moment(text).format("MM-DD-YYYY"),
  },
  {
    title: 'Cases',
    dataIndex: 'cases',
    key: 'cases',
    sorter: (a, b) => a.cases - b.cases,
  },
  {
    title: 'Deaths',
    dataIndex: 'deaths',
    key: 'deaths',
    sorter: (a, b) => a.deaths - b.deaths,
  },
];

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    // The state maintained by this React Component.
    this.state = {
      selectedState: "",
      rows: [],
      countyRows: []
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
    if (this.props.state != null) {
      fetch("http://localhost:8081/worstday/" + this.props.state,
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
          countyRows: topList
        });
      }, err => {
        // Print the error if there is one.
        console.log(err);
      });
    }
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
        <br></br>
        <hr></hr>
        {this.props.state && <div className="jumbotron">
          <div className="h5">
            {this.props.state}
            <Table columns={countyColumns} dataSource={this.state.countyRows} />
          </div>
        </div>}
      </div>
    );
  }
}