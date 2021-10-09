import React, { Component } from 'react'
import {nanoid} from 'nanoid'
import Paragraph from './EditorComponents/Paragraph'

export default class Editor extends Component {
    state = {
        fileContent:[
            {
                id:nanoid(10), 
                mdtype:'h1',
                content:'这是一段示例'
            },
            {
                id:nanoid(10), 
                mdtype:'h2',
                content:'这是一段示例2'
            },
            {
                id:nanoid(10), 
                mdtype:'h3',
                content:'这是一段示例3'
            }
        ]
    }
    render() {
        const views = this.state.fileContent.map((current,index)=>{
            return <Paragraph key={current.id} mdtype={current.mdtype} content={current.content}></Paragraph>
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
    newLine(index){
        this.setState(state=>{
            // 深拷贝一份 state,修改完成之后再返回
            // 如果直接修改state并返回，setState会执行两次(why?)
            const temp = JSON.stringify(state)
            const res = JSON.parse(temp)
            res.fileContent.splice(index+1,0,{
                id:nanoid(10), 
                type:'p',
                content:''
            })
            return res
        })
    }
    handleKeyDown(index,event){
        // 阻止回车默认事件
        event.preventDefault()
        console.log('keyDown')
        if(event.keyCode === 13){
            // 新起一行 可编辑的p标签
            this.newLine(index)
        }
        
        
    }
}
