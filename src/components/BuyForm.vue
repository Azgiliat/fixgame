<template>
    <div class="form-wrapper" v-on:click="closeModal">
        <div class="buy-modal container" v-on:click="cancelClick">
            <a class="closemm" v-on:click="closeModal"><img src="~@/static/images/buy_form/close.png"/></a>
            <div class="row m-cont" v-scroll-lock="true">
                <div class="text-wrapper">
                    <p class="title">{{name}}</p>
                    <p class="unavailable" v-if="!isAvailable">Нет в наличии</p>
                    <div class="desc" v-html="desc"></div>
                </div>
                <div class="col-sm-10 col-24 functions" v-bind:style="{background:backImg}">
                    <div class="row user-inputs-wrapper">
                        <div class="col-24 user-inputs align-self-start align-self-sm-end">
                            <div class="cost-block row">
                                <div class="col-10 cost-t">Цена:</div>
                                <div class="col cost-v"><span class="old">{{prePrice}}</span>{{price}} ₽</div>
                            </div>
                            <form class="users-input">
                                <div class="form-group" v-if="isGuarantees">
                                    <label>Гарантия</label>
                                    <GuaranteeBlock @guaranteeselect="changeGuarantee" v-bind:guarantees="guarantees"/>
                                </div>
                                <div class="form-group">
                                    <label for="email">Email <span class="error"
                                                                   v-if="!correctEmail">Неверный E-Mail адрес</span>
                                    </label>
                                    <input :class="{error: !correctEmail}" id="email" placeholder="Введите Email"
                                           type="email" v-model="email" v-on:input="checkEmail">
                                </div>
                                <div class="form-group">
                                    <label for="promo">Купон <span class="error" v-if="!correctPromocode">Купон не действительный</span></label>
                                    <input :class="{error: !correctPromocode}" id="promo" placeholder="Введите купон"
                                           type="text" v-model="promocode" v-on:input="onInputCode">
                                </div>
                                <div class="form-row justify-content-between">
                                    <div class="select-wrapper">
                                        <select id="amount" v-model="selectAmount" v-on:change="countSum">
                                            <option v-bind:key="index"
                                                    v-bind:selected="index===0"
                                                    v-for="(item, index) in amounts">
                                                {{item}}
                                            </option>
                                        </select>
                                    </div>
                                    <div class="button-wrapper">
                                        <button :class="[{unactive: (btnState === 2||btnState===3||btnState===4)}, colorClass]"
                                                type="submit"
                                                v-on:click="onButtonClick">
                                            {{btnText}}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import GuaranteeBlock from "./UI/GuaranteeBlock";

    export default {
        name: "BuyForm",
        components: {GuaranteeBlock},
        data: function () {
            return {
                guarantee: 0,
                item: this.$store.getters["packs/getItemsById"](this.$store.state.packs.productToBuyId)['products'],
                email: "",
                promocode: "",
                correctEmail: true,
                correctPromocode: true,
                selectAmount: 1,
                sum: 0,
                btnText: "",
                btnState: 0,
                inLoading: false,
                guarantees: ["День", "Неделя", "Месяц", "Год"],
            };
        },
        computed: {
            name: function () {
                return this.item[this.guarantee]['name'];
            },
            desc: function () {
                return this.item[this.guarantee]['description'];
            },
            prePrice: function () {
                return this.item[this.guarantee]['prePrice'];
            },
            price: function () {
                return this.item[this.guarantee]['price'];
            },
            backImg: function () {
                return "linear-gradient(225deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.85) 100%), url('" +
                    this.$store.getters["packs/getItemsById"](this.$store.state.packs.productToBuyId)['modalImg'] + "')";
            },
            amounts: function () {
                let arr = [];
                if (this.item[this.guarantee]['availableAmount'] === 0) {
                    arr.push(1);
                    return arr;
                }
                let maxAmount = this.item[this.guarantee]['availableAmount'] > 5 ? 5 : this.item[this.guarantee]['availableAmount'];
                for (let i = 1; i <= maxAmount; i++)
                    arr.push(i);
                return arr;
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
            isAvailable: function () {
                return this.item[this.guarantee]['availableAmount'] !== 0;
            },
            isGuarantees: function () {
                return this.item.length !== 1;
            },
            colorClass: function () {
                switch (this.item[0].category) {
                    case "mc":
                        return "green";
                    case "mc-ezprem":
                        return "gold";
                    case "mc-fullprem":
                        return "blue";
                    default:
                        return ""
                }
            }
        },
        methods: {
            closeModal: function () {
                this.$store.commit("packs/closeForm");
            },
            cancelClick: function (event) {
                event.stopPropagation();
            },
            isNeedUnactiveBtn: function () {
                return !this.isAvailable || (!this.correctEmail || this.email === "") || (!this.correctPromocode || this.promocode !== "");
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
            changeGuarantee: function (i) {
                this.guarantee = i;
                this.countSum();
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
                    productId: this.$store.getters["packs/getItemsById"](this.$store.state.packs.productToBuyId)['products'][this.guarantee].id,
                    amount: this.selectAmount
                }
                const coupon = this.promocode === "" ? null : this.promocode;
                this.$store.$shopapi.checkPrice(coupon, player, products).then(
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
                    productId: this.$store.getters["packs/getItemsById"](this.$store.state.packs.productToBuyId)['products'][this.guarantee].id,
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
                this.$store.$shopapi.tryToBuy(coupon, player, products)
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
            }
        },
        mounted: function () {
            this.sum = this.price * this.selectAmount;
            this.buttonState = 3;
        }
    }
</script>

<style lang="scss" scoped>
    .form-wrapper {
        position: fixed;
        background: rgba(0, 0, 0, 0.5);
        z-index: 100001;

        display: flex;
        align-items: center;
        justify-content: center;
        top: 0px;
        left: 0px;
        width: 100vw;
        height: 100vh;
        height: -webkit-fill-available;
    }
    .row {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }
    .buy-modal {
        position: relative;
        width: 100%;

        height: 100%;
        border-radius: 0;

        background: #FFFFFF;
        margin: auto auto;
        color: #000000;

        .m-cont {
            height: 100%;
        }

        a.closemm {
            position: absolute;
            width: 26px;
            height: 26px;
            right: 25px;
            top: 25px;
            z-index: 25;
            cursor: pointer;
        }

        .text-wrapper {
            padding: 30px;
            height: 50%;
            overflow: hidden;
            width: 100%;

            .title {
                font-family: Montserrat;
                font-style: normal;
                font-weight: 600;
                font-size: 32px;
                margin-top: 0;
            }

            .unavailable {
                color: red;
                font-size: 14px;
            }

            .desc {
                font-family: Montserrat;
                font-style: normal;
                font-weight: normal;
                font-size: 14px;
                max-height: 73%;
                overflow: scroll;
            }
        }

        .functions {
            background: linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0) 100%, rgba(0, 0, 0, 0.1) 100%);
            background-size: cover !important;
            height: 50%;
            overflow: hidden scroll;
            width: 100%;
            color: white;

            .row {
                height: 100%;
            }

            .user-inputs {
                margin: 0 auto 0;
                background: rgba(25, 25, 26, 0.9);
                //backdrop-filter: blur(5px);
                padding: 0 2rem;
                align-self: flex-start;
                width: 100%;

                .cost-block {
                    margin-top: 20px;
                    margin-bottom: 25px;

                    .cost-t {
                        font-family: Montserrat;
                        font-style: normal;
                        font-weight: bold;
                        font-size: 34px;
                    }

                    .cost-v {
                        font-family: Montserrat;
                        font-style: normal;
                        font-weight: bold;
                        font-size: 34px;

                        vertical-align: middle;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;

                        .old {
                            font-family: Montserrat;
                            font-style: normal;
                            font-weight: 200;
                            font-size: 24px;
                            line-height: 28px;
                            text-decoration: line-through;

                            color: #FFFFFF;
                            opacity: 0.7;

                            padding-right: 15px;
                        }
                    }
                }

                .users-input {
                    padding-bottom: 20px;

                    .form-group {
                        margin-bottom: 1rem;
                        padding-right: 5px;
                        padding-left: 5px;
                    }

                    .form-row {
                        display: flex;
                        flex-wrap: wrap;
                        justify-content: space-between;
                    }

                    .select-wrapper {
                        padding-right: 5px;
                        padding-left: 5px;
                        width: calc(calc(100% / 24) * 6);
                    }

                    .button-wrapper {
                        padding-right: 5px;
                        padding-left: 5px;
                        width: calc(calc(100% / 24) * 18);
                    }

                    label {
                        width: 100%;
                        font-size: 16px;
                        display: inline-block;
                        margin-bottom: 0.5rem;

                        .error {
                            color: red;
                            float: right;
                        }
                    }

                    input {
                        color: white;
                        width: 100%;
                        background: rgba(0, 0, 0, 0.35);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        box-sizing: border-box;
                        border-radius: 4px;
                        padding: 11px 20px;

                        font-family: Montserrat;
                        font-style: normal;
                        font-weight: normal;
                        font-size: 15px;

                        &:focus {
                            outline: none;
                        }

                        &.error {
                            border: 1px solid red;
                        }
                    }

                    select {
                        background: rgba(0, 0, 0, 0.35);
                        border: 1px solid rgba(255, 255, 255, 0.2);
                        box-sizing: border-box;
                        border-radius: 4px;

                        color: white;
                        padding: 10px;
                        width: 100%;
                        font-size: 12px;
                        height: 100%;

                        &:focus {
                            outline: none;
                        }
                    }

                    button[type="submit"] {
                        background: #FF5001;
                        border-radius: 4px;
                        width: 100%;

                        padding: 16px 0;
                        border: none;
                        font-family: Montserrat;
                        font-style: normal;
                        font-weight: 600;
                        font-size: 16px;
                        line-height: 19px;
                        color: white;
                        cursor: pointer;

                        &.unactive {
                            background: #808080 !important;
                            cursor: default;
                        }

                        &.green {
                            background: $mine;
                        }

                        &.gold {
                            background: $gold;
                        }

                        &.blue {
                            background: $premium;
                        }
                    }
                }
            }

        }
    }

    @media only screen and ($min-mobile) {
        .buy-modal {
            width: 65%;
            //min-height: 540px;
            height: auto;
            position: relative;
            border-radius: 10px;

            .text-wrapper {
                height: auto;
                width: calc(calc(100% / 24) * 13);

                .desc {
                    max-height: none;
                    overflow: visible;
                }
            }

            .functions {
                height: auto;
                overflow: visible;
                width: calc(calc(100% / 24) * 10);

                .user-inputs {
                    margin: 6rem auto 0;
                    align-self: flex-end;

                    .users-input {
                        select {
                            padding: 15px;
                            font-size: 1rem;
                        }
                    }
                }
            }
        }
    }
</style>
