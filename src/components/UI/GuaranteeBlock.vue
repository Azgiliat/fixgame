<template>
    <div class="guarantees-block">
        <div :class="{selected: i===selectedG}" :id="i" class="guarantee-wrapper" v-bind:key="i"
             v-for="(g, i) in guarantees">
            <div class="guarantee-inner" v-on:click="onSelected(i)">
                {{g}}
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "GuaranteeBlock",
        data: function () {
            return {
                selectedG: 0
            }
        },
        props: {
            guarantees: Array
        },
        methods: {
            onSelected: function (i) {
                this.selectedG = i;
                this.$emit("guaranteeselect", i);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .guarantees-block {
        background: rgba(0, 0, 0, 0.35); //#101010;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-sizing: border-box;
        border-radius: 4px;
        width: 100%;
        margin: 0 !important;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;

        .guarantee-wrapper {
            padding: 0;
            border-radius: 4px;
            width: calc(calc(100% / 24) * 6);

            &.selected {
                background: linear-gradient(270deg, #FAB55B 0%, #C667CD 52.08%, #737BE4 100%);
                padding: 1px 1px;

                .guarantee-inner {
                    background: #101010;
                }
            }

            .guarantee-inner {
                background: rgba(0, 0, 0, 0.35);
                border-radius: 4px;
                padding: 8px 0;
                text-align: center;
                height: 100%;
                cursor: pointer;
                font-size: 14px;
            }
        }
    }
</style>