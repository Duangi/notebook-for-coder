import { CREATE_NEW_PARAGRAPH } from "../constant"

// 在指定位置新建一个 指定类型的段落
export const createNewParagraphAction = (index,mdType='p',content='') =>{
    return {type:CREATE_NEW_PARAGRAPH,index,mdType,content}
}