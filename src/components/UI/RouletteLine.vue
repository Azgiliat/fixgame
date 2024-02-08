<template>
    <div class="roulette-line">
        <div class="roulette-line__stick"></div>
        <div class="dark-background__roulette"></div>
        <div class="roulette-line__item-wrapper">
            <ul v-bind:style="{left: Swipe}" v-on:transitionend="$emit('swipeEnd')">
                <li :key="n" :style="{ backgroundImage: 'url(' + item.imgLink + ')' }" v-for="(item, n) in Items"></li>
            </ul>
        </div>
    </div>
</template>

<script>
    export default {
        name: "RouletteLine",
        data: function () {
            return {
                swipe: this.Swipe
            }
        },
        props: {
            items: Array,
            id: Number
        },
        computed: {
            needItemId: function () {
                return this.$store.state.cases.casesInUse[this.id].wonId;
            },
            Items: function () {
                let arr = [];
                if (this.needItemId === -1) {
                    for (let i = 0; i <= 7; i++) {
                        arr[i] = this.items[this.getRandomNumber(0, this.items.length - 1)];
                    }
                } else {
                    for (let i = 0; i <= 16; i++) {
                        if (i === 12) {
                            arr[i] = this.items.find((i) => i.id === this.needItemId);
                        } else
                            arr[i] = this.items[this.getRandomNumber(0, this.items.length - 1)];
                    }
                }
                return arr;
            },
            Swipe: function () {
                if (this.$store.state.cases.casesInUse[this.id].inUsed) {
                    return -1 * this.getRandomNumber(106, 116) + "%";
                } else
                    return 0;
            },

        },
        methods: {
            getRandomNumber: function (min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },
            swipeEnd: function () {
                console.log("End Swipe");
            }
        }
    }
</script>

<style scoped>

</style>