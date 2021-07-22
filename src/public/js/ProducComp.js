'use strict';

const product = {
    props: ['product', 'img'],
    data() {
        return {
            cartAPI: this.$root.$refs.cart,
        };
    },

    template: `
        <div class="products__card">
            <div class="products__card-img">
                <div class="products__card-hover">
                    <button class="products__card-hover__link" @click="cartAPI.addProduct(product)">
                        Add to Cart
                    </button>
                </div>
                <img :src="product.img" alt="product">
            </div>
            <div class="products__card-text">
                <h4 class="products__card-heading" >{{product.title}}</h4>
                <p class="products__card-description">{{product.desc}}</p>
                <p class="price">$ {{product.price}}</p>
            </div>
        </div>
    `
};

const products = {
    components: { product },
    data(){
        return {
            products: [],
            filtered: [],
        };
    },
    methods: {
        filter(value) {
            let regexp = new RegExp(value, 'i');
            this.filtered = this.products.filter(el => regexp.test(el.title));
            this.$root.$refs.filter.userSearch = '';
        }
    },
    mounted(){
        this.$parent.getJson('/api/products')
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            });
    },
    template: `
        <div class="products">
            <p v-if="!filtered.length">Не найдено</p>
            <product v-for="item of filtered" :key="item.id" :product="item"></product>
        </div>
    `
};

export default products;
