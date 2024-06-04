import { z } from 'zod';

const nameRegex = new RegExp(/^[ㄱ-ㅎ가-힣a-zA-Z0-9]*$/g);
export const userInfoSchema = z.object({
  nickname: z
    .string()
    .max(15, { message: '15자 이하로 입력해주세요.' })
    .regex(nameRegex, { message: '한글 또는 영문 또는 숫자만 가능합니다.' }),
  blog_name: z
    .string()
    .max(15, { message: '15자 이하로 입력해주세요.' })
    .regex(nameRegex, { message: '한글 또는 영문 또는 숫자만 가능합니다.' }),
  profile_image: z,
});
