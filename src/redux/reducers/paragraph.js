import {CHANGE_PARA_MODE} from '../constant'
const initState = {contentType:'default'}
export default function paragraphReducer(preState=initState,action){
    // 获取action中，获取需要改变的新的type值，以及附加数据，如当前段落改为h2，则需要传入{type:'title',data:'2'}
    const {type, data} = action
    
    switch (type){
        case CHANGE_PARA_MODE:
            return {type, data}
        default:
            return preState
    }
}