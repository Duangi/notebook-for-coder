import {CHANGE_PARA_CONTENT} from '../constant'

// 传入修改的内容的index，在state中修改对应的值
export const changeContentAction = (index,content) =>{
    return {actionType:CHANGE_PARA_CONTENT,index,content}
}