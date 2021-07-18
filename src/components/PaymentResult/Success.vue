<template>
  <div class="success">
    <svg class="success__icon">
      <use xlink:href="#logo_filled"/>
    </svg>
    <p class="success__title">
      Успех!
    </p>
    <p class="success__subtitle">
      Всё прошло отлично!
    </p>
    <Copy class="success__copy" v-for="res in results" :key="res" :text="res"/>
    <p class="success__footer">
      Данные продублированы на почту
    </p>
  </div>
</template>

<script>

import Copy from '@/components/UI/Copy'

export default {
  name: 'Success',
  components: {
    Copy
  },
  data: function () {
    return {
      resultFor: "shop"
    }
  },
  computed: {
    results: function () {
      if (this.resultFor === "shop")
        return this.$store.state.payment.purchases;
      else
        return this.$store.state.cases.wonValues;
    }
  },
  created: function () {
    if (this.$route.params.from !== undefined) {
      this.resultFor = "case";
    } else {
      if (localStorage.isCaseBuy) {
        this.$router.push('cases');
      } else {
        let account = this.$store.$shopapi.getAccountByRoute(this.$route);

        if (account !== undefined) {
          this.$store.dispatch("getPurchases", account)
          //todo протестить оплату и убрать коммент ниже
          //this.$store.commit("testSetPurchases");
        } else
          this.$router.push('/')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.success {
  width: 540px;
  padding: 30px;
  background-color: $main-white;
  border-radius: 10px;

  @media ($desktop) {
    width: 100%;
  }

  &__icon {
    width: 74px;
    height: 150px;
    fill: $good;
    margin-bottom: 25px;
    margin-right: auto;
    margin-left: auto;
    display: block;
  }

  &__title, &__subtitle, &__footer {
    text-align: center;
    width: 100%;
  }

  &__title {
    font-weight: 500;
    font-size: 28px;
    line-height: 34px;
    margin: 0 0 15px 0;
  }

  &__subtitle {
    font-size: 18px;
    line-height: 22px;
    margin: 0 0 15px 0;
  }

  &__copy {
    margin-bottom: 10px;
  }

  &__footer {
    margin: 0;
    color: rgba($main-black, 0.5);
    font-size: 14px;
    line-height: 17px;
  }
}
</style>
