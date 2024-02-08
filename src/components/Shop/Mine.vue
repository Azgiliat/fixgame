<template>
    <div class="mine">
        <ul class="mine__list">
            <li :key="pack.id" class="mine__item" v-for="pack in packs">
                <PackCard :group="pack" @buyPack="openForm($event, pack)"/>
            </li>
        </ul>
    </div>
</template>

<script>
    import PackCard from '../Pack/PackCard'

    export default {
        name: 'Mine',
        components: {
            PackCard
        },
        props: {
            //packs: Array
        },
        computed: {
            packs: function () {
                return [
                    this.$store.getters["packs/getItemsByType"]("mc")[0],
                    this.$store.getters["packs/getItemsByType"]("mc-fullprem")[0],
                    this.$store.getters["packs/getItemsByType"]("mc-ezprem")[0]
                ];
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mine {
        &__list {
            display: flex;
            justify-content: space-around;
            list-style: none;
            padding: 0;
            @media ($desktop) {
                display: flex;
                flex-wrap: wrap;
                margin-right: -15px;
            }
        }

        &__item {
            &:nth-child(2) {
                transform: scale(1.1);
                @media ($desktop) {
                    transform: scale(1);
                }
            }

            @media ($desktop) {
                margin-bottom: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                max-width: 350px;
                flex-grow: 1;
                margin-right: 15px;
            }
        }
    }
</style>