<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__links">
        <a href="https://www.youtube.com/channel/UCZ8fSWsoySnv1voIfi6mqwQ" class="footer__link footer__youtube-link">
          YouTube
        </a>
        <a href="https://vk.me/fixgame_shop" class="footer__link footer__support-link">
          Поддержка
        </a>
        <a href="https://vk.com/@fixgame_shop-agreement" class="footer__link footer__support-link">
          Правила возврата
        </a>
        <a href="https://vk.com/@fixgame_shop-agreement" class="footer__link footer__support-link">
          Пользовательское соглашение
        </a>
      </div>
      <p class="footer__info">
        Платформа для продажи цифровых товаров. Торговый агрегатор по оказанию услуг в сфере торговли. Все закупаемые ключи приобретаются у официальных поставщиков. Все названия продуктов, компаний и марок,
        логотипы и товарные знаки являются собственностью соответствующих владельцев.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style lang="scss" scoped>
.footer {
  margin-bottom: 25px;

  &__links {
    margin-bottom: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-around;
  }

  &__link {
    text-decoration: none;
    color: $main-white;
    font-weight: 500;
    font-size: 14px;
    line-height: 17px;
    margin-bottom: 10px;
  }

  &__info {
    max-width: 730px;
    margin: 0 auto;
    font-weight: 300;
    font-size: 12px;
    line-height: 15px;
    text-align: center;
    color: $main-white;
  }
}
</style>
