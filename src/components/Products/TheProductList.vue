<template>
    <div class="products-block">
        <div class="mini-games__container">
            <Product :key="product.id" :product="product" v-for="product in products"/>
        </div>
    </div>
</template>

<script>
    import Product from "./Product";

    export default {
        components: {
            Product
        },
        props: {
            products: Array
        },
        name: "TheProductList"
    }
</script>

<style lang="scss" scoped>
    .products-block {
        margin-bottom: 120px;

        &__list {
            list-style: none;
            margin: 0;
            padding: 0;
        }
    }
</style>