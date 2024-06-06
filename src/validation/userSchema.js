import { joinSchema, loginSchema } from './emailSchema';
import { userInfoSchema, userInfoUpdateSchema } from './userInfoSchema';

// 이메일 회원가입
export const joinResolver = (formValues) => {
  const { success, error } = joinSchema.safeParse(formValues);
  return success ? {} : error.flatten().fieldErrors;
};
// 이메일 로그인
export const loginResolver = (formValues) => {
  const { success, error } = loginSchema.safeParse(formValues);
  return success ? {} : error.flatten().fieldErrors;
};
// 유저 데이터 업로드
export const uploadUserDataResolver = (formValues) => {
  const { success, error } = userInfoSchema.safeParse(formValues);
  return success ? {} : error.flatten().fieldErrors;
};
// 유저 데이터 업로드
export const reuploadUserDataResolver = (formValues) => {
  const { success, error } = userInfoUpdateSchema.safeParse(formValues);
  return success ? {} : error.flatten().fieldErrors;
};
