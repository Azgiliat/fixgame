<template>
    <div :style="{background: getBackImg}" class="mini-games__container-item">
        <p class="mini-games__container-item__name">{{title}}</p>
        <button @click="onBuyClick" class="mini-games__container-item__button" type="button">
            <p class="mini-games__container-item__button-text">Купить за {{cost}} ₽</p>
        </button>
    </div>
</template>

<script>


    export default {
        name: 'PackCard',
        props: {
            product: Object
        },
        components: {},
        data: function () {
            return {
                title: this.product.products[0].displayName,
                id: this.product.id,
                backImg: this.product.products[0].imgLink,
                cost: this.product.products[0].price
            }
        },
        computed: {
            getBackImg: function () {
                return "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.75) 100%), url('" + this.backImg + "')";
            }
        },
        methods: {
            onBuyClick() {
                this.$store.commit("packs/setProductToBuy", this.id);
                this.$store.commit("packs/openForm");
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>
