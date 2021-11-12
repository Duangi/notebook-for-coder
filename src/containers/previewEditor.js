
import React , {useEffect}from 'react'
import { connect } from 'react-redux'
import MarkdownCompiler from 'markdowncompiler'
import hljs from 'highlight.js';
import 'highlight.js/styles/a11y-dark.css';
import '../css/codeBlock.css'
import { bindContentToIdAction } from '../redux/actions/editor';
import { escapeHtml } from '../utils/tools';
import {  KEY_ENTER, KEY_TAB } from '../utils/constant';
import {getMarkdownOffset,focusToFenceByOffset} from '../utils/domApi'
import { runCode } from '../utils/codeRunner';

const PreviewEditor = (props)=>{
    const complier = new MarkdownCompiler()
    // 将MarkdownCompiler的实例同时绑定在window上，方便给html绑定
    window.markdownCompiler = complier
    window.preventContentEditableDefault = (index,type,e)=>{
        // if()
        e.preventDefault()
        return false
    }
    window.handleLanguageKeydown = (index,event)=>{
        const langNode = document.getElementById(`token${index}_info`).firstChild
        switch (event.key) {
            case "Backspace":
                if(langNode.innerText === ''){
                    event.preventDefault()
                }
                break
            case "Enter":
                // debugger
                event.preventDefault()
                event.target.blur()
                break
            default:
                break;
        }
    }
    window.handleCodeKeydown = (index,type,event)=>{
        let markdownOffset
        let content
        if(event.ctrlKey || event.shiftKey){
            switch (event.key) {
                case "(":
                    event.preventDefault()
                    markdownOffset = getMarkdownOffset(event.target)
                    content = complier.state.getContent(index,'content')
                    content = content.substr(0,markdownOffset) + '()' + content.substr(markdownOffset)
                    window.markdownCompiler.state.changeToken(index,'content',content)
                    complier.state.src = complier.tokens2Markdown(complier.state.tokens)
                    document.getElementById('input').value = complier.state.src
                    onMarkdown()
                    focusToFenceByOffset(index,type,markdownOffset+1)
                    return
                case "{":
                    event.preventDefault()
                    markdownOffset = getMarkdownOffset(event.target)
                    content = complier.state.getContent(index,'content')
                    content = content.substr(0,markdownOffset) + '{}' + content.substr(markdownOffset)
                    window.markdownCompiler.state.changeToken(index,'content',content)
                    complier.state.src = complier.tokens2Markdown(complier.state.tokens)
                    document.getElementById('input').value = complier.state.src
                    onMarkdown()
                    focusToFenceByOffset(index,type,markdownOffset+1)
                    return
                default:
                    return
            }
        }
        switch (event.code) {
            case "Enter":
                event.preventDefault()
                markdownOffset = getMarkdownOffset(event.target)
                content = complier.state.getContent(index,'content')
                content = content.substr(0,markdownOffset) + '\n' + content.substr(markdownOffset)
                window.markdownCompiler.state.changeToken(index,'content',content)
                complier.state.src = complier.tokens2Markdown(complier.state.tokens)
                document.getElementById('input').value = complier.state.src
                onMarkdown()
                focusToFenceByOffset(index,type,markdownOffset+1)
                return
            case "Tab":
                event.preventDefault()
                markdownOffset = getMarkdownOffset(event.target)
                content = complier.state.getContent(index,'content')
                content = content.substr(0,markdownOffset) + '    ' + content.substr(markdownOffset)
                window.markdownCompiler.state.changeToken(index,'content',content)
                complier.state.src = complier.tokens2Markdown(complier.state.tokens)
                document.getElementById('input').value = complier.state.src
                onMarkdown()
                focusToFenceByOffset(index,type,markdownOffset+4)
                return
            case "(":
                event.preventDefault()
                markdownOffset = getMarkdownOffset(event.target)
                content = complier.state.getContent(index,'content')
                content = content.substr(0,markdownOffset) + '}' + content.substr(markdownOffset)
                window.markdownCompiler.state.changeToken(index,'content',content)
                complier.state.src = complier.tokens2Markdown(complier.state.tokens)
                document.getElementById('input').value = complier.state.src
                onMarkdown()
                focusToFenceByOffset(index,type,markdownOffset+1)
                break;
            default:
                return
        }

        switch (event.keyCode) {
            case KEY_ENTER:
                event.preventDefault()
                markdownOffset = getMarkdownOffset(event.target)
                content = complier.state.getContent(index,'content')
                content = content.substr(0,markdownOffset) + '\n' + content.substr(markdownOffset)
                window.markdownCompiler.state.changeToken(index,'content',content)
                complier.state.src = complier.tokens2Markdown(complier.state.tokens)
                document.getElementById('input').value = complier.state.src
                onMarkdown()
                focusToFenceByOffset(index,type,markdownOffset+1)
                break;
            case KEY_TAB:
                event.preventDefault()
                markdownOffset = getMarkdownOffset(event.target)
                content = complier.state.getContent(index,'content')
                content = content.substr(0,markdownOffset) + '    ' + content.substr(markdownOffset)
                window.markdownCompiler.state.changeToken(index,'content',content)
                complier.state.src = complier.tokens2Markdown(complier.state.tokens)
                document.getElementById('input').value = complier.state.src
                onMarkdown()
                focusToFenceByOffset(index,type,markdownOffset+4)
                break;
            default:
                break;
        }

        
    }
    // 绑定改变token的函数
    complier.changeToken = (index,type,event)=>{
        // debugger
        
        // 记录焦点在markdownstring中的偏移量
        let markdownOffset = getMarkdownOffset(event.target)

        const content = event.target.innerText
        window.markdownCompiler.state.changeToken(index,type,content)
        complier.state.src = complier.tokens2Markdown(complier.state.tokens)
        const src = complier.state.src
        document.getElementById('input').value = src
        
        onMarkdown()
        focusToFenceByOffset(index,type,markdownOffset)
    }
    complier.changeLanguage = (index)=>{
        // debugger
        const langNode = document.getElementById(`token${index}_info`)
        let lang = ''
        if(langNode.innerText !== '\n'){
            lang = langNode.innerText
        }
        complier.state.changeToken(index,'info',lang)
        complier.state.src = complier.tokens2Markdown(complier.state.tokens)
        const src = complier.state.src
        document.getElementById('input').value = src
        onMarkdown()
    }
    complier.copy = (index,type)=>{
        // const text = complier.state.tokens[index][type]
        // document.execCommand("copy")
    }
    window.focusToNode = (index,type)=>{
        const node = document.getElementById(`token${index}_${type}`)
        if(node.innerText === '\n' || node.innerText === ''){
            node.innerText= '\n'
            const selection = window.getSelection()
            selection.collapse(node,0)
        }
    } 
    window.runCode = (index)=>{
        const str = complier.state.tokens[index].content
        const codeType = complier.state.tokens[index].info
        
        runCode(str,codeType)
    }
    complier.renderInstance.rules.fence = (tokens,index) => {
        if(hljs.getLanguage(tokens[index].info)){
            return `<div class="code-block">
                        <div class="highlight-tools" contenteditable = true onblur="window.markdownCompiler.changeLanguage(${index})" onkeydown="handleLanguageKeydown(${index},event)" onclick = "focusToNode(${index},'info')">
                            <div class="highlight-tools-left"  >
                                <div id=${"token"+index+"_info"} class="code-lang">${tokens[index].info}</div>
                            </div>
                            <div class="highlight-tools-right" contenteditable = false>
                                
                                <div class="copy-button" title="复制"></div>
                                <div class="run-button" title="运行" onclick="runCode(${index})"></div>
                                
                            </div>
                        </div>
                        <pre class="hljs"><div  class="code-content"  contenteditable = "true" oninput="window.markdownCompiler.changeToken(${index},'content',event)" onkeydown="handleCodeKeydown(${index},'content',event)" ><code id=${"token"+index+"_content"}  >${hljs.highlight(tokens[index].content,{language:tokens[index].info, ignoreIllegals:true}).value }</code></div></pre>
                    </div>`
        }
        return `<div class="code-block" >
                    <div class="highlight-tools" contenteditable = true onblur="window.markdownCompiler.changeLanguage(${index})" onkeydown="handleLanguageKeydown(${index},event)" onclick = "focusToNode(${index},'info')">
                        <div class="highlight-tools-left" >
                            <div id=${"token"+index+"_info"} class="code-lang">${tokens[index].info}</div>
                        </div>
                        <div class="highlight-tools-right" contenteditable = false>
                            <div class="copy-button" title="复制" onclick="let text = document.getElementById(${"token"+index+"_content"}).innerText;" ></div>
                            <div class="run-button" title="运行"></div>
                        </div>
                    </div>
                    <pre class="hljs"><div class="code-content" contenteditable = true oninput="window.markdownCompiler.changeToken(${index},'content',event)" onkeydown="handleCodeKeydown(${index},'content',event)"><code id=${"token"+index+"_content"}  >${escapeHtml(tokens[index].content) }</code></div></pre>
                </div>`
        
    }
    
    /* eslint-disable */
    useEffect(() => {
        // 组件开始的时候默认渲染
        onMarkdown()
        const a = document.getElementsByClassName('code-lang')
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