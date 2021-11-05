// 输入锚点，偏移量，锚点属于的父节点
// 输出焦点在原字符串中的偏移量
export function getMarkdownOffset(anchorNode,anchorOffset,target) {
    let markdownOffset = 0
    let anchorNodesList = target.childNodes
    // debugger
    
    for(let i = 0,ok=false;i<anchorNodesList.length;i++){
        if(ok)break// 如果已经找到焦点位置，直接跳出循环
        let anchorNodes
        if(anchorNodesList[i].nodeName === 'DIV'){
            anchorNodes = anchorNodesList[i].firstChild
        }
        else{
            anchorNodes = anchorNodesList[i]
        }
        for(let j = 0;j<anchorNodes.childNodes.length;j++){
            
            if((anchorNode === anchorNodes && anchorNode.innerText === '\n') || anchorNode === anchorNodes.firstChild){
                markdownOffset = markdownOffset + anchorOffset + 1
                console.log('焦点在string中的偏移量为： ',markdownOffset)
                ok = true   // 已经找到焦点位置
                break
            }
            let textNode = anchorNodes.childNodes[j]
            // 处理<div></div>
            if(anchorNode === textNode && anchorNode.data === '\n'){
                markdownOffset += 1
                console.log('焦点在string中的偏移量为： ',markdownOffset)
                ok = true   // 已经找到焦点位置
                break
            }
            // 当dom元素存在innerText属性时，为span元素。而anchorNode一般都是text，所以应该获取span的子元素与anchorNode做比较
            if(textNode.innerText === ''){
                continue
            }
            if(textNode.innerText){
                textNode = textNode.firstChild
            }
            // 判断是否为同一个anchorNode
            if(anchorNode === textNode){
                markdownOffset += anchorOffset
                console.log('焦点在string中的偏移量为： ',markdownOffset)
                ok = true   // 已经找到焦点位置
                break
            }else{
                markdownOffset += textNode.length
                console.log(markdownOffset)
            }
        }
        
    }
    return markdownOffset
}

export function focusToFenceByOffset(index,markdownOffset) {
    let focusInfo = {anchorNode:null,anchorOffset:0}
    console.log(document.getElementById(`token${index}_${'content'}`))
    const codeNodes = document.getElementById(`token${index}_${'content'}`).childNodes
    // debugger
    for(let i = 0,currentOffset = 0;i<codeNodes.length;i++){
        let textNode = codeNodes[i]
        if(textNode.innerText === ''){
            continue
        }
        // 每次遍历一个节点，累加至offset中
        if(textNode.innerText){
            textNode = textNode.firstChild
        }
        if(currentOffset + textNode.length >= markdownOffset){
            focusInfo.anchorNode = textNode
            focusInfo.anchorOffset = markdownOffset - currentOffset
            changeFocus(focusInfo)
            break
        }else{
            currentOffset += textNode.length
        }
    }
}

export function changeFocus(focusInfo){
    const selection = document.getSelection()
    selection.collapse(focusInfo.anchorNode,focusInfo.anchorOffset)
}