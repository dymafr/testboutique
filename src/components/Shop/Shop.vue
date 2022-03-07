<script setup lang="ts">
import type { ProductInterface } from '@/interfaces';
import ShopProductList from './ShopProductList.vue';
import ShopFilters from './ShopFilters.vue';
import type { Category, Filter, FilterInterface } from '@/interfaces/Filter.interface';

defineProps<{
    products: ProductInterface[],
    filters: FilterInterface
}>()

const emit = defineEmits<{
    (e: 'addProductToCart', productId: number): void
    (e: 'updateFilter', update: { filterName: 'priceRange', filterValue: [number, number] } | { filterName: 'search', filterValue: string } | { filterName: 'category', filterValue: Category }): void
}>()

</script>

<template>
    <div class="d-flex flex-row">
        <ShopFilters
            class="filters"
            @update-filter="emit('updateFilter', $event)"
            :filters="filters"
        />
        <ShopProductList
            class="flex-fill"
            @add-product-to-cart="emit('addProductToCart', $event)"
            :products="products"
        />
    </div>
</template>

<style lang="scss" scoped>
.filters {
    flex: 0 0 250px;
}
</style>
