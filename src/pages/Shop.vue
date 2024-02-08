<template>
    <div class="ShopPage">
        <div :key="'list'" class="container main__container">
            <Mine :packs="packs"/>
            <Shop/>
        </div>
        <BuyForm class="main__buy-form" v-if="formIsOpen"/>
    </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import BuyForm from '@/components/BuyForm'
    import Mine from '../components/Shop/Mine'
    import Shop from "../components/Shop/Shop";

    export default {
        name: "ShopPage",
        components: {
            Shop,
            Mine,
            BuyForm
        },
        data() {
            return {}
        },
        methods: {
            ...mapMutations('buy', {
                setCurrentAccountToBuy: 'setCurrentAccountToBuy'
            }),
            openForm(type, pack) {
                this.setCurrentAccountToBuy(pack)
            },
        },
        computed: {
            ...mapState('packs', {
                packs: 'packs',
            }),
            formIsOpen: function () {
                return this.$store.state.packs.openForm;
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>