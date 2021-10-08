import React, { Component } from 'react'
import { connect } from 'react-redux'
import {createChangeParaModeAction} from '../redux/actions/paragraph'
class Paragraph extends Component {

    render() {
        return (
            <div>
                <p id="h1" contentEditable="true">
                </p>
                <button onClick={this.changeMode}>
                    修改属性为h1
                </button>
            </div>
            
        )
    }
    changeMode = ()=>{
        document.getElementById('h1').setAttribute('type','h1');
    }
}

export default connect(
    state=>({
        type:state.type,
        data:state.data
    }),
    {
        changeMode:createChangeParaModeAction
    }
)(Paragraph)