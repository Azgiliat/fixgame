<template>
    <div class="shop">
        <p class="shop__title">Все товары</p>
        <TheCatSelector :cats="['Все', 'Аккаунты', 'Ключи']" v-on:catSelect="onCatSelected"/>
        <TheProductList :products="products"/>
    </div>
</template>

<script>
    import TheCatSelector from "../UI/TheCatSelector";
    import TheProductList from "../Products/TheProductList";

    export default {
        name: "Shop",
        components: {TheProductList, TheCatSelector},
        data: function () {
            return {
                selectedCat: 0
            }
        },
        computed: {
            products: function () {
                switch (this.selectedCat) {
                    case 0:
                        return this.$store.getters["packs/getItemsByType"]("account").concat(this.$store.getters["packs/getItemsByType"]("key"));
                    case 1:
                        return this.$store.getters["packs/getItemsByType"]("account");
                    case 2:
                        return this.$store.getters["packs/getItemsByType"]("key");
                    default:
                        return this.$store.getters["packs/getItemsByType"]("account").concat(this.$store.getters["packs/getItemsByType"]("key"));
                }
            }
        },
        methods: {
            onCatSelected: function (i) {
                console.log(i);
                this.selectedCat = i;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .shop {
        margin-top: 175px;

        &__title {
            text-align: center;
            margin: 0 auto;

            font-family: Montserrat;
            font-style: normal;
            font-weight: 500;
            font-size: 24px;
            line-height: 29px;
            color: #FFFFFF;

            text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
        }
    }
</style>