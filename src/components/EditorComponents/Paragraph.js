// 将editor中每一个段落定义为一个组件，方便对其修改内容/更改焦点位置
import React ,{useEffect}from 'react'

export default function Paragraph(props) {
    useEffect(() => {
        console.log(props)
    })
    let paraView
    switch (props.mdtype) {
        case 'h1':
            paraView = <h1 key={props.id} suppressContentEditableWarning='true' contentEditable='true' 
            onInput={(event)=>this.changeContent(event)} 
            onKeyDown={(event)=>this.handleKeyDown(event)}
            >{props.content}</h1>
            break
        case 'h2':
            paraView = <h2 key={props.id} suppressContentEditableWarning='true' contentEditable='true' onInput={(event)=>this.changeContent(event)} >{props.content}</h2>
            break
        case 'h3':
            paraView = <h3 key={props.id} suppressContentEditableWarning='true' contentEditable='true' onInput={(event)=>this.changeContent(event)} >{props.content}</h3>
            break
        case 'h4':
            paraView = <h4 key={props.id} suppressContentEditableWarning='true' contentEditable='true' onInput={(event)=>this.changeContent(event)} >{props.content}</h4>      
            break
        case 'p':
            paraView = <p  key={props.id} suppressContentEditableWarning='true' contentEditable='true'></p>
            break
        default:
            paraView = <p suppressContentEditableWarning='true' contentEditable='true'></p>
    }
    return (
        paraView
    )
}
