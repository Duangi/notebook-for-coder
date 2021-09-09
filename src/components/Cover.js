import React from 'react'
import "../css/cover.css"
import imgContent from "../imgs/33.gif"
// import { Layout,Button  } from 'antd';

const style = {
  "span":{
    "height":"60px",
    "lineHeight":"60px",
    "fontSize": "24px",
    "fontWeight":600,
    "color": "#e7864d"
  },
  "ul":{
    "display": "inline-block",
    "position":"absolute",
    "marginBottom": 0,
    "color": "#304f75",
    "height":"37px",
    "lineHeight":"37px",
    "top": "50%",
    "left":" 50%",
    "transform": "translate(-50%, -50%)"
  },
  "li":{
    "float": "left",
    "fontWeight":"700",
    "marginRight":"50px",
  },
  "fileList":{
    "lineHeight":"30px",
    "cursor": "pointer",
    "color":"#01255b"
  }
}

function Cover() {
  const liStyle = ()=>{
   const list = ["Home","About","Concact"]
   return list.map((item,index)=><li key={index} style={style.li}>{item}</li>)
  }
  const files = ()=>{
    const fileArr = ["xxxxxx","啥也不是","啥也不知道","xxxxxx","啥也不是","啥也不知道"]
    if (fileArr.length===0) {
      return <h4>你还没打开过任何文件哦</h4>
    }else{
      return fileArr.map((item,index)=><li key={index}  style={style.fileList}>{item}</li>)
    }    
  }
    return (
     <div className="cover-box">
        <div style={{"position":"relative"}}>
          <span style={style.span}>Note for Coder</span>
          <ul style={style.ul}>
            {liStyle()}
          </ul>
          <img src={imgContent} className="header-img" alt=""></img>
        </div>
        <div className="cover-content">
          <div className="content-left">
            <ul className="center-text">
              {files()}
            </ul>
            <button className="create-button">新建</button>
          </div>
          <div className="content-right">
            {/* <img src={imgContent} className="img-style"></img> */}
          </div>
        </div>
        <div>
          <h3 className="">我就是来凑个数的--《人数和技术有限团伙》</h3>
        </div>
     </div>
    )
}
export default Cover
