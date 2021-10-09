import React ,{createRef}from 'react'
import { connect } from 'react-redux'
import {createNewParagraphAction} from '../redux/actions/paragraph'

function Paragraph(props) {
    let paraView
    let index = props.index
    let myRef = createRef()
    switch (props.fileContent[props.index].mdtype) {
        case 'h1':
            paraView = <h1 ref={myRef} contentEditable='true' suppressContentEditableWarning='true' onKeyDown={(e)=>{handleKeyDown(index,e)}}>{props.fileContent[props.index].content}</h1>
            break;
        case 'h2':
            paraView = <h2 ref={myRef} contentEditable='true' suppressContentEditableWarning='true' >{props.fileContent[props.index].content}</h2>
            break;
        case 'h3':
            paraView = <h3 ref={myRef} contentEditable='true' suppressContentEditableWarning='true' >{props.fileContent[props.index].content}</h3>
            break;
        case 'h4':
            paraView = <h4 ref={myRef} contentEditable='true' suppressContentEditableWarning='true' >{props.fileContent[props.index].content}</h4>
            break;
        case 'h5':
            paraView = <h5 ref={myRef} contentEditable='true' suppressContentEditableWarning='true' >{props.fileContent[props.index].content}</h5>
            break;
        case 'h6':
            paraView = <h6 ref={myRef} contentEditable='true' suppressContentEditableWarning='true' >{props.fileContent[props.index].content}</h6>
            break;
        default:
            paraView = <p ref={myRef} contentEditable='true' suppressContentEditableWarning='true'></p>
            break;
    }
    return (
        paraView
    )
    function handleKeyDown(index,e){
        console.log(myRef)
        // 如果用户按下回车，阻止默认事件
        if(e.keyCode === 13){
            e.preventDefault()
            newLine(index)
        }
    }
    function newLine(index,mdType='p',content=''){
        console.log(123)
        props.createNewParagraph(index,mdType,content)
    }
}


export default connect(
    state=>({
        fileContent:state.fileContent,
    }),
    {
        createNewParagraph:createNewParagraphAction
    }
)(Paragraph)