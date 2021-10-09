import React from 'react'
import { connect } from 'react-redux'
import {changeCodeTypeAction, uploadCodeFileAction, executeCodeFileAction} from '../redux/actions/code'

function Code(props) {
    let paraView
    switch (props.fileContent[props.index].mdtype) {
        default:
            paraView = <p contentEditable='true' suppressContentEditableWarning='true'></p>
            break;
    }
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