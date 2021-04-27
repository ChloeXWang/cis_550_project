import React from 'react';
import { NavLink } from 'react-router-dom';
import '../style/NavBar.css';
import { Menu } from 'antd';
// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';



export default  class PageNavbar extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			current:"",
		  };
	}


  handleClick = e => {
    console.log('click ', e);
	// alert(e.key);
    this.setState({ current: e.key });
  };

  render() {
	// const pageList = ['dashboard', 'recommendations', 'bestgenres',"query2"];
	const pageList = ['worst_day', 'underprivileged_infection', 'underpriveleged_day', 'lowest_death', 'most_educated'];

    const { current } = this.state;
    return (
		
      <Menu onClick={this.handleClick}  selectedKeys={[current]} mode="horizontal">
	
    
	  {
		   pageList.map((page, i) => {
			   return(
				<Menu.Item  key={i} >
				<NavLink activeStyle={{ color: '#007bff' }}  to={'/'+page}>
				{page.charAt(0).toUpperCase() + page.substring(1, page.length)}
				</NavLink>
				</Menu.Item>
			   )
		   })
	  }
	
      </Menu>

    );
  }
}

