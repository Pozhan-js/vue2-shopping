//创建正则 限定输入购物车的数量只能 在 0~999之间
export const skuNumReg = /^[1-9]\d{0,2}$/


// 3. 书写一个正则表达式来验证验证码 验证码是6位数字
// export const codeNumReg = /^\d{6}$/

// // 4. 验证密码
// export const passNumReg = /^[A-Za-z0-9_]{6,12}$/

// // 验证手机号
// export const phoneNumberReg = /^1[3-578]\d{9}$/

// 2.检测手机号码
export const phoneNum = /^\d{11}$/

// 3.验证码规则
export const codeNum = /^\d{6}$/

// 4.密码验证规则
export const passwordNum = /^\w{6}$/