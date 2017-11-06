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
home(){
  location.reload();
}

render() {
  return (
      <div>
      <div className="header">

          <div className="headeritem one" onClick={this.home.bind(this)}>Sandwich Junction</div>
          <div className="headeritem three">
          {Session.get('admin')?
          <div style={{display:'flex'}}>
            <a className="mynavitmes" style={styles.dropDown} href="/admin/today" >Today</a>
            <a className="mynavitmes" style={styles.dropDown} href="/admin/allinvoice" >All</a>
            <a className="mynavitmes" style={styles.dropDown} href="/admin/registeration" >Shop</a>
          </div>
          :null
          }
          {
          Session.get('shop')?
          <div style={{display:'flex'}}>
          <a className="mynavitmes" style={styles.dropDown} href={`/balsheet/${Session.get('shop')._id}`} >BalanceSheet</a>
            <a className="mynavitmes" style={styles.dropDown}  onClick={this.openModal} >Expense</a>
            <a className="mynavitmes" id="login" style={styles.dropDown}  onClick={this.handlebalacne.bind(this)} >Balance</a>
            <a className="mynavitmes" style={styles.dropDown} href={`/products`}>Products</a>

          </div>
          :
          null
          }
          { Session.get('shop')
          ? <a className="mynavitmes" style={styles.dropDown} id="login" onClick={this.handleShopLogout.bind(this)} href="/login">Logout</a>
          : Session.get('admin')
            ? <a className="mynavitmes" style={styles.dropDown} id="login" onClick={this.handleAdminLogout.bind(this)} href="/login">Logout</a>
            : <a className="mynavitmes" style={styles.dropDown} id="login" href="/login"></a>

          }
          </div>
      </div>
      <Modal
         isModalOpen={this.state.isModalOpen}
         closeModal={this.closeModal}
         style={modalStyle}>
         <span style={{fontSize:30,textAlign:'right',color:'red'}} className='glyphicon glyphicon-remove-sign' onClick={this.closeModal}/>
         {
           this.state.modalform  ?
            <ExpenseForm/>
              :
            <BalanceForm/>
         }

       </Modal>

      </div>
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
