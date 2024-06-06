import { z } from 'zod';

const ACCEPTED_IMAGE_MIME_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

const nameRegex = new RegExp(/^[ㄱ-ㅎ가-힣a-zA-Z0-9]*$/g);
export const userInfoSchema = z
  .object({
    nickname: z
      .string()
      .max(15, { message: '15자 이하로 입력해주세요.' })
      .regex(nameRegex, { message: '한글 또는 영문 또는 숫자만 가능합니다.' }),
    blog_name: z
      .string()
      .max(15, { message: '15자 이하로 입력해주세요.' })
      .regex(nameRegex, { message: '한글 또는 영문 또는 숫자만 가능합니다.' }),
    profile_image: z.any(),
  })
  .refine((file) => ACCEPTED_IMAGE_MIME_TYPES.includes(file['profile_image'].type), {
    message: '파일 형식은 .jpg, .jpeg, .png 만 가능합니다.',
    path: ['profile_image'],
  });

export const userInfoUpdateSchema = z.object({
  nickname: z
    .string()
    .max(15, { message: '15자 이하로 입력해주세요.' })
    .regex(nameRegex, { message: '한글 또는 영문 또는 숫자만 가능합니다.' }),
  blog_name: z
    .string()
    .max(15, { message: '15자 이하로 입력해주세요.' })
    .regex(nameRegex, { message: '한글 또는 영문 또는 숫자만 가능합니다.' }),
});
