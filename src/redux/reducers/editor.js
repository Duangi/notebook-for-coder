import { nanoid } from "nanoid"
// 文章内容默认值为空
const initState = {fileContent:[{'id':nanoid(10),'type':'h1','content':'这是一段示例'}]}
export default function paragraphReducer(preState=initState,action){
    return preState
}