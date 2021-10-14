import React from 'react';
import ReactMarkdown from 'react-markdown';

const input = "# This is a header\n\nAnd this is a paragraph\n"

export default class Editor extends React.Component{
    componentDidMount(){
        this.init();
    }
    render(){
        return (
            <div>
                <iframe id='editor' title="editor">
                </iframe>
                <ReactMarkdown children={input}/>
            </div>
        )
    }
    init() {
        var ifr = document.getElementById("editor");
        var doc = ifr.contentDocument || ifr.contentWindow.document; // W3C || IE
        doc.designMode = "on";
        doc.contentEditable = true;
        // alert(doc.body.innerHTML);
    }
}
// export function Editor(){
//     return(
//         <div>
//             <ReactMarkdown source={input}>
//             </ReactMarkdown>
//         </div>
//     )
// }