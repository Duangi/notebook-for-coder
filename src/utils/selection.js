/**
 * 解决焦点问题！
 * 当输入框内容变更，根据当前selection以及输入框内容的前后比对，确定最后焦点应该落在哪个位置
 * 注意点：Range是跨节点的，可能从一个span开始，在另一个span截止
 * todo:当前没有找到跨行选取内容的方法，所以每一个range的起止点都会在兄弟节点之间
 */

// 现有暂时的焦点处理：元素改变触发oninput时，默认将焦点扔到最后面

export function changeFocus(preText,currentText){
    // 默认range只有一个，因此焦点改变意味着字符串只能有一个地方发生改变
    // 找到两个字符串有改变的
    const preLen = preText.length
    const currentLen = currentText.length
    const longerLen = preLen<currentLen?preLen:currentLen
    for(let i = 0; i< longerLen; i++){
        if(preText[i] === currentText[i]){
            continue
        }
        // 当找到不同字符时，计算两个字符串长度的差值，以不同字符为起点，长度为差值的字符串就是两个字符串的区别
        const diff = preLen -
    }
}
