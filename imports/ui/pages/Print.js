import React, { Component } from 'react';
export default class Print  extends Component {
  constructor() {
    super();
  }
  render(){
    {
      let today=new Date()
      date = today.getDate()+ '/' + (today.getMonth() + 1) + '/' +today.getFullYear()

    }
    return(
       <div >
       <div id='header' style={{padding:10}}>
       <u>
       <h1 style={{textAlign:'center'}}>Sandwich Junction</h1>
       </u>
       <span style={{textAlign:'left'}} >{date}</span><br/>
       <span>Name:{}</span><br/>
       <span>Phone No:{}</span>
       </div>
       <hr/>
        <div id='table' style={{padding:10}}>
               <table style={{display:'flex',flex:1,flexFlow:'column'}}>
               <thead >
                 <tr style={{display:'flex',flex:1,flexFlow:'row'}}>
                 <th style={{flex:1}}> item</th>
                 <th style={{flex:1}}> price</th>
                 <th style={{flex:1}}> qty</th>
                 <th style={{flex:1}}> amount</th>
                 </tr>
               </thead>

               <tbody >
                <tr style={{display:'flex',flex:1,flexFlow:'row'}}>
                <td style={{flex:1}}>lichi</td>
                <td style={{flex:1}}>99</td>
                <td style={{flex:1}}>1</td>
                <td style={{flex:1}}>99</td>
                </tr>
               </tbody>
               <br/>

               <tbody >
                <tr style={{display:'flex',flex:1,flexFlow:'row'}}>
                <td style={{flex:1}}></td>
                <td style={{flex:1}}></td>
                <td style={{flex:1,textAlign:'center'}}>Total:</td>
                <td style={{flex:1}}>99</td>
                </tr>
               </tbody>

               </table>
        </div>
        <hr/>

       </div>
    );
  }
}
