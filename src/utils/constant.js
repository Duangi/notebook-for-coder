/**
 * 按键
 */
export const KEY_BACKSPACE = 8
export const KEY_ENTER = 13
export const KEY_SPACE = 32
export const KEY_TAB = 9

export const CHAR_TAB = 0x09
export const CHAR_NEW_LINE = 0x0A
export const CHAR_SPACE = 0x20

/**
 * 正则表达式
 */
export const REGS = {
    heading_reg : /^#{1,6} .*$/ ,
    heading_type_reg: /^h[1-6]$/
}

/**
 * 代码类型相关
 */
export const PYTHON = 'python'
export const JAVASCRIPT = 'javascript'
export const FILE_EXTENSION_MAP = {
    'python': 'py',
    'javascript': 'js'
}