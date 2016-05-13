var React = require('react');
var ReactDOM = require('react-dom');


var products = {
  "000" : { name : "Lose it" , price : "10.00", picture : "https://i.ytimg.com/vi/0rRfwJnf8IE/hqdefault.jpg?custom=true&w=120&h=90&jpg444=true&jpgq=90&sp=68&sigh=zISVF85YcVBfg_ByW5z2IlEf-MY"},
  "123" : { name : "world" , price : "89.00",  picture : "https://i.ytimg.com/vi/0rRfwJnf8IE/hqdefault.jpg?custom=true&w=120&h=90&jpg444=true&jpgq=90&sp=68&sigh=zISVF85YcVBfg_ByW5z2IlEf-MY"},
  "456" : { name : "song" , price : "12.00",  picture : "https://i.ytimg.com/vi/0rRfwJnf8IE/hqdefault.jpg?custom=true&w=120&h=90&jpg444=true&jpgq=90&sp=68&sigh=zISVF85YcVBfg_ByW5z2IlEf-MY"}
};  


var VendingMachine = React.createClass({
  getInitialState () {
    return {
      enteredDigits : "",
      output : "Enter a code",
      credit : "0"
    };
  },
  digitsWhereEntered (d) {
    console.log('d', d);
    this.setState({
      output: this.displayprice(this.state.output+ d)
    });
   
  },
  displayprice (productCode) {
    if(isNaN(productCode)){
      return productCode[productCode.length-1];
    }
    if(productCode.length!==3){
      return productCode;
    }
    var product = this.props.products[productCode];
    if(product) {
      this.checkCredit(product.price)
      return product.name + " cost " + product.price + "  your credit is " + this.state.credit; 
    } else {
      this.setState({
        enteredDigits: ""
      });
      return "sorry that item is not in stock"+ this.state.credit;
    }
    
  },
  checkCredit (price) {
    console.log("checkedCredit")
    if(Number(this.state.credit) >= Number(price)){
      console.log('can buy')
    } else {
      console.log('not enoght')
    }
    
  },
  currencyWork (creditAdd) {
    var newCredit = Number(this.state.credit) + Number(creditAdd);
    
    console.log('got the moneys'); 
    this.setState({
      enteredDigits : this.state.enteredDigits,
      output : this.state.output,
      credit : newCredit
    })
  },
  render : function () { 
    return (
    <div className='container-fluid'> 
      <ItemContainer items = {this.props.products} />
      <Display output= {this.state.output} />
      <ButtonContainer digitsWhereEntered={this.digitsWhereEntered} />
      <CurrentyHandler currencyEntered={this.currencyWork} />
      <Player />
    </div>
    );    
  }
});

var ItemContainer = React.createClass({
  render : function () {
    var items = [];
    for (let code in this.props.items){
      items.push(<Item key={code}  song = {this.props.items[code]} />)
    }
    return (
      <div  className="row">
        {items}
      </div>
      );
  }
});

var Item = React.createClass({
  render () {
    return (
      <div className="col-xs-3 col-sm-1">
      <img src= {this.props.song.picture} />
      <div> {this.props.song.name} </div>
      <div> {this.props.song.price} </div>
      </div>
      );
  }
  
});

var Display = React.createClass({
  render () {
    console.log("display.props is ", this.props);
    return (
      <div  className="display"> {this.props.output} </div> 
      );
  }
});

var ButtonContainer = React.createClass({
  
  handleInput:  function  (value) { 
    //console.log(this.props);
    this.props.digitsWhereEntered(value);
  },
  test () {
    console.log('hello word');
  },
  render () {
  return  (
    <table>  
      <tbody>
      <tr>
        <td><Button value={1} aClick={this.handleInput} /></td>
        <td><Button value={2} aClick={this.handleInput} /></td>
        <td><Button value={3} aClick={this.handleInput} /></td>
      </tr>
      <tr>
        <td><Button value={4} aClick={this.handleInput} /></td>
        <td><Button value={5} aClick={this.handleInput} /></td>
        <td><Button value={6} aClick={this.handleInput} /></td>
      </tr>
      <tr>
        <td><Button value={7} aClick={this.handleInput} /></td>
        <td><Button value={8} aClick={this.handleInput} /></td>
        <td><Button value={9} aClick={this.handleInput} /></td>
      </tr>
      <tr>
        <td></td>
        <td><Button value={0} aClick={this.handleInput} /></td>
        <td></td>
      </tr>
      </tbody>
    </table>
  );
   
  }
});

var Button = React.createClass({
  handleUserInput:  function  (click) { 
    this.props.aClick(this.props.value);
  },
  render () {
    return (
      <div>
        <button className="btn btn-default" onClick={this.handleUserInput}>
        {this.props.value}
        </button>
         
      </div>
      );
  }
});

var CurrentyHandler = React.createClass({
  getInitialState () {
    return { money : "" };
  },
  handleInput (e) {
    e.preventDefault();
    console.log("hello text feild changed", this.state);
    this.props.currencyEntered(this.state.money);
  },
  moneyChange (e) {
    this.setState( {
      money : e.target.value
    });
  },
  render () {
    return (
      <div> 
        <form onSubmit={this.handleInput}>
          <input 
          type = 'text'
          placeholder ='enter payment' 
          onChange = {this.moneyChange} 
          value = {this.state.money}
          ></input>
          <button type = 'submit'> submit </button>
      
        </form>
      </div>
      );
  }
});

var Player = React.createClass({
  render () {
    return (
    <div> 
      <audio controls>
        <source src="/music" type="audio/mpeg"></source>
      </audio>
    </div>
    );
  }
});


ReactDOM.render(
  <VendingMachine products = {products} />,
  document.getElementById('example')
);

console.log('testing');