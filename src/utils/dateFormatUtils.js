/**
 * 날짜를 원하는 포맷으로 변환하는 함수입니다.
 * @param {Date} date 변환할 날짜 객체입니다.
 * @param {string} format 변환할 형식 문자열입니다. `DATE_FORMATS`에 정의된 포맷을 사용하세요.
 * @returns {string} 변환된 날짜 문자열을 반환합니다.
 */
export default function formatDate(date, format) {

  if (!(date instanceof Date) || isNaN(date)) {
    throw new TypeError('The provided date is not a valid Date object.');
  }

  if (!Object.values(DATE_FORMATS).includes(format)) {
    throw new Error(`Invalid format: ${format}. Please use one of the predefined formats.`);
  }

  const map = {
    'YYYY': date.getFullYear(),
    'MM': ('0' + (date.getMonth() + 1)).slice(-2),
    'DD': ('0' + date.getDate()).slice(-2),
    'HH': ('0' + date.getHours()).slice(-2),
    'mm': ('0' + date.getMinutes()).slice(-2),
    'ss': ('0' + date.getSeconds()).slice(-2),
  };

  return format.replace(/YYYY|MM|DD|HH|mm|ss/g, matched => map[matched]);
}

/**
 * 날짜 포맷을 정의한 객체입니다.
 * - ISO: 'YYYY-MM-DD'
 * - KOREAN: 'YYYY년 MM월 DD일'
 * - TIME: 'HH:mm:ss'
 * - FULL: 'YYYY-MM-DD HH:mm:ss'
 */
export const DATE_FORMATS = {
  ISO: 'YYYY-MM-DD',
  KOREAN: 'YYYY년 MM월 DD일',
  TIME: 'HH:mm:ss',
  FULL: 'YYYY-MM-DD HH:mm:ss',
};