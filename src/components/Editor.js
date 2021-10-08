import React, { Component } from 'react'
import {nanoid} from 'nanoid'

export default class Editor extends Component {
    state = {
        fileContent:[
            {
                id:nanoid(10), 
                type:'h1',
                content:'这是一段示例'
            },
            {
                id:nanoid(10), 
                type:'h2',
                content:'这是一段示例2'
            },
            {
                id:nanoid(10), 
                type:'h3',
                content:'这是一段示例3'
            },
            {
                id:nanoid(10), 
                type:'button',
                content:'btntest'
            }
        ]
    }
    render() {
        const views = this.state.fileContent.map((current,index)=>{
            switch (current.type) {
                case 'h1':
                    return <h1 key={current.id} suppressContentEditableWarning='true' contentEditable='true' outline='none' onInput={(event)=>this.changeContent(index,event)} >{current.content}</h1>
                case 'h2':
                    return <h2 key={current.id} suppressContentEditableWarning='true' contentEditable='true' onInput={(e)=>this.changeContent(index)} >{current.content}</h2>
                case 'h3':
                    return <h3 key={current.id} suppressContentEditableWarning='true' contentEditable='true' onInput={(e)=>this.changeContent(index)} >{current.content}</h3>
                case 'h4':
                    return <h4 key={current.id} suppressContentEditableWarning='true' contentEditable='true' onInput={(e)=>this.changeContent(index)} >{current.content}</h4>  
                case 'button':
                    return <button key={current.id} suppressContentEditableWarning='true' contentEditable='true' onInput={(e)=>this.changeContent(index)}>{current.content}</button>      
                default:
                    return <p key={nanoid(10)} suppressContentEditableWarning='true' contentEditable='true'></p>
            }
        })
        return (
            <div>
                {views}
            </div>
        )
    }
    changeContent(index,event){
        event.persist()
        const content = event.target.innerHTML
        this.setState((state)=>{
            state.fileContent[index].content = content
            console.log(state)
            return state
        })
    }
}
