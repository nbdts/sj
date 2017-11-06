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

  handleShopLogout() {
    Session.clear();
    <Redirect to = "/login" />
}
handleAdminLogout() {
  Session.clear();
  <Redirect to = "/login" />
}

render() {
  return (
    <header style={{backgroundColor:'#ffc300'}} className="header-banner-top">
    <div style={{backgroundColor:'#ffc300'}} >
    </div>

    <div style={{paddingLeft:'20px',fontSize:20}}>
    <strong>
    {Session.get('shop')?
      <div style={{display:'flex',justifyContent:'space-between'}}>
      <div>{Session.get('shop').email}</div>
      <div> / {Session.get('shop').add}</div>
      </div>

      :
      null
    }
    </strong></div>

    <div style={{flex:5,backgroundColor:'#ffc300',height:'64px'}} className="main-navigation">

        <nav className="horizontal-nav primary-wrapper" role='navigation'>
          <ul className='list' style={{marginRight:'20px'}}>
            <li className="folder">
              <label htmlFor="folder-toggle-1" className="folder-toggle-label">
                <a className="glyphicon glyphicon-cog" style={{color:'black'}}> Settings</a>
              </label>
              <ul>
              {Session.get('admin')?
              <li>
              <a style={styles.dropDown} href='/rep'>view Report</a>
              </li>
              :
              <li>
              <a style={styles.dropDown} href={`/balsheet/${Session.get('shop')._id}`}>Balance Sheet</a>
              </li>
              }
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
                ? <a style={styles.dropDown} id="login" onClick={this.handleShopLogout.bind(this)} href="/login">Logout</a>
                : Session.get('admin')
                  ? <a style={styles.dropDown} id="login" onClick={this.handleAdminLogout.bind(this)} href="/login">Logout</a>
                  : <a style={styles.dropDown} id="login" href="/login"></a>

                }
              </li>

              </ul>
            </li>
            <li>
              </li>
          </ul>
        </nav>
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



















.header-banner-top{
    position:fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    display: flex;
    flex-flow:row;
    align-items: center;
    max-height: 65px;
  }
.primary-wrapper {
  margin: 0 auto;
  align-items: center;
}
.header-banner-top .hidden {
  display: none;
}
.header-banner-top .horizontal-nav ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
.header-banner-top .horizontal-nav li {
  display: inline-block;
}
.header-banner-top .horizontal-nav a {
  display: block;
}
.header-banner-top .horizontal-nav .folder {
  position: relative;
  cursor: pointer;
}
.header-banner-top .horizontal-nav .folder ul {
  display: block;
  position: absolute;
  top: -9999px;
  left: 0;
  z-index: 999;
}
.header-banner-top .horizontal-nav .folder li {
  display: block;
}
.header-banner-top .horizontal-nav .folder:hover ul {
  top: 100%;
}


.header-banner-top .banner .banner-image {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.header-banner-top .banner .primary-wrapper {
  position: relative;
}
@media screen and (max-width: 700px) {
  .header-banner-top .horizontal-nav {
    overflow: hidden;
    height: 0;
  }

  .header-banner-top .horizontal-nav li {
    display: block;
  }
  .header-banner-top .horizontal-nav .folder ul {
    position: static;
  }
  .header-banner-top .horizontal-nav .folder-toggle-label a:before {
    content: '+ ';
  }
  .header-banner-top .horizontal-nav .folder-toggle-box:checked ~ .folder-toggle-label a:before {
    content: '- ';
  }
  .header-banner-top .horizontal-nav .folder:hover ul,
  .header-banner-top .horizontal-nav .folder-toggle-box ~ ul {
    display: none;
  }
  .header-banner-top .horizontal-nav .folder-toggle-box:checked ~ ul {
    display: block;
  }
}
.header-banner-top {
  text-align: right;
}
.header-banner-top {
  background: #222;
}
.main-navigation{
}
.header-banner-top .horizontal-nav a {
  padding: 1.5em 1em;
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  font-size: 19px;
  letter-spacing: 0;
}
.header-banner-top .horizontal-nav a:hover,
.header-banner-top .horizontal-nav .active-link a {
  color: #fff;
  box-shadow:2px 2px 20px 4px white;
}
.header-banner-top .horizontal-nav .folder ul {
  background-color:#2d1e1b;
  font-size: 10px;
  transition: padding 0.14s ease-out;
  text-align: left;
}
.header-banner-top .horizontal-nav .folder a {
  padding: 0.5em 1em;
  white-space: nowrap;
}
.header-banner-top .horizontal-nav .folder:hover ul {
  padding: 0.5em 0;
}
.header-banner-top .banner {
  font-size: 10px;
  background-color:#ba922e;
}
.header-banner-top .banner .banner-image {
  background: url(http://farm7.staticflickr.com/6169/6161511237_c1834b35bc_b.jpg) center center;
  background-size: cover;
  opacity: 0.5;
}
.header-banner-top .banner .primary-wrapper {
  padding-top: 150px;
  padding-bottom: 150px;
}
.header-banner-top .banner .site-title {
  letter-spacing: 2px;
  font-size: 52px;
  margin: 0 0 20px;
}
.header-banner-top .banner .site-title a {
  color: #fff;
  text-decoration: none;
}
.header-banner-top .banner .site-tagline {
  color: #fff;
  letter-spacing: 1px;
  font-size: 14px;
  margin: 0 20%;
}
@media screen and (max-width: 700px) {
  .header-banner-top .horizontal-nav a {
    padding: 0.75em 1em;
  }
  .header-banner-top .horizontal-nav > ul > li:first-child a {
    padding-top: 2em;
  }
  .header-banner-top .horizontal-nav > ul > li:last-child a {
    padding-bottom: 2em;
  }
  .header-banner-top .horizontal-nav li {
    display: block;
    display: flex;
    justify-content: space-between;
  }
  .header-banner-top .horizontal-nav .folder ul {
    text-align: center;
    padding: 0.5em 0;
    margin: 0.5em 0;
    transition: none;
    background-color: #2d1e1b;
  }
  .header-banner-top .horizontal-nav .folder:hover ul {
    padding: 0.5em 0;
  }
  .header-banner-top .horizontal-nav .folder-toggle-label a {
    cursor: pointer;
  }
#login{
  background-color: #ba922e;
  color: white;
  position: relative;
  top:0;
  left: 0;
}
.banner{
  height: 10px;
  width: 100px;
}
.style{

}
