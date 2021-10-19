import axios from "axios";
import {FILE_EXTENSION_MAP} from './constant'
/**
 * 上传文件
 * Request URL
 * http://49.232.203.150:8080/upload
 */
function uploadFile(file){
    axios.post('http://49.232.203.150:8080/upload',
        {file}
    ).then(value=>{
        console.log(value)
    })
}

export function runCode(str,codeType){
    const file = strToFile(str,codeType)
    if(file !== -1){
        uploadFile(file)
    }
    else {
        console.log('当前代码类型无法解析')
    }
}
function strToFile(str,codeType){
    if(FILE_EXTENSION_MAP.hasOwnProperty(codeType)){
        // 文件后缀名
        const fileExtention = FILE_EXTENSION_MAP[codeType]
        // const blob = new Blob()
        const fileName = 'test.' + fileExtention
        const file = new File([JSON.stringify(str)],fileName)
        return file
    }
    else {
        return -1
    }
}