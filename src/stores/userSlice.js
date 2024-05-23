import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    email:'', //sessionStorage.getItem('email')||'',
    userEmail:'',//sessionStorage.getItem('email')||'',
    isUserLogin:false,// JSON.parse(sessionStorage.getItem('login') || 'false'),
    token:''//sessionStorage.getItem('token')||'',
  },
  reducers: {
    updateToken: (state, action) => {
      
        state.token = action.payload;
        console.log( state.token,'ookktoken')
    },
    updateLogin: (state, action) => {
     state.isUserLogin = action.payload;
    },
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateEmail: (state, action) => {
        console.log(action,'action===>',state)
      state.email = action.payload;
      state.userEmail = action.payload;
      console.log(state.userEmail,'--->')
    }
  },
});

export const { updateName, updateEmail,updateLogin,updateToken } = userSlice.actions;
export default userSlice.reducer;