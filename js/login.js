const username = document.querySelector('#username');
const password = document.querySelector('#password');
const form = document.querySelector('#form');

function login(event) {
  event.preventDefault();
  window.location = 'product.html';
  // 以下為示範程式碼
  const url = 'https://vue3-course-api.hexschool.io';
  const path = 'youting';
  const user = {
    username: username.value,
    password: password.value,
  };
  axios
    .post(`${url}/admin/signin`, user)
    .then((response) => {
      if (response.data.success) {
        const { token, expired } = response.data;
        // 寫入 cookie token
        // expires 設置有效時間
        document.cookie = `ytToken=${token}; expires=${new Date(
          expired
        )}; path=/`;
        window.location = 'product.html';
      } else {
        alert(response.data.message);
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

form.addEventListener('submit', login);
