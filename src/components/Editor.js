import React, {useState,useEffect} from 'react';
import Vditor from 'vditor';
import "vditor/src/assets/scss/index.scss";

function Editor(){
    // eslint-disable-next-line
    const [editValue, setEditValue] = useState("");
    useEffect(() => {
        
        const vditor = new Vditor('vditor',{
            height: 800,
            mode:'wysiwyg',
            tab: '    ',
            outline:{
                enable:true,
            },
            toolbar:[
                "emoji",
                "headings",
                "bold",
                "italic",
                "strike",
                "link",
                "|",
                "list",
                "ordered-list",
                "check",
                "outdent",
                "indent",
                "|",
                "quote",
                "line",
                "code",
                "inline-code",
                "insert-before",
                "insert-after",
                "|",
                "upload",
                "table",
                "|",
                "undo",
                "redo",
                "|",
                "fullscreen",
                "edit-mode",
                {
                    name: "more",
                    toolbar:[
                        "both",
                        "code-theme",
                        "content-theme",
                        "export",
                        "outline",
                        "preview",
                        "devtools",
                        "info",
                        "help"
                    ]
                },
                "|",
            ],
            toolbarConfig:{
                pin:true,
            },
            cache:{
                enable: false,
            },
            preview:{
                hljs:{
                    lineNumber:true
                }
            },
            
            after(){
                setEditValue("Hello, Vditor + React");
                vditor.setValue('Hello, Vditor + React');
            }
        })
        // Vditor.codeRender(<button id="hhh">Click me</button>)
        // const previewElement = document.getElementById('preview')
        // const html = Vditor.md2html(`\`\`\`java
        // public class HelloWorld {

        //     public static void main(String[] args) {
        //         System.out.println("Hello World!");
        //     }

        // }
        // \`\`\``)
        // previewElement.innerHTML = html
        // Vditor.codeRender(previewElement)
    });
    // createVditor = params => {
    //     let {value} = params;
    //     value = value ? value : "";
    //     let that = this;
    //     const vditor = new Vditor ("vditor", {
    //         height : 800,
    //         mode:"ir",
    //         placeholder: "React Vditor",
    //         toolbar:[
    //             "emoji",
    //             "headings",
    //             "bold",
    //             "italic",
    //             "strike",
    //             "link",
    //             "|",
    //             "list",
    //             "ordered-list",
    //             "check",
    //             "outdent",
    //             "indent",
    //             "|",
    //             "quote",
    //             "line",
    //             "code",
    //             "inline-code",
    //             "insert-before",
    //             "insert-after",
    //             "|",
    //             "upload",
    //             "table",
    //             "|",
    //             "undo",
    //             "redo",
    //             "|",
    //             "fullscreen",
    //             "edit-mode",
    //             {
    //                 name: "more",
    //                 toolbar:[
    //                     "both",
    //                     "code-theme",
    //                     "content-theme",
    //                     "export",
    //                     "outline",
    //                     "preview",
    //                     "devtools",
    //                     "info",
    //                     "help"
    //                 ]
    //             },
    //             "|",
    //         ],
    //         after(){
    //             vditor.setValue(value);
    //         }
    //     })
    //     this.vditor = vditor;
    //     return vditor;
    // }
    return (
        <div className = "editorWrap">
            <div id = "preview"></div>
            <div id = "vditor"></div>
        </div>
    )
}
// class Editor extends React.Component {
//   componentDidMount () {
//     const vditor = new Vditor('vditor', {
//       height: 360,
//       toolbarConfig: {
//         pin: true,
//       },
//       cache: {
//         enable: false,
//       },
//       after () {
//         vditor.setValue('Hello, Vditor + React!')
//       },
//     })
//   }

//   render () {
//     <div className="editorWrap">
//         <div id="vditor"></div>
//     </div>
//   }
// }

export default Editor;