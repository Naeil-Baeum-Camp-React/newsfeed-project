# 뉴스피드 프로젝트 : BraBra Blog

### 🖥️ 프로젝트 소개
'싸이월드' 감성을 살린 다이어리 블로그로 일상을 공유!
<br>
나의 팔로워 블로그는 따로 한번에!
<br>
모든 유저의 블로그를 한번에!

<br>

### 📌 기능
- 로그인/로그아웃/회원가입 기능
  - 아이디 변경 가능
  - 비밀번호 변경시 이메일 인증 후 변경 가능
- 유저정보 CRUD 구현 : 마이프로필
  - 사이트 이름, 한줄소개 수정 가능
  - 프로필 사진 등록 및 변경 가능
- 게시글 CRUD 구현 (작성, 수정, 삭제)
  - 모달을 통해 포스팅 등록 : 게시글 제목과 글
  - 작성한 포스팅 수정, 삭제 가능
- 팔로워/전체블로그 기능
  - 전체블로그에서 모든 유저의 블로그(프로필) 확인 가능
  - 타 유저의 블로그 클릭 후 상단 좌측에 '팔로워' 클릭 시 '내 팔로잉 리스트'에서 확인 가능

<br>

### 🕰️ 개발 기간
2024.5.31. ~ 2024.6.6.(총 8일)
 
<br>

### 👨‍👩‍👧‍👦팀원 구성

#### SUPER RUKIE (슈퍼루키🌟)
| 팀장       | 부팀장     | 팀원       | 팀원      | 
| ---------- | ---------- | ---------- | ----------|
| 백현명     | 이인       | 정주신      | 한소영     | 
|@whitewise95  | @LeLu815  | @JOYmet33  | @fjw1010  |

<br>

### 🍳 기술 스택
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)![Styled Components](https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white)![ESLint](https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white)![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)![Figma](https://img.shields.io/badge/figma-%23F24E1E.svg?style=for-the-badge&logo=figma&logoColor=white)![Git](https://img.shields.io/badge/git-%23F05033.svg?style=for-the-badge&logo=git&logoColor=white)![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)

<br>

### 🗂️폴더 구조
```
📦src
 ┣ 📂asset
 ┃ ┣ 📜default-profile.jpg
 ┃ ┣ 📜email.svg
 ┃ ┣ 📜github.png
 ┃ ┣ 📜github.svg
 ┃ ┣ 📜logo_blar.png
 ┃ ┣ 📜logo_blar.svg
 ┃ ┗ 📜settings.png
 ┣ 📂components
 ┃ ┣ 📂app
 ┃ ┃ ┗ 📂user
 ┃ ┃ ┃ ┗ 📜UserBlogList.jsx
 ┃ ┣ 📂common
 ┃ ┃ ┗ 📜Search.jsx
 ┃ ┗ 📂layout
 ┃ ┃ ┣ 📜BlogLayout.jsx
 ┃ ┃ ┣ 📜Layout.jsx
 ┃ ┃ ┣ 📜MenuBar.jsx
 ┃ ┃ ┣ 📜Profile.jsx
 ┃ ┃ ┗ 📜Top.jsx
 ┣ 📂config
 ┃ ┗ 📜supabase.js
 ┣ 📂contexts
 ┃ ┣ 📜login.context.jsx
 ┃ ┗ 📜Profile.js
 ┣ 📂pages
 ┃ ┣ 📂blog
 ┃ ┃ ┗ 📜BlogListPage.jsx
 ┃ ┣ 📂follow
 ┃ ┃ ┗ 📜FollowPage.jsx
 ┃ ┣ 📂Join
 ┃ ┃ ┣ 📜JoinPage.jsx
 ┃ ┃ ┗ 📜SetUserData.jsx
 ┃ ┣ 📂Login
 ┃ ┃ ┣ 📜LoginMainPage.jsx
 ┃ ┃ ┣ 📜LoginPage.jsx
 ┃ ┃ ┗ 📜LoginStyle.jsx
 ┃ ┣ 📂post
 ┃ ┃ ┣ 📜PostCreatingPage.jsx
 ┃ ┃ ┣ 📜PostDetailPage.jsx
 ┃ ┃ ┣ 📜PostsPage.jsx
 ┃ ┃ ┗ 📜PostUpdatingPage.jsx
 ┃ ┣ 📂profile
 ┃ ┃ ┗ 📜ProfileDetailPage.jsx
 ┃ ┗ 📜HomePage.jsx
 ┣ 📂redux
 ┃ ┣ 📂config
 ┃ ┃ ┗ 📜storeConfig.js
 ┃ ┗ 📂slices
 ┃ ┃ ┗ 📜blogSlice.js
 ┣ 📂shared
 ┃ ┗ 📜Router.jsx
 ┣ 📂styles
 ┃ ┣ 📜GlobalStyles.jsx
 ┃ ┗ 📜StyleComponents.jsx
 ┣ 📂utils
 ┃ ┣ 📜dateFormatUtils.js
 ┃ ┣ 📜storageFunc.js
 ┃ ┗ 📜superBaseFunc.jsx
 ┣ 📂validation
 ┃ ┣ 📜emailSchema.js
 ┃ ┣ 📜smsSchema.js
 ┃ ┣ 📜userInfoSchema.js
 ┃ ┗ 📜userSchema.js
 ┣ 📜App.css
 ┣ 📜App.jsx
 ┗ 📜main.jsx
```
