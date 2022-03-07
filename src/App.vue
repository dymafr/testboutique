<script setup lang="ts">
import TheHeader from './components/Header.vue'
import TheFooter from './components/Footer.vue'
import Shop from './components/Shop/Shop.vue'
import Cart from './components/Cart/Cart.vue'
import products from './data/product';
import DEFAULT_FILTERS from './data/filter';
import { computed, reactive } from 'vue';
import type { ProductCartInterface, ProductInterface } from './interfaces';
import type { Category, Filter, FilterInterface } from './interfaces/Filter.interface';

const state = reactive<{
    products: ProductInterface[],
    cart: ProductCartInterface[],
    filters: FilterInterface
}>({
    products,
    cart: [],
    filters: DEFAULT_FILTERS
})

function addProductToCart(productId: number): void {
    const product = state.products.find(product => product.id === productId);
    if (product) {
        const productInCart = state.cart.find(product => product.id === productId)
        if (productInCart) {
            productInCart.quantity++
        } else {
            state.cart.push({ ...product, quantity: 1 })
        }
    }
}

function removeProductFromCart(productId: number): void {
    const productFromCart = state.cart.find(product => product.id === productId);
    if (productFromCart) {
        if (productFromCart.quantity === 1) {
            state.cart = state.cart.filter(product => product.id !== productId);
        } else {
            productFromCart.quantity--;
        }
    }
}

function updateFilter({ filterName, filterValue }: { filterName: 'priceRange', filterValue: [number, number] } | { filterName: 'search', filterValue: string } | { filterName: 'category', filterValue: Category }) {
    switch (filterName) {
        case 'search': {
            state.filters.search = filterValue
            break;
        }
        case 'priceRange': {
            state.filters.priceRange = filterValue
            break;
        }
        case 'category': {
            state.filters.category = filterValue;
            break;
        }
    }
}

function resetFilters() {
    state.filters = DEFAULT_FILTERS;
}

const cartEmpty = computed(() => state.cart.length === 0)

const filteredProduct = computed(() => {
    return state.products.filter((product) => {
        const { priceRange: [minPrice, maxPrice], category, search } = state.filters;
        if (product.price >= minPrice && product.price <= maxPrice && (category === 'all' || product.category === category && product.title.toLocaleLowerCase().startsWith(search.toLocaleLowerCase()))) {
            return true
        } else {
            return false;
        }
    })
})

</script>

<template>
    <div class="app-container" :class="{
        gridEmpty: cartEmpty
    }">
        <TheHeader class="header" />
        <Shop
            :products="state.products"
            :filters="state.filters"
            @add-product-to-cart="addProductToCart"
            @reset-filters="resetFilters"
            @update-filter="updateFilter"
            class="shop"
        />
        <Cart
            v-if="!cartEmpty"
            :cart="state.cart"
            class="cart"
            @remove-product-from-cart="removeProductFromCart"
        />
        <TheFooter class="footer" />
    </div>
</template>

<style lang="scss">
@import "./assets/scss/base.scss";
@import "./assets/scss/debug.scss";

.app-container {
    min-height: 100vh;
    display: grid;
    grid-template-areas: "header header" "shop cart" "footer footer";
    grid-template-columns: 75% 25%;
    grid-template-rows: 48px auto 48px;
}

.gridEmpty {
    grid-template-areas: "header" "shop" "footer";
    grid-template-columns: 100%;
}

.header {
    grid-area: header;
}

.shop {
    grid-area: shop;
}

.cart {
    grid-area: cart;
    border-left: var(--border);
    background-color: white;
}

.footer {
    grid-area: footer;
}
</style>
