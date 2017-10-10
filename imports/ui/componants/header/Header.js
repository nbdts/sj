import React, {Component} from 'react';
import './Header.css';
import {Session} from 'meteor/session';
import {withRouter, Redirect,} from 'react-router-dom';
import Modal from '../modal';
import ExpenseForm from '../ExpenseForm';
import BalanceForm from '../BalanceForm';


class Header extends Component {
  constructor() {
    super();
    this.state={
      isModalOpen: false,
      modalform: true,
          }
          this.closeModal = this.closeModal.bind(this);
		      this.openModal = this.openModal.bind(this);
  }
  y

  closeModal() {
    this.setState({
      isModalOpen: false
    })
  }
  handlebalacne(){
    this.setState({
      modalform:false,
      isModalOpen: true
    })
  }

  openModal() {
    this.setState({
      modalform:true,
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
    <div style={{flex:5,backgroundColor:'#ffc300',height:'64px'}} className="main-navigation">
        <img style={{position:'absolute',left:'40%',height:'100%',width:'200px'}} src='/sjflex.jpg' alt="flex"/>
        <nav className="horizontal-nav primary-wrapper" role='navigation'>
          <ul className='list' style={{marginRight:'20px'}}>
            <li className="folder">
              <label htmlFor="folder-toggle-1" className="folder-toggle-label">
                <a className="glyphicon glyphicon-cog"> Settings</a>
              </label>
              <ul>

              <li>
              <a style={styles.dropDown} href="/rep">view Report</a>
              </li>

              {
              Session.get('shop')?
              <div>
              <li>
                <a style={styles.dropDown}  onClick={this.openModal} >add Expense</a>
              </li>
              <li>
              <a id="login" style={styles.dropDown}  onClick={this.handlebalacne.bind(this)} >add Balance</a>
              </li>
              </div>
              :
              null
              }



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
         <span style={{fontSize:30,textAlign:'right',color:'red'}} className='glyphicon glyphicon-remove-sign' onClick={this.closeModal}/>
         {
           this.state.modalform ?
            <ExpenseForm/>
              :
            <BalanceForm/>
         }

       </Modal>

      </header>
  );
}
}
export default withRouter(Header)

const styles={
  dropDown:{fontSize:'15px'}
}
const modalStyle = {
	overlay: {
		backgroundColor: 'rgba(0, 0, 0,0.5)'
	}
};
