let myModal = new bootstrap.Modal(document.getElementById('productModal'));
const app = {
  data() {
    return {
      url: 'https://vue3-course-api.hexschool.io',
      path: 'youting',
      products: [],
    };
  },
  methods: {
    openModal() {
      myModal.show();
    },
    getProducts() {
      axios.get(`${this.url}/api/${this.path}/admin/products`).then((res) => {
        console.log(this.products, res.data.products);
        this.products = res.data.products;
      });
    },
  },
  mounted() {
    const token = document.cookie.replace(
      /(?:(?:^|.*;\s*)ytToken\s*\=\s*([^;]*).*$)|^.*$/,
      '$1'
    );
    axios.defaults.headers.common['Authorization'] = token;
    this.getProducts();
  },
};
Vue.createApp(app).mount('#app');
