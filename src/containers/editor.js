import React, { Component } from 'react'
import { connect } from 'react-redux'
import Paragraph from './paragraph'
import Code from './code'

import {createNewParagraphAction} from '../redux/actions/paragraph'

class Editor extends Component {

    render() {
        const views = this.props.fileContent.map((current,index)=>{
            switch(current.mdType){
                case 'code':
                    return <Code></Code>
                default:
                    return <Paragraph key={current.id} index={index}></Paragraph>
            }
        })
        return (
            <div>
                {views}
            </div>
        )
    }
    
    newLine(index){
        this.props.createNewParagraph(index)
    }
}

export default connect(
    state=>({
        fileContent:state.fileContent,
    }),
    // 将函数绑定至props上面
    {
        createNewParagraph:createNewParagraphAction
    }
)(Editor)