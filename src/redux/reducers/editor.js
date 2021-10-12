import { nanoid } from "nanoid"
import {CHANGE_PARA_CONTENT,CHANGE_PARA_CONTENT_WITH_REFRESH,
    CHANGE_CODE_TYPE,UPLOAD_CODE_FILE,EXECUTE_CODE_FILE,
    CREATE_NEW_PARAGRAPH, CHANGE_PARAGRAPH_TYPE} from '../constant'
import {pureContentToContent} from '../../utils/mdString'

// 文章内容默认值
const initState = {
    fileContent:[
        {
            id: nanoid(10),
            mdType: 'h1',
            content: '# 这是一段示例1',
            pureContent: '这是一段示例1'
        },
        {
            id: nanoid(10),
            mdType: 'h2',
            content: '## 这是一段示例2',
            pureContent: '这是一段示例2'
        },
        {
            id: nanoid(10),
            mdType: 'h3',
            content: '### 这是一段示例3',
            pureContent: '这是一段示例3'
        },
        {
            id: nanoid(10),
            mdType: 'p',
            content: '这是一段示例4',
            pureContent: '这是一段示例4'
        },
    ]
}
export default function paragraphReducer(preState=initState,action){
    const {type} = action
    const preStateStr = JSON.stringify(preState)
    let preStateObj = JSON.parse(preStateStr)
    
    switch (type) {
        // 更改对应index的段落内容，输入index + content
        case CHANGE_PARA_CONTENT:
            preState.fileContent[action.index].pureContent = action.pureContent
            preState.fileContent[action.index].content = pureContentToContent(action.pureContent,action.mdType)
            return preState

        case CHANGE_PARA_CONTENT_WITH_REFRESH:
            preStateObj.fileContent[action.index].pureContent = action.pureContent
            preStateObj.fileContent[action.index].content = pureContentToContent(action.pureContent,action.mdType)
            break
        case CHANGE_CODE_TYPE:

            break
        case UPLOAD_CODE_FILE:

            break
        case EXECUTE_CODE_FILE:

            break
        // 在index处新建一个段落
        case CREATE_NEW_PARAGRAPH:
            preStateObj.fileContent.splice(action.index+1, 0, {
                id: nanoid(10),
                mdType:action.mdType,
                content: action.pureContent,
                pureContent: pureContentToContent(action.pureContent)
            })
            console.log(preStateObj.fileContent)
            break
        case CHANGE_PARAGRAPH_TYPE:
            preStateObj.fileContent[action.index].mdType = action.mdType

            break
        default:
            break
    }
    return preStateObj
}