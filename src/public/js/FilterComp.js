'use strict';

const filterEl = {
    data(){
        return {
            userSearch: ''
        };
    },
    template: `
            <form action="#" class="search-form" @submit.prevent="$parent.$refs.products.filter(userSearch)">
                <input type="text" class="search-field" v-model="userSearch">
                <button class="btn-search" type="submit">
                    <img src="images/loupe.svg" alt="search">
                </button>
            </form>
    `
};

export default filterEl;
