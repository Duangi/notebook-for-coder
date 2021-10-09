import { nanoid } from "nanoid"
import {CHANGE_PARA_CONTENT,
    CHANGE_CODE_TYPE,UPLOAD_CODE_FILE,EXECUTE_CODE_FILE,
    CREATE_NEW_PARAGRAPH} from '../constant'

// 文章内容默认值
const initState = {
    fileContent:[
        {
            'id':nanoid(10),
            'mdtype':'h1',
            'content':'这是一段示例1'
        },
        {
            'id':nanoid(10),
            'mdtype':'h2',
            'content':'这是一段示例2'
        },
        {
            'id':nanoid(10),
            'mdtype':'h3',
            'content':'这是一段示例3'
        }
    ]
}
export default function paragraphReducer(preState=initState,action){
    const {type} = action
    const preStateStr = JSON.stringify(preState)
    let preStateObj = JSON.parse(preStateStr)
    
    switch (type) {
        // 更改对应index的段落内容，输入index + content
        case CHANGE_PARA_CONTENT:
            preState.fileContent[action.index].content = action.content
            break
        case CHANGE_CODE_TYPE:

            break
        case UPLOAD_CODE_FILE:

            break
        case EXECUTE_CODE_FILE:

            break
        // 在index处新建一个段落
        case CREATE_NEW_PARAGRAPH:
            console.log(preState)
            
            preStateObj.fileContent.splice(action.index+1, 0, {
                'id':nanoid(10),
                'mdtype':action.mdType,
                'content':action.content
            })
            break
        default:
            break
    }
    return preStateObj
}