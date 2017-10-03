import React, {Component} from 'react';
import './Header.css';
import {Session} from 'meteor/session';
import {withRouter, Redirect,} from 'react-router-dom';
import Modal from '../modal';


class Header extends Component {
  constructor() {
    super();
    this.state={
      isModalOpen: false,
      }
          this.closeModal = this.closeModal.bind(this);
		this.openModal = this.openModal.bind(this);
  }

  closeModal() {
    this.setState({
      isModalOpen: false
    })
  }

  openModal() {
    console.log('open');
    this.setState({
      isModalOpen: true
    })
  }

  handleLogout() {
    Session.clear();
    <Redirect to = "/login" />
}

render() {
  return (
    <header style={{backgroundColor:'#ffc300'}} className="header-banner-top">
    <div style={{backgroundColor:'#ffc300'}} >
    </div>
    <div style={{flex:5,backgroundColor:'#ffc300',height:'65px'}} className="main-navigation">
        <img style={{position:'absolute',left:'40%',height:'100%',width:'200px'}} src='/sjflex.jpg' alt="flex"/>
        <nav className="horizontal-nav primary-wrapper" role='navigation'>
          <ul style={{marginRight:'20px'}}>
            <li className="folder">
              <label htmlFor="folder-toggle-1" className="folder-toggle-label">
                <a className="glyphicon glyphicon-cog"> Settings</a>
              </label>
              <ul>
              <li>
              <a style={styles.dropDown} href="#">Report</a>
              </li>
              <li>
              <button style={mainStyle.button} onClick={this.openModal} >Add Product</button>
              </li>
              <li>
                { Session.get('shop')
                ? <a style={styles.dropDown} id="login" onClick={this.handleLogout.bind(this)} href="/login">Logout</a>
                : Session.get('admin')
                  ? <a style={styles.dropDown} id="login" onClick={this.handleLogout.bind(this)} href="/login">Logout</a>
                  : <a style={styles.dropDown} id="login" href="/login"></a>

              }
              </li>

              </ul>
            </li>
            <li>
              </li>
          </ul>
        </nav>
        <label htmlFor="mobile-menu-toggle" className="mobile-menu-label hidden"></label>
      </div>
        <Modal
           isModalOpen={this.state.isModalOpen}
           closeModal={this.closeModal}
           style={modalStyle}>

           <button style={{
            ...mainStyle.button,
            margin: 0,
            width: 'auto',
            marginTop: 10
          }} onClick={this.closeModal}>Close</button>
          <h1>

       </Modal>

      </header>
  );
}
}
export default withRouter(Header)

const styles={
  dropDown:{fontSize:'15'}
}
const modalStyle = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0,0.5)'
	}
};

const mainStyle = {
	button: {
    fontWeight:600,
		backgroundColor: '#408cec',
		border: 0,
		padding: '10px 15px',
		color: '#fff',
		width: 150,
		display: 'block',
		borderRadius: 3
	}
};
