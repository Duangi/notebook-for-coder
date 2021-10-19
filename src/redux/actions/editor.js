import { CHANGE_PARA_CONTENT,CHANGE_PARA_CONTENT_WITH_REFRESH,DELETE_NODE,BIND_CONTENT_TO_ID} from '../constant'

// 传入修改的内容的index，在state中修改对应的值，不刷新页面
export const changeContentAction = (index,mdType='p',pureContent='') =>{
    return {type:CHANGE_PARA_CONTENT,index,mdType,pureContent}
}

// 传入修改的内容的index，在state中修改对应的值，刷新页面
export const changeContentWithRefreshAction = (index,mdType='p',pureContent='') =>{
    return {type:CHANGE_PARA_CONTENT_WITH_REFRESH,index,mdType,pureContent}
}

// 删除index节点
export const deleteNodeAction = (index)=>{
    return {type:DELETE_NODE,index}
}

// 绑定id与内容
export const bindContentToIdAction = (content,id,isProto = true) => {
    return {type:BIND_CONTENT_TO_ID, content,id,isProto}
}