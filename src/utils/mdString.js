import { REGS } from "./constant";
export function stringToMdType(str) {
    // 默认返回p
    let result = 'p'

    if(REGS.heading_reg.test(str)){//当前字符串匹配heading成功
        const length = str.split(' ')[0].length
        result = 'h' + length
    }
    return result
}
export function isHeading(str) {
    if(REGS.heading_reg.test(str)){
        return true
    }else{
        return false
    }
}
export function isHeadingType(mdType) {
    if(REGS.heading_type_reg.test(mdType)){
        return true
    }
    else return false
}

export function contentToPureContent(content,mdType) {
    if(isHeading(content)){
        let headingLength = parseInt(mdType.split('h')[1])
        return content.substr(headingLength+1)
    }
}

export function pureContentToContent(pureContent,mdType='p') {
    // 通过正则判断是否是heading
    if(isHeadingType(mdType)){
        let headingLength = parseInt(mdType.split('h')[1])
        let str = '#'
        str = str.repeat(headingLength) 
        return str + ' ' + pureContent
    }
    else return pureContent
}