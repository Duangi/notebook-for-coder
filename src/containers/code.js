import React from 'react'
import { connect } from 'react-redux'
import {changeCodeTypeAction, uploadCodeFileAction, executeCodeFileAction} from '../redux/actions/code'

function Code(props) {
    let paraView
    paraView = <div contentEditable='true' 
    suppressContentEditableWarning='true'
    
    ></div>
    return (
        paraView
    )
    
}


export default connect(
    state=>({
        fileContent:state.fileContent,
    }),
    {
        changeCodeType:changeCodeTypeAction,
        uploadCodeFile:uploadCodeFileAction,
        executeCodeFile:executeCodeFileAction
    }
)(Code)