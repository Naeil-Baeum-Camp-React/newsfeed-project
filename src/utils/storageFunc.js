// 로컬 스토리지 저장
export const setDataToLocal = (key, value) => {
  const stringified = JSON.stringify(value);
  window.localStorage.setItem(key, stringified);
};
// 로컬 스토리지 가져오기
export const getDataToLocal = (key) => {
  const data = window.localStorage.getItem(key);

  if (data && data !== 'undefined') {
    return JSON.parse(data);
  }
  return false;
};
