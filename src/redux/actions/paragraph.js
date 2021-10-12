import { CREATE_NEW_PARAGRAPH,CHANGE_PARAGRAPH_TYPE } from "../constant"

// 在指定位置新建一个 指定类型的段落
export const createNewParagraphAction = (index,mdType='p',pureContent='') =>{
    return {type:CREATE_NEW_PARAGRAPH,index,mdType,pureContent}
}

export const changeParagraphTypeAction = (index,mdType='p',pureContent='') =>{
    return {type:CHANGE_PARAGRAPH_TYPE,index,mdType,pureContent}
}