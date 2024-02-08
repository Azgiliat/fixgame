<template>
    <div class="cat-selector">
        <div :class="{selected: i === selectedCat}" :key="i"
             @click="onSelected(i)"
             class="cat-selector__wrapper"
             v-for="(cat, i) in cats">
            {{cat}}
        </div>
    </div>
</template>

<script>
    export default {
        name: "TheCatSelector",
        data: function () {
            return {
                selectedCat: 0
            }
        },
        props: {
            cats: Array
        },
        methods: {
            onSelected: function (i) {
                this.selectedCat = i;
                this.$emit("catSelect", i);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .cat-selector {
        background: rgba(4, 12, 35, 0.45);
        border-radius: 10px;
        display: flex;
        width: 35%;
        padding: 2px;
        margin: 60px auto;

        &__wrapper {
            font-family: Montserrat;
            font-style: normal;
            font-weight: 500;
            font-size: 16px;

            width: calc(100% / 3);
            text-align: center;
            padding: 15px 0;
            color: #FFFFFF;
            opacity: 0.75;
            cursor: pointer;

            &.selected {
                background: rgba(4, 12, 35, 0.25);
                border: solid 4px #0f0;
                box-sizing: border-box;
              border-radius: 10px;
              border-image-slice: 20; /* border-radius*2 */
              border-image-repeat: round;
              border-image-width: 20px; /* border-radius*2 */
              border-image-source: url('~@/static/images/cat_selected.png');
              cursor: default;
              padding: 13px 0;
            }
        }
    }

    @media($mobile) {
      .cat-selector {
        display: flex;
        width: 66%;
        flex-direction: column;

        &__wrapper {
          font-family: Montserrat;
          font-style: normal;
          font-weight: 500;
          font-size: 16px;

          width: 100%;
          text-align: center;
          padding: 15px 0;
          color: #FFFFFF;
          opacity: 0.75;
          cursor: pointer;

          &.selected {
            background: rgba(4, 12, 35, 0.25);
            border: solid 4px #0f0;
            box-sizing: border-box;
            border-radius: 10px;
            border-image-slice: 20; /* border-radius*2 */
            border-image-repeat: round;
            border-image-width: 20px; /* border-radius*2 */
            border-image-source: url('~@/static/images/cat_selected.png');
            cursor: default;
            padding: 13px 0;
          }
        }
      }
    }
</style>
