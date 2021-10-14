// import React, { Component } from 'react'
import React, { createRef, useEffect } from 'react'
import { connect } from 'react-redux'
import Paragraph from './paragraph'
import Code from './code'

import {createNewParagraphAction} from '../redux/actions/paragraph'


const Editor = (props)=>{
    const getRef=(ref)=> {
        refs.push(ref)
    }
    let refs = []
    const editorRef = createRef()
    /* eslint-disable */
    useEffect(()=>{
        console.log(refs)
    },[refs])
    useEffect(()=>{
        const selection = window.getSelection()
        console.log(1112)

        console.log(editorRef.current)
        // selection.extend(editorRef.current,0)
        const range = new Range()
        range.setStartBefore(refs[0])
        range.setEndAfter(refs[refs.length-1])
        selection.empty()
        selection.addRange(range)
        console.log(selection)
        console.log(document.activeElement)
    },[])
    /* eslint-enable */
    const views = props.fileContent.map((current,index)=>{
        switch(current.mdType){
            case 'code':
                return <Code></Code>
            default:
                return <Paragraph key={current.id} index={index} ref= {getRef} createNode={createNode} deleteRef={deleteRef}></Paragraph>
        }
    })
    // 创建新节点，新节点需要获取焦点
    function createNode(index){
        // changeFocus(index)
    }
    function changeFocus(index){
        // const focusNode = refs[index]
        const selection = window.getSelection()
        // let range = new Range()
        // range.setStartBefore(focusNode)
        // range.setEndAfter(focusNode)
        // selection.empty()
        // selection.addRange(range)
        // console.log(selection)
        // console.log(editorRef.current)
        console.log(111)
        selection.collapse(editorRef.current,4)
        // selection.extend(focusNode,2)
    }
    function deleteRef(index){
        refs.splice(index,1)
        changeFocus(index-1)
        console.log(refs)
    }
    

    return (
        <div ref = {editorRef}>
            {views}
        </div>
    )
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