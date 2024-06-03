const initalState = {
  isLogin: false,
  userObj: {},
};

export const login_user = 'user/LOGIN';
export const logut_user = 'user/LOGOUT';

function userReducer(prevState = initalState, action) {
  switch (action.type) {
    case login_user: {
      const { email, id } = action.payload;
      return {
        isLogin: true,
        userObj: {
          email,
          id,
        },
      };
    }
    case logut_user:
      return {
        isLogin: false,
        userObj: {},
      };
    default:
      return {
        isLogin: false,
        userObj: {},
      };
  }
}

export default userReducer;
