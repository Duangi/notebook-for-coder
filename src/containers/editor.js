import React, { Component } from 'react'
import { connect } from 'react-redux'

// import {createChangeParaModeAction} from '../redux/actions/paragraph'

class Editor extends Component {

    render() {
        const views = this.props.fileContent.map((current,index)=>{
            let res
            switch (current.type){
                case 'h1':
                    res = <h1 key={current.id} suppressContentEditableWarning='true' contentEditable='true' onChange={}>{current.content}</h1>
                    break
                default:
                    res = <p suppressContentEditableWarning='true' contentEditable='true'></p>
                    break
            }
            return res
        })
        return (
            <div>
                {views}
            </div>
            
        )
    }
    
}

export default connect(
    state=>({
        fileContent:state.fileContent,
    }),
    {
        // changeMode:createChangeParaModeAction
    }
)(Editor)