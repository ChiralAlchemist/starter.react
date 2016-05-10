var React = require('react');
var ReactDOM = require('react-dom');


var products = [
  { code :"000", name : "hello" },
  { code :"123", name : "world" }
  
  ];


var VendingMachine = React.createClass({
  getInitialState () {
    return {
      enteredDigits : "",
      output : "Enter a code"
    };
  },
  digitsWhereEntered (d) {
    console.log('d', d);
    this.setState({
      enteredDigits: this.state.enteredDigits + d,
      output: this.state.enteredDigits
    });
    if(this.state.enteredDigits.length===3){
      this.displayprice(this.state.enteredDigits);
    }
  },
  displayprice () {
    this.setState({
      enteredDigits: "",
      output : "you want that?"
    });
  },
  render : function () { 
    return (
    <div> 
      <ItemContainer/>
      <Display enteredDigits= {this.state.output} />
      <ButtonContainer digitsWhereEntered={this.digitsWhereEntered} />
      <CurrentyHandler/>
    </div>
    );    
  }
});

var ItemContainer = React.createClass({
  render : function () {
    return (
      <div>
        Item Container
      </div>
      );
  }
});

var Display = React.createClass({
  render () {
    console.log("display.props is ");
    return (
      <div> {this.props.enteredDigits} </div> 
      );
  }
});

var ButtonContainer = React.createClass({
  getInitialState () {
    return  {
      enteredDigits : "9001"
    };
  },
  handleInput:  function  (value) { 
    console.log(this.props);
    this.props.digitsWhereEntered(value);
  },
  test () {
    console.log('hello word');
  },
  render () {
  return  (
    <table>  
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
        <td><Button value={0} /></td>
        <td></td>
      </tr>
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
        <div onClick={this.handleUserInput}>
        {this.props.value}
        </div>
         
      </div>
      );
  }
});

var CurrentyHandler = React.createClass({
  render () {
    return (
      <div> CurrentyHandler </div>
      );
  }
});



ReactDOM.render(
  <VendingMachine products = {products} />,
  document.getElementById('example')
);

console.log('testing');