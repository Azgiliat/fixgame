<template>
  <header class="header">
    <div class="container header__container">
      <nav class="header__navigation navigation">
        <router-link class="navigation__home-link" href="#" to="/">
          Главная
        </router-link>
        <router-link class="navigation__case-link" href="#" to="/case">
          Кейс от Фикса
        </router-link>
        <router-link to="/" href="#" class="navigation__logo-link">
          <svg class="navigation__logo">
            <use xlink:href="#logo"/>
          </svg>
        </router-link>
        <a class="navigation__youtube-link" href="https://www.youtube.com/channel/UCZ8fSWsoySnv1voIfi6mqwQ">
          YouTube
        </a>
        <a href="https://vk.me/fixgame_shop" class="navigation__support-link">
          Поддержка
        </a>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style lang="scss" scoped>
.header {
  .navigation {
    padding-top: 10px;
    display: flex;
    justify-content: center;

    &__logo-link {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-end;
      margin: 0 150px;
      text-decoration: none;

      @media ($laptop) {
        margin: 0;
        align-items: center;
        margin: 0 15px;
      }
    }

    &__logo {
      width: 78px;
      height: 154px;
      margin-right: 15px;

      @media ($laptop) {
        width: 39px;
        height: 78px;
      }
    }

    &__logo-text {
      margin: 0;
      font-weight: 900;
      font-size: 14px;
      line-height: 18px;
      text-align: center;
      text-transform: uppercase;
      font-family: $second-font;
      color: $main-white;
      width: 100%;
      text-align: center;
    }

    &__home-link, &__youtube-link, &__support-link, &__case-link {
      padding-top: 50px;
      text-decoration: none;
      font-weight: 600;
      font-size: 16px;
      line-height: 20px;
      color: $main-white;
    }

    &__home-link {
      margin-right: 100px;
    }

    &__support-link {
      margin-left: 100px;
    }
  }
}
@media ($mobile) {
  .header {
    .navigation {
      padding-top: 10px;
      display: flex;
      flex-direction: column;

      &__logo-link {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-end;
        margin: 0 150px;
        text-decoration: none;

        @media ($laptop) {
          margin: 0;
          align-items: flex-start;
          order: -1;
        }
      }

      &__home-link, &__youtube-link, &__support-link, &__case-link {
        padding-top: 10px;
      }

      &__home-link {
        margin-right: 0;
      }

      &__support-link {
        margin-left: 0;
      }
    }
  }
}
</style>
