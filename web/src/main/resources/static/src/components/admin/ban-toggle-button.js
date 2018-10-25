import React, {Component} from 'react';

export default class BanToggleButton extends Component{
    constructor(props){
        super(props);
        this.state = {
            isBanned: props.isBanned

        };
    }

    handleClick = () =>{
        console.log(this.state.isBanned);
      this.props.onClick();
      this.setState({
          isBanned: !this.state.isBanned
      })
    };

    render(){
        return(
            <div>
                <button onClick={this.handleClick} className={this.state.isBanned ? "btn btn-danger" : "btn btn-success"}>
                    {this.state.isBanned ? "Разблокировать" : "Заблокировать"}</button>
            </div>
        )
    }

}
