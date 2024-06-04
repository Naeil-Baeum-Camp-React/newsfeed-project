import supabase from '../config/supabase';

// 유저 이미지 url 불러오기
export const getAvartarUrl = (avartatName) => {
  const { data } = supabase.storage.from('avatars').getPublicUrl(avartatName);
  return data;
};

// 유저 이미지 교체

// 유저 데이터 정보 가져오기
export async function getUserData() {
  const { data } = await supabase.from('USERS').select();
  return data;
}
