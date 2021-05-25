import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
createApp({
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      const url = 'https://vue3-course-api.hexschool.io';
      const user = {
        username: this.username,
        password: this.password,
      };
      axios
        .post(`${url}/admin/signin`, user)
        .then((res) => {
          if (res.data.success) {
            console.log(res);
            const { token, expired } = res.data;
            document.cookie = `ytToken=${token}; expires=${new Date(
              expired
            )}; path=/`;
            window.location = 'product.html';
          }
        })
        .catch((res) => {
          console.log(res);
        });
    },
  },
}).mount('#app');

// function login(event) {
//   event.preventDefault();
//   // 以下為示範程式碼
//   const url = 'https://vue3-course-api.hexschool.io';
//   const user = {
//     username: username.value,
//     password: password.value,
//   };
//   axios
//     .post(`${url}/admin/signin`, user)
//     .then((response) => {
//       if (response.data.success) {
//         const { token, expired } = response.data;
//         // 寫入 cookie token
//         // expires 設置有效時間
//         document.cookie = `ytToken=${token}; expires=${new Date(
//           expired
//         )}; path=/`;
//         window.location = 'product.html';
//       } else {
//         alert(response.data.message);
//       }
//     })
//     .catch((error) => {
//       console.log(error);
//     });
// }

// form.addEventListener('submit', login);
