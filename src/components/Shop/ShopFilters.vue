<script setup lang="ts">
import type { Category, FilterInterface, FilterUpdate } from '@/interfaces/Filter.interface';

const { filters: { search, priceRange, category } } = defineProps<{
    filters: FilterInterface
}>()

const emit = defineEmits<{
    (e: 'updateFilter', update: FilterUpdate): void
}>()

function updateSearch(value: string): void {
    emit('updateFilter', {
        filterName: 'search',
        filterValue: value
    })
}

</script>

<template>
    <div class="sidebar p-20">
        <div class="d-flex flex-column mb-20">
            <h3 class="mb-10">Recherche</h3>
            <input
                :value="search"
                @input="updateSearch(($event.target as HTMLInputElement).value)"
                type="text"
                placeholder="rechercher"
            />
        </div>
        <div class="d-flex flex-column mb-20">
            <h3 class="mb-10">Trier par prix</h3>
            <div class="mb-5">
                <input type="radio" id="800-1000" name="price" />
                <label for="800-1000">Entre 800 et 1000</label>
            </div>
            <div class="mb-5">
                <input type="radio" id="1000-1500" name="price" />
                <label for="1000-1500">Entre 1000 et 1500</label>
            </div>
            <div class="mb-5">
                <input type="radio" id="1500-2000" name="price" />
                <label for="1500-2000">Entre 1500 et 2000</label>
            </div>
            <div class="mb-5">
                <input type="radio" id="2000+" name="price" />
                <label for="2000+">Entre 800 et 1000</label>
            </div>
        </div>
        <div>
            <h3 class="mb-10">Type de portables</h3>
            <p class="laptop-type mb-5">Gamer</p>
            <p class="laptop-type mb-5">Bureau</p>
            <p class="laptop-type mb-5">Streaming</p>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.laptop-type {
    font-size: 14px;
}
</style>
