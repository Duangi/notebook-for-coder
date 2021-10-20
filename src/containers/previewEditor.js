
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
            const contentId = nanoid(10)
            props.bindContentToId(str,contentId)
            if(lang && hljs.getLanguage(lang)){
                try{
                    return hljs.highlight(str,{language:lang,ignoreIllegals:true}).value
                }catch(__){}
            }
            return ''
        }
    });
    window.markdownit = md
    // 传入tokens的index,类型,
    // window.refresh = function (index,type,event) {
    //     console.log(index)
        
    //     console.log(event)
    //     if(type === 'info'){
    //         window.tokens[index][type] = event.target.innerHTML
    //         const map = window.tokens[index].map
    //         const line_begin = map[0]
    //         const line_end = map[1]
    //         console.log(window.originContent)
    //     }
        
    //     console.log(window.tokens[index][type])
    //     console.log(window)
    //     // const result = window.md.renderer.render(window.tokens)
    //     // document.getElementById('output').innerHTML = result
    // }
    md.renderer.rules.fence = function (tokens, idx, options, env, slf) {
        var token = tokens[idx],
        info = token.info ? md.utils.unescapeAll(token.info).trim() : '',
        langName = '',
        langAttrs = '',
        highlighted, i, arr, tmpAttrs, tmpToken;

        if (info) {
            arr = info.split(/(\s+)/g);
            langName = arr[0];
            langAttrs = arr.slice(2).join('');
        }

        if (options.highlight) {
            highlighted = options.highlight(token.content, langName, langAttrs) || md.utils.escapeHtml(token.content);
        } else {
            highlighted = md.utils.escapeHtml(token.content);
        }

        if (highlighted.indexOf('<pre') === 0) {
            return highlighted + '\n';
        }

        // 代码块语言类型存在的情况,即在```后写了代码类型 比如 ```python\nprint(123)\n```
        // If language exists, inject class gently, without modifying original token.
        // May be, one day we will add .deepClone() for token and simplify this part, but
        // now we prefer to keep things local.
        if (info) {
            i        = token.attrIndex('class');
            tmpAttrs = token.attrs ? token.attrs.slice() : [];

            if (i < 0) {
                tmpAttrs.push([ 'class', options.langPrefix + langName ]);
            } else {
                tmpAttrs[i] = tmpAttrs[i].slice();
                tmpAttrs[i][1] += ' ' + options.langPrefix + langName;
            }

            // Fake token just to render attributes
            tmpToken = {
                attrs: tmpAttrs
            };

            // 代码块自定义部分
            return `<div class="code-block"><div class="highlight-tools"><div class="highlight-tools-left"><div class="code-lang">` + langName+
            `</div></div><div class="highlight-tools-right"><button class="copy-button">copy</button><button class="expand">expand</button></div></div><pre class="hljs"><div class="code-content"><code` +slf.renderAttrs(tmpToken) +'>'+ highlighted +`</code></div></pre></div>\n`
        }

        // 用户没有输入代码块类型的情况
        return  `<div class="code-block"><div class="highlight-tools"><div class="highlight-tools-left"><div class="code-lang">` + 
        langName+`</div></div><div class="highlight-tools-right"><button class="copy-button">copy</button><i class="expand"></i></div></div><pre class="hljs"><div class="code-content"><code>` + highlighted +`</code></div></pre></div>\n`
    }
    
    return (
        <div className='preview-editor'>
            <textarea className="markdownInput" id="input" rows="50" cols="60" onInput={onMarkdown}></textarea>
            <div id="output"></div>
        </div>
    )
    function onMarkdown() {
        console.log(11111)
        const value = document.getElementById('input').value
        const parseResult = md.parse(value)
        window.tokens = parseResult
        console.log(window.tokens)
        const result = md.render(value)
        // const result = md.renderer.render(parseResult,md.options)
        
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