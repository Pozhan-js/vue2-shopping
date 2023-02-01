import { v4 as uuidv4 } from 'uuid';

// 获取uuid
export const getUserTempId = () => {
  let uuid = localStorage.getItem('uuid');
  if (!uuid) {
    localStorage.setItem('uuid', uuidv4());
  }
  return uuid;
}
