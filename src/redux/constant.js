/**
 * actions/editor.js
 */
// 在store中更改段落内容，但不刷新页面
export const CHANGE_PARA_CONTENT = 'change_para_content'
// 在store中更改段落内容，同时更新界面
export const CHANGE_PARA_CONTENT_WITH_REFRESH = 'change_para_content_with_refresh'
// 在store中删除段落，同时更新界面
export const DELETE_NODE = 'delete_node'
// 在store中将内容绑定给特定的id，方便寻找代码块
export const BIND_CONTENT_TO_ID = 'bind_content_to_id'

/**
 * actions/code.js
 */
// 修改代码类型
export const CHANGE_CODE_TYPE = 'change_para_mode'
// 上传代码文件
export const UPLOAD_CODE_FILE = 'upload_code_file'
// 执行代码文件
export const EXECUTE_CODE_FILE = 'execute_code_file'

/**
 * actions/paragraph.js
 */
// 新建一个空段落
export const CREATE_NEW_PARAGRAPH = 'create_new_paragraph'
export const CHANGE_PARAGRAPH_TYPE = 'change_paragraph_type'
