import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.0.9/vue.esm-browser.js';
let productModal = null;
let delProductModal = null;
const app = {
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io',
      path: 'youting',
      products: [],
      tempProduct: {
        imagesUrl: [],
      },
      isNew: true,
    };
  },
  methods: {
    // 新增或編輯產品
    updateProduct() {
      // 預設是新增 api,方法為 post
      let api = `${this.url}/api/${this.path}/admin/product`;
      let httpMethod = 'post';
      // 如果不是新增
      if (!this.isNew) {
        // 修改 api 與方法為 put
        api = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`;
        httpMethod = 'put';
      }
      // api 行為
      axios[httpMethod](api, { data: this.tempProduct })
        .then((res) => {
          if (res.data.success) {
            productModal.hide();
            this.getProducts();
            alert(res.data.message);
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 刪除產品
    delProduct() {
      const api = `${this.url}/api/${this.path}/admin/product/${this.tempProduct.id}`;
      axios
        .delete(api)
        .then((res) => {
          if (res.data.success) {
            delProductModal.hide();
            this.getProducts();
            alert(res.data.message);
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 打開 Modal
    openModal(isNew, item) {
      // 判斷是新增
      if (isNew === 'new') {
        this.tempProduct = {
          imagesUrl: [],
        };
        // 將 isNew 改為 true
        this.isNew = true;
        // 打開產品 Modal
        productModal.show();
        // 判斷是編輯
      } else if (isNew === 'edit') {
        // 將產品拷貝至 tempProduct
        this.tempProduct = { ...item };
        // isNew 改為 false
        this.isNew = false;
        productModal.show();
        // 判斷是刪除
      } else if (isNew === 'delete') {
        this.tempProduct = { ...item };
        // 打開刪除 Modal
        delProductModal.show();
      }
    },
    // 取得產品
    getProducts() {
      axios
        .get(`${this.url}/api/${this.path}/admin/products`)
        .then((res) => {
          if (res.data.success) {
            this.products = res.data.products;
          } else {
            alert(res.data.message);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  mounted() {
    // 實體化 modal
    productModal = new bootstrap.Modal(document.getElementById('productModal'));
    delProductModal = new bootstrap.Modal(
      document.getElementById('delProductModal')
    );
    // 取 token
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)ytToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    if (!token) {
      alert('驗證錯誤，請登入');
      // 假如沒有取得 token,網頁導回登入頁
      window.location = 'login.html';
    }
    // axios 設定預設 token
    axios.defaults.headers.common['Authorization'] = token;
    // 執行取得產品
    this.getProducts();
  },
};
createApp(app).mount('#app');
