import React ,{ forwardRef, useEffect}from 'react'
import { connect } from 'react-redux'
import { createNewParagraphAction,changeParagraphTypeAction} from '../redux/actions/paragraph'
import { changeContentAction,changeContentWithRefreshAction,deleteNodeAction} from '../redux/actions/editor'
import { KEY_ENTER ,KEY_BACKSPACE} from '../utils/constant'
import { isHeading,isHeadingType,contentToPureContent,stringToMdType} from '../utils/mdString'


const Paragraph = forwardRef((props,myRef)=> {
    let paraView
    let index = props.index
    switch (props.fileContent[props.index].mdType) {
        case 'h1':
            paraView = <h1 ref={myRef} contentEditable='true' suppressContentEditableWarning='true' onKeyDown={(e)=>{handleKeyDown(index,e)}} onInput={(e)=>{handleChangeInput(index,e)}}>
                    {props.fileContent[props.index].pureContent}
                </h1>
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
        props.createNode(index)
    },[])
    /* eslint-enable */
    return (
        paraView
    )
    function handleKeyDown(index,e){
        let selection = document.getSelection()
        switch (e.keyCode) {
            case KEY_ENTER:
                // 如果用户按下回车，阻止默认事件
                e.preventDefault()

                // 起点和终点重合的情况
                if(selection && selection.isCollapsed){
                    let {pureContent,mdType,pureContentBeforeFocus,pureContentAfterFocus} = getCurrentNodeContent()

                    if(!isHeadingType(mdType) && isHeading(pureContent)){
                        // 如果判断当前行不是heading，且内容符合heading的正则表达式，则修改类型为对应type
                        const newMdType = stringToMdType(pureContentBeforeFocus)
                        pureContentBeforeFocus = contentToPureContent(pureContentBeforeFocus,newMdType)
                        changeType(index,newMdType,pureContentBeforeFocus)
                        props.changeContentWithRefresh(index,newMdType,pureContentBeforeFocus) 
                        
                        newLine(index,'p',pureContentAfterFocus)
                    }else{
                        // 新建段落，焦点前段落保留，焦点后的段落转到新建的段落中
                        console.log(pureContentBeforeFocus)
                        props.changeContentWithRefresh(index,mdType,pureContentBeforeFocus)
                        newLine(index,'p',pureContentAfterFocus)
                    }
                }
                break
            case KEY_BACKSPACE:
                // 当焦点处于标签最左侧时，应该将当前段落内容合并至上一段,并将当前节点删除
                if(selection && selection.isCollapsed && selection.anchorOffset === 0){
                    e.preventDefault()
                    let {pureContent,mdType} = getCurrentNodeContent()
                    if(index >= 1){
                        props.changeContentWithRefresh(index-1,mdType,props.fileContent[index-1].pureContent + pureContent)
                        props.deleteNode(index)
                        // 此时焦点消失了  需要把焦点定位到上一段文字的内容和当前节点内容的交汇处(offset=上一段文字的长度)
                        props.deleteRef(index)
                    }
                    
                }
                break
            default:
                break
        }
        
    }
    function getCurrentNodeContent(index=props.index,selection=document.getSelection()) {

        const offset = selection.anchorOffset
        // 获取当前段落内容
        let {pureContent,mdType} = props.fileContent[index]
        // 获取焦点前段落内容(替换掉ascii码为160的空格)
        let pureContentBeforeFocus = pureContent.substr(0,offset).replaceAll(String.fromCharCode(160),' ')
        // 获取焦点后段落内容
        let pureContentAfterFocus = pureContent.substr(offset).replaceAll(String.fromCharCode(160),' ')
        return {
            pureContent,
            pureContentBeforeFocus,
            pureContentAfterFocus,
            mdType
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
})

export default connect(
    state=>({
        fileContent:state.fileContent,
    }),
    {
        createNewParagraph: createNewParagraphAction,
        changeContent: changeContentAction,
        changeParagraphType: changeParagraphTypeAction,
        changeContentWithRefresh: changeContentWithRefreshAction,
        deleteNode: deleteNodeAction
    },
    null,
    {forwardRef:true}
)(Paragraph)