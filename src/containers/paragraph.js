import React ,{createRef,useEffect}from 'react'
import { connect } from 'react-redux'
import {createNewParagraphAction,changeParagraphTypeAction} from '../redux/actions/paragraph'
import {changeContentAction,changeContentWithRefreshAction} from '../redux/actions/editor'
import { KEY_ENTER } from '../utils/constant'
import {isHeading,isHeadingType,pureContentToContent,contentToPureContent,stringToMdType} from '../utils/mdString'


function Paragraph(props) {
    let paraView
    let index = props.index
    let myRef = createRef()
    switch (props.fileContent[props.index].mdType) {
        case 'h1':
            paraView = <h1 ref={myRef} contentEditable='true' suppressContentEditableWarning='true' onKeyDown={(e)=>{handleKeyDown(index,e)}} onInput={(e)=>{handleChangeInput(index,e)}}>{props.fileContent[props.index].pureContent}</h1>
            break;
        case 'h2':
            paraView = <h2 ref={myRef} contentEditable='true' suppressContentEditableWarning='true' onKeyDown={(e)=>{handleKeyDown(index,e)}} onInput={(e)=>{handleChangeInput(index,e)}}>{props.fileContent[props.index].pureContent}</h2>
            break;
        case 'h3':
            paraView = <h3 ref={myRef} contentEditable='true' suppressContentEditableWarning='true' onKeyDown={(e)=>{handleKeyDown(index,e)}} onInput={(e)=>{handleChangeInput(index,e)}}>{props.fileContent[props.index].pureContent}</h3>
            break;
        case 'h4':
            paraView = <h4 ref={myRef} contentEditable='true' suppressContentEditableWarning='true' onKeyDown={(e)=>{handleKeyDown(index,e)}} onInput={(e)=>{handleChangeInput(index,e)}}>{props.fileContent[props.index].pureContent}</h4>
            break;
        case 'h5':
            paraView = <h5 ref={myRef} contentEditable='true' suppressContentEditableWarning='true' onKeyDown={(e)=>{handleKeyDown(index,e)}} onInput={(e)=>{handleChangeInput(index,e)}}>{props.fileContent[props.index].pureContent}</h5>
            break;
        case 'h6':
            paraView = <h6 ref={myRef} contentEditable='true' suppressContentEditableWarning='true' onKeyDown={(e)=>{handleKeyDown(index,e)}} onInput={(e)=>{handleChangeInput(index,e)}}>{props.fileContent[props.index].pureContent}</h6>
            break;
        default:
            paraView = <p ref={myRef} contentEditable='true' suppressContentEditableWarning='true' onKeyDown={(e)=>{handleKeyDown(index,e)}} onInput={(e)=>{handleChangeInput(index,e)}}>{props.fileContent[props.index].pureContent}</p>
            break;
    }
    /* eslint-disable */
    useEffect(() => {
        myRef.current.focus()
        // props.fileContent[props.index].ref = myRef.current
        console.log(typeof(myRef.current))
    },[])
    /* eslint-enable */
    return (
        paraView
    )
    function handleKeyDown(index,e){
        switch (e.keyCode) {
            case KEY_ENTER:
                // 如果用户按下回车，阻止默认事件
                e.preventDefault()
                // 获取当前段落长度，和anchorOffset/focusOffset比较
                const selection = document.getSelection()
                
                // 起点和终点重合的情况
                if(selection && selection.isCollapsed){
                    // 获取当前段落焦点的偏移量
                    const offset = selection.anchorOffset
                    console.log('offset',offset)
                    // 获取当前段落内容
                    const {pureContent,mdType} = props.fileContent[props.index]
                    console.log(mdType)
                    // 获取焦点前段落内容(替换掉ascii码为160的空格)
                    const pureContentBeforeFocus = pureContent.substr(0,offset).replaceAll(String.fromCharCode(160),' ')
                    // 获取焦点后段落内容
                    const pureContentAfterFocus = pureContent.substr(offset).replaceAll(String.fromCharCode(160),' ')
                    
                    if(!isHeadingType(mdType) && isHeading(pureContent)){
                        // 如果判断当前行不是heading，且内容符合heading的正则表达式，则修改类型为对应type
                        const newMdType = stringToMdType(pureContentBeforeFocus)
                        console.log(newMdType)
                        changeType(index,newMdType,contentToPureContent(pureContentBeforeFocus,newMdType))
                        props.changeContentWithRefresh(index,newMdType,pureContentBeforeFocus) 
                        
                        newLine(index,'p',pureContentAfterFocus)
                    }else{
                        // 新建段落，焦点前段落保留，焦点后的段落转到新建的段落中
                        props.changeContentWithRefresh(index,mdType,pureContentBeforeFocus)
                        newLine(index,'p',pureContentAfterFocus)
                    }
                    
                }
                break;
        
            default:
                break;
        }
        
    }
    function changeType(index,mdType = 'p',content = '') {
        props.changeParagraphType(index,mdType,content)
    }
    function newLine(index,mdType='p',pureContent=''){
        props.createNewParagraph(index,mdType,pureContent)
    }
    function handleChangeInput(index,e){
        e.preventDefault()
        e.persist()
        const pureContent = e.target.innerText
        const {mdType} = props.fileContent[props.index]
        props.changeContent(index,mdType,pureContent)
    }
}


export default connect(
    state=>({
        fileContent:state.fileContent,
    }),
    {
        createNewParagraph: createNewParagraphAction,
        changeContent: changeContentAction,
        changeParagraphType: changeParagraphTypeAction,
        changeContentWithRefresh: changeContentWithRefreshAction,
    }
)(Paragraph)