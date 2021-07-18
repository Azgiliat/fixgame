<template>
    <div class="clean-container">
        <section id="roulette">
            <div class="top-back__block">
                <img :src="back" @click="goMain" alt="" class="top-back__block-img">
                <p @click="goMain" class="top-back__block-back__text">Назад</p>
                <p class="top-back__block-title">Кейс от Фиксплея</p>
            </div>
            <RouletteLine :id="tri.id" :items="items" :key="tri.id" :needItemId="tri.wonId" v-for="tri in tries"
                          v-on:swipeEnd="onEndSwipe"/>
            <div class="roulette-form">
                <img class="roulette-form__img" :src="rouletteFon" alt="">
                <div class="roulette-form__description">
                    <p class="roulette-form__description__title">Испытай свою удачу!</p>
                    <p class="roulette-form__description__text">Принцип игры "Рулетка" основан на случайном выпадении
                        игр. Мы не вмешиваемся в процесс розыгрыша, благодаря этому честность рулетки невозможно
                        нарушить.</p>
                </div>
                <div class="roulette-form__form">
                    <div class="cost-block row">
                        <div class="col-10 cost-t">Цена:</div>
                        <div class="col cost-v">{{price}} ₽</div>
                    </div>
                    <form class="users-input">
                        <div class="form-group">
                            <label for="email">Email <span class="error"
                                                           v-if="!correctEmail">Неверный E-Mail адрес</span>
                            </label>
                            <input :class="{error: !correctEmail}" id="email" placeholder="Введите Email"
                                   v-bind:disabled="formUnactive"
                                   type="email" v-model="email" v-on:input="checkEmail">
                        </div>
                        <div class="form-group">
                            <label for="promo">Купон <span class="error" v-if="!correctPromocode">Купон не действительный</span></label>
                            <input :class="{error: !correctPromocode}" id="promo" placeholder="Введите купон"
                                   v-bind:disabled="formUnactive"
                                   type="text" v-model="promocode" v-on:input="onInputCode">
                        </div>
                        <div class="form-row justify-content-between">
                            <div class="select-wrapper">
                                <select id="amount" v-bind:disabled="formUnactive" v-model="selectAmount"
                                        v-on:change="changeAmount">
                                    <option v-bind:key="index"
                                            v-bind:selected="index===0"
                                            v-for="(item, index) in amounts">
                                        {{item}}
                                    </option>
                                </select>
                            </div>
                            <div class="button-wrapper">
                                <button :class="[{unactive: (btnState === 2||btnState===3||btnState===4)}]"
                                        type="submit"
                                        v-on:click="onButtonClick">
                                    {{btnText}}
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    </div>
</template>


<script>

    import RouletteLine from "../components/UI/RouletteLine";
    import rouletteFon from '../static/images/newblock/roulette-fon.png'
    import back from '../static/images/newblock/back.svg'

    export default {
        name: 'NewBlocks',
        components: {RouletteLine},
        data: function () {
            return {
                caseId: 1,
                email: "",
                promocode: "",
                correctEmail: true,
                correctPromocode: true,
                selectAmount: 1,
                sum: 0,
                btnText: "",
                btnState: 0,
                inLoading: false,
                caseAlreadyBought: false,
                formUnactive: false,
                endSwipedCounter: 0,
                rouletteFon,
                back
            }
        },
        computed: {
            tries: function () {
                return this.$store.state.cases.casesInUse;
            },
            curCase: function () {
                return this.$store.getters.getCaseById(this.caseId);
            },
            price: function () {
                return this.curCase.price;
            },
            items: function () {
                let arr = [];
                for (let i = 0; i < this.curCase.items.length; i++) {
                    arr[i] = this.$store.state.cases.items.find(item => {
                        return item.id === this.curCase.items[i].productId
                    });
                }
                return arr;

            },
            amounts: function () {
                return [1, 2, 3, 4, 5];
            },
            buttonState: {
                get: function () {
                    return this.btnState;
                },
                set: function (val) {
                    switch (val) {
                        case 0:
                            this.btnText = "Купить за " + this.sum + " ₽";
                            break;
                        case 1:
                            this.btnText = "Рассчитать скидку";
                            break;
                        case 2:
                            this.btnText = "Идет загрузка";
                            break;
                        case 3:
                            this.btnText = "Купить за " + this.sum + " ₽";
                            break;
                        case 4:
                            this.btnText = "Серверная ошибка";
                            break;
                        case 5:
                            this.btnText = "Использовать";
                            break;
                    }
                    this.btnState = val;
                }
            },
            loading: {
                get: function () {
                    return this.inLoading;
                },
                set: function (val) {
                    if (val) {
                        this.buttonState = 2;
                        this.inLoading = val;
                    } else {
                        if (this.buttonState === 4) {
                            this.inLoading = val;
                            return;
                        }

                        if (this.isNeedUnactiveBtn())
                            this.buttonState = 3;
                        else if (this.promocode !== "")
                            this.buttonState = 1;
                        else
                            this.buttonState = 0;
                        this.inLoading = val;
                    }
                }
            },
        },
        methods: {
            goMain: function () {
                this.$router.push("/");
            },
            isNeedUnactiveBtn: function () {
                return (!this.correctEmail || this.email === "") || (!this.correctPromocode || this.promocode !== "");
            },
            checkEmail: function () {
                if (this.email === "") {
                    this.correctEmail = true;
                    this.buttonState = 3;
                    return;
                }
                // eslint-disable-next-line no-invalid-regexp,no-useless-escape
                const re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
                this.correctEmail = re.test(this.email);

                if (this.isNeedUnactiveBtn())
                    this.buttonState = 3;
                else if (this.buttonState !== 1)
                    this.buttonState = 0;
            },
            onInputCode: function () {
                if (!this.correctPromocode) {
                    this.correctPromocode = true;
                }
                if (this.promocode === "" && this.correctPromocode) {
                    if (this.isNeedUnactiveBtn())
                        this.buttonState = 3;
                    else
                        this.buttonState = 0;
                    return;
                }
                if (this.buttonState !== 1)
                    this.buttonState = 1;
            },
            onButtonClick: function (event) {
                event.preventDefault();
                if (this.buttonState === 0) {
                    this.onBuyButton();
                } else if (this.buttonState === 1) {
                    this.countSum();
                } else if (this.buttonState === 5) {
                    this.useCases();
                }
            },
            countSum: function () {
                this.loading = true;
                const vc = this;
                const player = {
                    username: "",
                    email: "",
                    empty: true
                }
                const products = {
                    productId: this.caseId,
                    amount: this.selectAmount
                }
                const coupon = this.promocode === "" ? null : this.promocode;
                this.$store.$caseapi.checkPrice(coupon, player, products).then(
                    data => {
                        this.sum = data.price
                    }).catch(error => {

                    if (error.response.status === 400) {
                        if (error.response.data.code === 13) {
                            //Promocode Error
                            this.correctPromocode = false;
                            this.buttonState = 3;
                            this.sum = this.price * this.selectAmount;
                        }
                    } else {
                        this.buttonState = 4;
                    }
                }).then(function () {
                    vc.loading = false;
                });
            },
            onBuyButton: function () {
                const player = {
                    username: "",
                    email: this.email
                }
                const products = {
                    productId: this.caseId,
                    amount: this.selectAmount
                }
                const coupon = this.promocode === "" ? null : this.promocode;
                const payData = {
                    player: player,
                    coupon: coupon,
                    products: [
                        products
                    ]
                }
                this.$store.commit("setPaymentData", payData);
                this.$store.$caseapi.tryToBuy(coupon, player, products)
                    .then(response => window.location = response)
                    .catch(err => {
                        if (err === 21) {
                            this.correctEmail = false;
                            this.buttonState = 3;
                        } else if (err === 13) {
                            this.correctPromocode = false;
                            this.buttonState = 3;
                        } else {
                            this.$router.replace("/result/fail");
                        }
                    });
            },
            changeAmount: function () {
                this.countSum();
                this.$store.commit("addTry", {count: this.selectAmount, id: this.caseId});
            },
            useCase: function (tri) {
                this.$store.commit("useCase", tri);
            },
            useCases: function () {
                this.$store.dispatch("useAllCases");
            },
            onEndSwipe() {
                this.endSwipedCounter++;

                if (this.selectAmount === this.endSwipedCounter) {
                    setTimeout(() => this.$router.push({path: "/result/success", params: {from: "case"}}), 500);
                }
            },
            initForBuy: function () {
                this.sum = this.price * this.selectAmount;
                this.buttonState = 3;
            },
            initForUse: function (tries) {
                this.selectAmount = tries > 5 ? 5 : tries;
                this.buttonState = 5;
                this.$store.commit("addTry", {count: this.selectAmount, id: this.caseId});
                this.formUnactive = true;
            }
        },
        mounted: function () {
            const vm = this;
            if (localStorage.isCaseBuy) {
                this.$store.$caseapi.checkCount(this.caseId).then(function (data) {
                  if (data.availableCount > 0)
                    vm.initForUse(data.availableCount);
                  else
                    vm.initForBuy();
                  localStorage.removeItem("isCaseBuy")
                }).catch(() => {
                  vm.buttonState = 4;
                  localStorage.removeItem("isCaseBuy")
                });
            } else
                vm.initForBuy();
        }
    }
</script>

