<template>
  <div class="buy-form">
    <div class="buy-form__description description">
      <p class="description__title">
        {{ info.name }}
      </p>
      <p class="description__introduction buy-form__text">
        Приобретая данный товар Вы моментально получаете лицензионный аккаунт Minecraft.
      </p>
      <p class="buy-form__text description__points">
        - {{ info.description }}
      </p>
      <!--      <ul class="description__points">-->
      <!--        <li class="description__point" v-for="point in info.description" :key="point">-->
      <!--          <p class="description__point-text buy-form__text">-->
      <!--            - {{point}}-->
      <!--          </p>-->
      <!--        </li>-->
      <!--      </ul>-->
    </div>
    <form :style="{backgroundImage: 'url()'}" @submit="buy" class="buy-form__form form"
          event="none">
      <p class="form__title">
        Цена: <span class="form__price">{{ Math.round(info.price * 1.4) }} ₽</span><span
              class="form__real-price">{{ info.price }} ₽</span>
      </p>
      <AppInput :placeholder="'Введите Email'" :required="true" :type="'email'" :value.sync="email"
                class="form__input"/>
      <p class="buy-form__text form__after-buy-text">
        После оплаты, данные аккаунта придут вам на почту
      </p>
      <PackButton :price="info.price" :type="type" class="form__pack-button"/>
    </form>
    <button @click="closeForm" class="buy-form__close" type="button"/>
  </div>
</template>

<script>
  import {mapState, mapActions, mapMutations} from 'vuex'
  import AppInput from '@/components/UI/AppInput'
  import PackButton from '@/components/Pack/PackButton'

  export default {
    name: 'BuyForm',
    props: {
      type: {
        type: String,
        require: true
      }
    },
    components: {
      PackButton,
      AppInput
    },
    computed: {
      ...mapState('buy', {
        info: 'currentAccountToBuy'
      })
    },
    methods: {
      ...mapActions('buy', {
        tryToBuy: 'tryToBuy'
      }),
      ...mapMutations('buy', {
        setEmail: 'setEmail',
        closeForm: 'closeForm'
      }),
      buy(evt) {
        evt.preventDefault()
        this.setEmail(this.email)
        this.tryToBuy()
                .then(res => {
                  window.open(res.link)
                })
                .catch(() => {
                  this.$router.push('result/fail')
                })
      }
    },
    data() {
      return {
        email: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  .buy-form {
    z-index: 10;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);
    display: flex;
    width: 920px;
    border-radius: 10px;
    background-color: $main-white;

    @media ($desktop) {
      width: 77%;
      position: fixed;
    }

    @media ($laptop) {
      flex-direction: column;
      width: 77%;
      position: fixed;
    }

    &__text {
      margin: 0;
      font-family: $main-font;
      font-size: 14px;
      line-height: 18px;
    }

    .description {
      width: 59%;
      padding: 30px;

      @media ($laptop) {
        width: 100%;
      }

      &__title {
        font-weight: 700;
        font-size: 36px;
        line-height: 44px;
        color: $main-black;
        text-align: center;
        margin: 0 0 30px;

        @media ($laptop) {
          text-align: center;
        }
      }

      &__introduction {
        margin: 0 0 30px 0;
      }

      &__points {
        list-style: none;
        margin: 0;
        padding: 0;
      }
    }

    .form {
      border-radius: 0 10px 10px 0;
      overflow: hidden;
      padding: 30px;
      min-height: 440px;
      flex-grow: 1;
      background-repeat: no-repeat;
      background-size: cover;
      display: flex;
      flex-direction: column;

      @media ($desktop) {
        border-radius: 0 0 10px 10px;
        min-height: auto;
      }

      &__title {
        font-weight: bold;
        font-size: 34px;
        line-height: 41px;
        color: $main-white;
        margin: 0 0 30px 0;
        display: flex;
        align-items: center;
      }

      &__price {
        margin-left: auto;
        margin-right: 10px;
        font-weight: 600;
        font-size: 22px;
        line-height: 27px;
        text-decoration: line-through;
        color: rgba($main-white, 0.5)
      }

      &__pack-button {
        margin-top: auto;

        @media ($desktop) {
          margin-top: 45px;
        }
      }

      &__after-buy-text {
        color: $main-white;
        margin-top: 10px;
        padding-right: 10%;
      }
    }

    &__close {
      position: absolute;
      border: none;
      outline: none;
      width: 24px;
      height: 24px;
      background-color: transparent;
      top: -70px;
      right: -70px;
      padding: 0;

      @media ($laptop) {
        top: -25px;
        right: -20px;
      }

      &::before, &::after {
        position: absolute;
        top: calc(50% - 1px);
        left: 0;
        display: block;
        content: '';
        border-radius: 1px;
        width: 31px;
        height: 2px;
        background-color: $main-white;
        z-index: 200;
      }

      &::before {
        transform: rotate(45deg);
      }

      &::after {
        transform: rotate(-45deg);
      }

      &:hover {
        cursor: pointer;
      }
    }
  }
</style>
