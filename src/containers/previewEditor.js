
import React  from 'react'
import { connect } from 'react-redux'
import md from 'markdown-it'


const PreviewEditor = (props)=>{
    console.log(md)
    return (
        <div>123
        </div>
    )
}


export default connect(
    state=>({
        fileContent:state.fileContent,
    }),
    // 将函数绑定至props上面
    {
    }
)(PreviewEditor)