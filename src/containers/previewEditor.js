
import React  from 'react'
import { connect } from 'react-redux'
import MarkdownIt from 'markdown-it'
// import { nanoid } from 'nanoid'
import hljs from 'highlight.js'
import 'highlight.js/styles/a11y-dark.css';
import '../css/codeBlock.css'
import { nanoid } from 'nanoid';
import { bindContentToIdAction } from '../redux/actions/editor';
import { runCode } from '../utils/codeRunner';
// import { PYTHON } from '../utils/constant';

const PreviewEditor = (props)=>{
    window.getContentValue = function (e) {
        const id = e.target.getAttribute('contentId')
        console.log(window.contentMap[id])
        runCode(window.contentMap[id],'python')
    }
    const md = new MarkdownIt({
        highlight:function (str,lang) {
            console.log(str)
            const contentId = nanoid(10)
            props.bindContentToId(str,contentId)
            console.log(window)
            if(lang && hljs.getLanguage(lang)){
                try{
                    return `<div class="code-block"><div class="highlight-tools"><div class="code-lang">`+lang+`</div><button contentId=${contentId} class="copy-button" onclick="getContentValue(event)">copy</button><i class="expand"></i></div><pre class="hljs"><div class="code-content"><code>`+hljs.highlight(str,{language:lang,ignoreIllegals:true}).value +`</code></div></pre></div>`
                }catch(__){

                }
            }
            // ！！！XSS漏洞：如果没有识别出当前代码类型，需要调用escapeHtml，将字符串中的 < > 等字符，转成实体名称 &lt; &gt; ……
            // 如果不转化，浏览器会直接将这段字符串转成可以渲染的html标签。用户输入的html代码就可以直接渲染，产生漏洞
            return '<div class="code-block"><div class="highlight-tools"><div class="code-lang">'+lang+'</div><button class="copy-button" onclick="copyButtonClicked">复制</button><i class="expand"></i></div><pre class="hljs"><div class="code-content"><code>'+md.utils.escapeHtml(str)+'</code></div></pre></div>'
        }
    });
    
    
    return (
        <>
            <textarea className="markdownInput" id="input" rows="10" cols="150" onInput={onMarkdown}></textarea>
            <div id="output"></div>
        </>
    )
    function onMarkdown() {
        const value = document.getElementById('input').value
        const result = md.render(value)
        // console.log(result)
        document.getElementById('output').innerHTML = result
    }
}

export default connect(
    state=>({
        fileContent:state.fileContent,
    }),
    // 将函数绑定至props上面
    {
        bindContentToId: bindContentToIdAction
    }
)(PreviewEditor)