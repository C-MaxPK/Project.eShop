'use strict';

const cartItem = {
    props: ['cartItem', 'img'],
    template: `
            <div class="cart-item">
                <div class="product-bio">
                    <img :src="cartItem.img" alt="product">
                    <div class="product-desc">
                        <p class="product-title">{{cartItem.title}}</p>
                        <p class="product-quantity">Количество: {{cartItem.quantity}}</p>
                        <p class="product-single-price">{{cartItem.price}} $ за ед.</p>
                    </div>
                </div>
                <div class="right-block">
                    <p class="product-price">{{cartItem.quantity * cartItem.price}} $</p>
                    <button class="del-btn" @click="$emit('remove', cartItem)">&times;</button>
                </div>
            </div>
    `
};

const cart = {
    components: { cartItem },
    data(){
        return {
            cartItems: [],
            showCart: false,
        };
    },
    methods: {
        addProduct(product){
            let find = this.cartItems.find(el => el.id === product.id);
            if(find){
                this.$parent.putJson(`/api/cart/${find.id}`, {quantity: 1});
                find.quantity++;
            } else {
                let prod = Object.assign({quantity: 1}, product);
                this.$parent.postJson('/api/cart', prod)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.push(prod);
                            this.$root.$refs.countGoods.countGoods++;
                        }
                    });
            }
        },
        removeProduct(item) {
            if (item.quantity > 1) {
                this.$parent.putJson(`/api/cart/${item.id}`, {quantity: -1})
                    .then(data => {
                        if (data.result === 1) {
                            item.quantity--;
                        }
                    });
            } else {
                this.$parent.deleteJson(`/api/cart/${item.id}`)
                    .then(data => {
                        if (data.result === 1) {
                            this.cartItems.splice(this.cartItems.indexOf(item), 1);
                            this.$root.$refs.countGoods.countGoods--;
                        }
                    });
            }
        },
    },
    computed: {
        getSum() {
            let amount = 0;
            for (let item of this.cartItems) {
                amount += item.price*item.quantity;
            }
            return amount;
        },
    },
    created(){
        this.$parent.getJson('/api/cart')
            .then(data => {
                for(let el of data.contents){
                    this.cartItems.push(el);
                }
            });
    },
    template: `
            <div class="cart-block" v-show="showCart">
                <p v-if="!cartItems.length">Корзина пуста</p>
                <cart-item class="cart-item" 
                    v-for="item of cartItems" 
                    :key="item.id"
                    :cart-item="item" 
                    @remove="removeProduct">
                </cart-item>
                <div class="total-price" v-if="cartItems.length">
                    Total: {{getSum}} $
                </div>
            </div>
    `
};

const count = {
    data(){
        return {
            countGoods: 0,
        };
    },
    created(){
        this.$parent.getJson('/api/cart')
            .then(data => {
                this.countGoods = data.contents.length;
            });
    },
    template: `
        <p class="basket__num" v-if="!countGoods == 0">{{countGoods}}</p>
    `
};

export {
    cart,
    count
};
