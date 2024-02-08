<template>
    <section class="main">
        <transition mode="out-in" name="loading-packs">
            <Loader :key="'loader'" class="main__loader" v-if="isLoading"/>
            <router-view class="main__body" v-else/>
        </transition>
    </section>
</template>

<script>
    import Loader from '@/components/UI/Loader'
    import {mapActions, mapState} from 'vuex'

    export default {
        name: 'Main',
        components: {
            Loader
        },
        methods: {
            ...mapActions('packs', {
                loadPacks: 'loadPacks'
            })
        },
        computed: {
            ...mapState('packs', {
                isLoading: 'loading'
            })
        },
        created() {
            this.loadPacks()
        }
    }
</script>

<style lang="scss" scoped>
    .main {
        padding-top: 85px;
        @media ($desktop) {
            padding-top: 20px;
        }

        &__loader {
            position: fixed;
            top: calc(50% - 75px);
            left: calc(50% - 37px);
        }

        &__body {
            flex-grow: 1;
        }

        .loading-packs {
            &-leave-to {
                opacity: 0;
                transform: translateY(-30px);
            }

            &-enter {
                opacity: 0;
                transform: translateY(30px);
            }

            &-enter-to {
                opacity: 1;
                transform: translateY(0);
            }

            &-enter-active, &-leave-active {
                transition: opacity $transition, transform $transition;
            }
        }
    }
</style>