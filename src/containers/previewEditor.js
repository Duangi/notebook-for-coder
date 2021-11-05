
import React , {useEffect}from 'react'
import { connect } from 'react-redux'
import MarkdownCompiler from 'markdowncompiler'
import hljs from 'highlight.js';
import 'highlight.js/styles/a11y-dark.css';
import '../css/codeBlock.css'
import { bindContentToIdAction } from '../redux/actions/editor';
import { escapeHtml } from '../utils/tools';
import { KEY_BACKSPACE } from '../utils/constant';
import {getMarkdownOffset,focusToFenceByOffset} from '../utils/domApi'

const PreviewEditor = (props)=>{
    const complier = new MarkdownCompiler()
    // 将MarkdownCompiler的实例同时绑定在window上，方便给html绑定
    window.markdownCompiler = complier
    window.preventContentEditableDefault = (index,type,e)=>{
        // if()
        e.preventDefault()
        return false
    }
    // 绑定改变token的函数
    complier.changeToken = (index,type,event)=>{
        console.log(event)
        // debugger
        // 记录焦点所在的锚点的父节点
        const anchorParentNode = event.target
        // 获取代码块内容改变之后的锚点
        const anchorNode = window.getSelection().anchorNode
        // 获取该锚点的偏移量
        const anchorOffset = window.getSelection().anchorOffset
        
        // 记录焦点在markdownstring中的偏移量
        let markdownOffset = getMarkdownOffset(anchorNode,anchorOffset,anchorParentNode)
        
        console.log('markdownOffset',markdownOffset)
        const content = event.target.innerText
        window.markdownCompiler.state.changeTokenByProxy(index,type,content)
        const str = window.markdownCompiler.parserInstance.tokens2Markdown(window.markdownCompiler.state.tokens)
        document.getElementById('input').value = str
        // onMarkdown()
        // focusToFenceByOffset(index,markdownOffset)
        
        
    }
    complier.copy = (index,type)=>{
        // const text = complier.state.tokens[index][type]
        // document.execCommand("copy")
    }
    complier.backspaceHandler = (index,event)=>{
        // 当该token content为空时，将默认事件
        console.log(222)
        if(event.keyCode === KEY_BACKSPACE){
            console.log('111')
            if(complier.state.tokens[index].content === ''){
                event.preventDefault()
            }
        }
    }
    // console.log(md.parser('# 123\n'))
    complier.renderInstance.rules.fence = (tokens,index) => {
        if(hljs.getLanguage(tokens[index].info)){
            console.log(window.markdownCompiler)
            return `<div class="code-block">
                        <div class="highlight-tools" contenteditable = true oninput="window.markdownCompiler.changeToken(${index},'info',event)">
                            <div class="highlight-tools-left" >
                                <div id=${"token"+index+"_info"} class="code-lang" >${tokens[index].info}</div>
                            </div>
                            <div class="highlight-tools-right" contenteditable = false>
                                
                                <div class="copy-button" title="复制"></div>
                                <div class="run-button" title="运行"></div>
                                
                            </div>
                        </div>
                        <pre class="hljs"><div  class="code-content" contenteditable = "true" oninput="window.markdownCompiler.changeToken(${index},'content',event)" onkeydown="" ><code id=${"token"+index+"_content"}  >${hljs.highlight(escapeHtml(tokens[index].content),{language:tokens[index].info, ignoreIllegals:true}).value }</code></div></pre>
                    </div>`
        }
        return `<div class="code-block" >
                    <div class="highlight-tools" contenteditable = true oninput="window.markdownCompiler.changeToken(${index},'info',event.target)">
                        <div class="highlight-tools-left" >
                            <div id=${"token"+index+"_info"} class="code-lang"  >${tokens[index].info}</div>
                        </div>
                        <div class="highlight-tools-right" contenteditable = false>
                            <div class="copy-button" title="复制" onclick="let text = document.getElementById(${"token"+index+"_content"}).innerText;" ></div>
                            <div class="run-button" title="运行"></div>
                        </div>
                    </div>
                    <pre class="hljs"><div class="code-content" contenteditable = true oninput="window.markdownCompiler.changeToken(${index},'content',event.target)"><code id=${"token"+index+"_content"}  >${escapeHtml(tokens[index].content) }</code></div></pre>
                </div>`
        
    }
    /* eslint-disable */
    useEffect(() => {
        // 组件开始的时候默认渲染
        onMarkdown()
        // setInterval(()=>console.log(window.getSelection()),1000)
        const a = document.getElementsByClassName('code-lang')
        console.log(a)
        // changeFocus(a)
    }, [])
    /* eslint-enable */
    return (
        <>
        <div className='preview-editor'>
            <textarea  className="markdownInput" id="input" style={{display:"none"}} rows="50" cols="60" onInput={onMarkdown}></textarea>
            <div cid = "123" id="editor"></div>
        </div>
        </>
    )
    function onMarkdown() {
        const value = document.getElementById('input').value
        const parseResult = complier.parser(value)
        const result = complier.render(parseResult)
        document.getElementById('editor').innerHTML = result
    }
}

export default connect(
    state=>({
        fileContent: state.fileContent,
        compiler: state.compiler
    }),
    // 将函数绑定至props上面
    {
        bindContentToId: bindContentToIdAction
    }
)(PreviewEditor)