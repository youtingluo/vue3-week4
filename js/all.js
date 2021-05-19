const userName = document.getElementById('userName');
const password = document.getElementById('password');
const loginBtn = document.getElementById('login');
const itemList = document.getElementById('itemList');
const inputName = document.getElementById('inputName');
const inputPrice = document.getElementById('inputPrice');
const inputSale = document.getElementById('inputSale');
const addProduct = document.querySelector('.add');
const url = 'https://vue3-course-api.hexschool.io';
const path = 'youting';

const App = {
  data: [],
  // 取得產品
  getProducts() {
    axios.get(`${url}/api/${path}/products`).then((res) => {
      console.log(res);
      if (res.data.success) {
        this.data = res.data.products;
        this.render();
      } else {
        alert(`${res.data.message}`);
      }
    });
  },
  // 新增產品
  addProduct() {
    const product = {
      data: {
        title: inputName.value,
        category: '測試',
        origin_price: Math.abs(parseInt(inputPrice.value)),
        price: Math.abs(parseInt(inputSale.value)),
        unit: '個',
        is_enabled: 1,
      },
    };
    axios.post(`${url}/api/${path}/admin/product`, product).then((res) => {
      if (res.data.success) {
        this.getProducts();
        alert('新增產品成功');
        inputName.value = '';
        inputPrice.value = '';
        inputSale.value = '';
      } else {
        alert(`${res.data.message}`);
      }
    });
  },
  // 刪除產品
  deleteProduct(evt) {
    if (!evt.target.dataset.id) {
      return;
    }
    if (!window.confirm('確定要刪除嗎?')) return;
    const id = evt.target.dataset.id;
    axios.delete(`${url}/api/${path}/admin/product/${id}`).then((res) => {
      if (res.data.success) {
        this.getProducts();
      } else {
        alert(`${res.data.message}`);
      }
    });
  },
  // 渲染畫面
  render() {
    let str = '';
    this.data.forEach((item) => {
      str += `<tr>
      <td>${item.title}</td>
      <td>${item.origin_price}</td>
      <td>${item.price}</td>
      <td>
        <div class="item">
          <input type="checkbox" name="" id="group" checked/>
          <label for="group">啟用</label>
        </div>
      </td>
      <td>
        <div class="del_btn" data-id="${item.id}">X</div>
      </td>
    </tr>`;
    });
    itemList.innerHTML = str;
  },
  // init
  created() {
    //存入header
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)ytToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    axios.defaults.headers.common['Authorization'] = token;
    this.getProducts();
  },
};
App.created();
addProduct.addEventListener('click', App.addProduct.bind(App));
itemList.addEventListener('click', App.deleteProduct.bind(App));
