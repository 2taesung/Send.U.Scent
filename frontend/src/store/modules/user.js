import axios from "axios"

export default {
//   namespaced: true,
  // data
  state:{
    isLogin: false,
    user_id: null,
    isLoginError: false
  },
  // 변이 : state값 변경은 여기서만 가능
  // 실행할 때  .commit() 메소드 사용
  mutations: {
    // 로그인 성공했을 때,
    loginSuccess(state, payload) {
      state.isLogin = true
      state.isLoginError = false
      state.userInfo = payload
      state.email = payload.email
    },
    // 로그인이 실패했을 때,
    LoginError(state) {
      state.isLogin = false
      state.isLoginError = false
    },
  },
  // 비동기 처리
  // 실행할 때 .dispatch() 메소드 사용
  // context : state 데이터 접근, payload : 입력받은 값의 매개변수
  actions: {
    
    // 로그인 시도
    login({dispatch}, loginObj) {
      // 로그인 -> 토큰반환
      console.log(loginObj)
      axios
        .post("http://localhost:8888/api/login", loginObj) // user_id, password
        .then(res => {
          // 성공 시 token이 돌아옴.
          // 토큰을 헤더에 포함시켜서 유저정보를 요청
          let token = res.data.token
          let user_id = res.data.user_id
          // 토큰을 로컬 스토리지에 저장
          localStorage.setItem("access_token", token) // key - value
          localStorage.setItem("user_id", user_id)
        //   dispatch("getMemberInfo")
          console.log('로그인 완료')
        })
        // 로그인 실패했을 때.
        .catch(() => {
          alert('이메일과 비밀번호를 확인하세요.')
        })
    },

    signup({dispatch}, signupObj) {
        console.log('하이')
        axios
            .post('http://localhost:8888/api/users/add', signupObj)
            .then(res => {
            let user_id = res.data.user_id
            let nickname = res.data.nickname
            let password = res.data.password
            let loginObj = {
                user_id: user_id,
                nickname: nickname,
                password: password
            }
            console.log('회원가입 완료')
            dispatch('login', loginObj)
            })
            .catch(() => {
            alert('다시 입력해주세요!')
        })
    },
  }
}