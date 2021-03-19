import logo from './logo.svg';
import './App.css';
import React, {Component} from 'react';

class App extends Component{

    constructor(props) {
        super(props);
        this.state = {
            num : 0,
            current : 'none',
            mode : [
                {calc_mode : 'Add'},
                {calc_mode : 'Sub'},
                {calc_mode : 'Mul'},
                {calc_mode : 'Div'}
            ]
        }
    }

    clac_ui(){
        var calc_btns = [];
        var i = 0;
        while(i < this.state.mode.length){
            var _mode = this.state.mode[i].calc_mode;
            calc_btns.push(<input key ={i} type = 'button' value = {_mode}
                                  onClick = {this.ModeCheck}
            ></input>);
            i++;
        }
        console.log(calc_btns);
        console.log('clac_ui rendered')
        return(
            calc_btns
        )
    }

    //named - this 없음
    // anonymous - this 없음
    // arrow - this 있음
    //클래스 내부의 함수 정의시
    //따라서 bind가 필요없다
    ModeCheck = e => {
        var tmp = e.target.value;
        this.setState({
            current : tmp
        });
        console.log('ModeCheck rednered');
    }

    ClacArea(){
        return(
        <form action="/calc_process" method = 'post'
              onSubmit={function(e){
                  e.preventDefault();
                  var tmp = this.DoingClac(e.target.num1.value, e.target.num2.value);
                  console.log(tmp);
                  this.setState({
                      num : tmp
                  })
              }.bind(this)}
        >
            <input type = "number" name = 'num1'/>
            <input type = "number" name = 'num2'/>
            <input type = 'submit'/>
        </form>)
    }

    DoingClac(_num1, _num2){
        switch (this.state.current){
            case 'Add' :
                return Number(_num1) + Number(_num2);
                break;
            case 'Sub' :
                return Number(_num1) - Number(_num2);
                break;
            case 'Mul' :
                return Number(_num1) * Number(_num2);
                break;
            case 'Div' :
                return Number(_num1) / Number(_num2);
                break;
        }
    }



  render(){

    return (
        <React.Fragment>
            <h1>Claculator</h1>
            {this.clac_ui()}
            <p>Current mode is -> <b>{this.state.current}</b></p>
            {this.ClacArea()}
            <p>result : {this.state.num}</p>

        </React.Fragment>
    );
  }


}

export default App;
