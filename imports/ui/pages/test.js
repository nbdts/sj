<div className="page-holder">
  <form >
    <label className="note">fill all fields & click on Register button</label>

    <label className="input-holder">
      <span className="input-title">Name*</span>
      <input id='shop_name' type="text" onChange={this.handleChange}/>
    </label>

    <label className="input-holder">
      <span className="input-title">E-mail*</span>
      <input id="shop_email" type="text" onChange={this.handleChange}/>
    </label>

    <label className="input-holder">
      <span className="input-title">Phone-number*</span>
      <input id="shop_phno" type="text" onChange={this.handleChange}/>
    </label>

    <label className="input-holder">
      <span className="input-title">GSTIN*</span>
      <input id="shop_gstin" type="text" onChange={this.handleChange}/>
    </label>

    <label className="input-holder">
      <span className="input-title">Password*</span>
      <input id="shop_password" type="password" onChange={this.handleChange}/>
    </label>

    <label className="input-holder">
      <span className="input-title">Confirm Password*</span>
      <input id="" type="shop_password" onChange={this.handleChange}/>
    </label>

    <label className="note">ACCOUNT DETAILS</label>

    <label className="input-holder">
      <span className="input-title">Bank name*</span>
      <input id="shop_bankname" type="text" onChange={this.handleChange}/>
    </label>

    <label className="input-holder">
      <span className="input-title">account holder name*</span>
      <input id="shop_accname" type="text" onChange={this.handleChange}/>
    </label>

    <label className="input-holder">
      <span className="input-title">account type*</span>
      <input id="shop_acctype" type="text" onChange={this.handleChange}/>
    </label>

    <label className="input-holder">
      <span className="input-title">account number*</span>
      <input id="shop_accno" type="text" onChange={this.handleChange}/>
    </label>

    <label className="input-holder">
      <span className="input-title">account IFSC*</span>
      <input id="shop_ifsc" type="text" onChange={this.handleChange}/>
    </label>

    <input id="" type="submit" value="Register"/>
  </form>

</div>
