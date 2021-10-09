import {CHANGE_CODE_TYPE,UPLOAD_CODE_FILE,EXECUTE_CODE_FILE} from '../constant'

// 更改代码种类
export const changeCodeTypeAction = (index,codeType) =>{
    return {type:CHANGE_CODE_TYPE,index,codeType}
}

/**以对应代码的文件格式 保存至服务器，返回文件名字
 * 输入：代码块内容content（String），代码类型codeType（String）
 * 输出：保存至服务器的文件名
 */
export const uploadCodeFileAction = (content,codeType) =>{
    return {type:UPLOAD_CODE_FILE,content,codeType}
}

/**运行服务器端保存好的文件
 * input：uploadCodeFile之后返回的文件名
 * output：文件编译运行之后返回的结果
 */
export const executeCodeFileAction = (fileName) =>{
    return {type:EXECUTE_CODE_FILE,fileName}
}