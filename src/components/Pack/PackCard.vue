<template>
  <div class="pack-card">
    <div class="pack-card__background"
         :style="{backgroundImage: `url('${require(`st/images/pack/${type}_back.png`)}'), ${backGradient}`}">
      <img class="pack-card__image" :src="require(`st/images/pack/${type}.png`)"/>
      <div class="pack-card__info info">
        <p class="info__name">
          {{ info.name }}
        </p>
        <div class="info__buy-block">
          <p class="info__price">{{info.price}} ₽<span class="info__full-price">{{ Math.round(info.price * 1.4) }} ₽</span></p>
          <SimpleButton @click="$emit('buyPack', type)">
            Купить
          </SimpleButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SimpleButton from '@/components/UI/SimpleButton'
import { mineGradient, goldGradient, premiumGradient } from '@/assets/css/vars.scss'

export default {
  name: 'PackCard',
  props: {
    // type: {
    //   type: String,
    //   require: false,
    //   default: 'mine'
    // },
    info: {
      type: Object,
      require: false,
      default: () => ({
        name: 'Minecraft'
      })
    }
  },
  components: {
    SimpleButton
  },
  computed: {
    backGradient () {
      switch (this.type) {
        case 'mine':
          return mineGradient
        case 'gold':
          return goldGradient
        case 'premium':
          return premiumGradient
        default:
          return mineGradient
      }
    },
    type() {
      switch (this.info.id) {
        case 1:
          return 'mine'
        case 2:
          return 'premium'
        case 3:
          return 'gold'
        default:
          return 'mine'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.pack-card {
  width: 350px;
  padding-top: 35px;

  @media ($laptop) {
    width: 100%;
    max-width: 350px;
  }

  &__background {
    height: 250px;
    position: relative;
    border-radius: 10px;
    background-size: cover;
    background-repeat: no-repeat;
    display: flex;
    flex-direction: column;

    &::before {
      border-radius: 10px;
      content: '';
      position: absolute;
      z-index: -1;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: $mine-gradient;
    }
  }

  &__image {
    display: block;
    position: absolute;
    top: -35px;
    left: 50%;
    transform: translateX(-50%);

    @media ($laptop) {
      top: -45px;
      transform: translateX(-50%) scale(0.8);
    }
  }

  &__info {
    margin-top: auto;
  }

  .info {
    border-radius: 10px;
    position: relative;
    z-index: 2;
    padding: 15px;
    background-color: rgba(255, 255, 255, .8);
    @supports (backdrop-filter: blur(50px)) {
      background-color: rgba(255, 255, 255, .15);
      -webkit-backdrop-filter: blur(50px);
      backdrop-filter: blur(50px);
    }

    &__name {
      margin: 0 0 15px 0;
      font-weight: bold;
      font-size: 28px;
      line-height: 34px;
      text-align: center;
      color: $main-white;
      text-shadow: 0px 0px 4px rgba(0, 0, 0, 0.25);
    }

    &__buy-block {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    &__price {
      color: $main-white;
      font-weight: bold;
      font-size: 28px;
      line-height: 34px;
      display: flex;
      align-items: center;
      margin: 0;
    }

    &__full-price {
      margin-left: 10px;
      font-weight: 600;
      font-size: 22px;
      line-height: 27px;
      text-decoration-line: line-through;
      color: rgba($main-white, 0.7)
    }
  }
}
</style>
