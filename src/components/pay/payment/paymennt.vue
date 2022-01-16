<template>
	<div>
		<div class="select-pay-ways">
			<div class="pay-way" v-for="(payment,index) in paymentList" :key="index">
				<el-radio v-on:change="changePayType(payment.paymentType)" v-model="payType" :label="payment.paymentType">
					<img v-if="payment.paymentType == 'ALIPAY'" src="@/assets/ejoy365pc/images/pay_ali.png" alt/>
					<img v-if="payment.paymentType == 'WECHAT'" src="@/assets/ejoy365pc/images/pay_wx.png" alt/>
<!--					<img v-if="payment.paymentType == 'UNIONPAY'" src="@/assets/ejoy365pc/images/pay_paypal.jpg" alt/>-->
					<img v-if="payment.paymentType == 'UNIONPAY'" src="@/assets/ejoy365pc/images/pay_bank.png" alt/>
					<img v-if="payment.paymentType === 'ADVANCE'" src="@/assets/ejoy365pc/images/pay_advance.png" alt/>
				</el-radio>
			</div>
		</div>
		<div class="mask" v-if="payCodeShow" @touchmove.stop.prevent = "">
			<div class="wrapper">
				<div class="img">
					<img :src="payCodeImg" alt="">
					<i class="el-icon-close" @click="handelClose"></i>
				</div>
			</div>
		</div>
	</div>

</template>

<script>
    import api from '@/service/api';
    import QRCode from '@/service/qrcode';
    export default {
        name: 'order-payment',
		data() {
			return {
				payType: 'WECHAT',
                payCodeShow: false,
                timer: '',
                source: false,
                payCodeImg: ''
			};
		},
        props: {
            paymentList: {}
        },
		methods: {
            // 选择支付方式
            changePayType(type) {
                this.payType = type;
                console.log(this.payType);
            },
			// 支付关闭
            handelClose() {
               this.payCodeShow = false;
                clearInterval(this.timer);
                if (!this.source) {
                    api.to(`/order/list`);
                }
			},
            async requestPayment(paymentNo, source) {
                this.source = source;
                if (this.payType === '') {
                    api.toastError('请选择支付方式！');
                    return;
                }
                try {
					let returnUrl = `/pay/paySuccess?paymentNo=${paymentNo}`;
					let returnUrlData = '/pc/' + returnUrl;
					// 银联返回时post，需要重定向处理
					if (this.payType === 'UNIONPAY') {
						returnUrlData = '/redirect?path=' + returnUrlData;
					}
					let payData = await api.httpPost('api/pay/pay_params', {
						returnUrl: returnUrlData,
						paymentNo: paymentNo,
						payType: this.payType,
						clientType: 'PC'
					});
                    if (this.payType === 'ALIPAY') {
                        const payDiv = document.getElementById('payDiv');
                        if (payDiv) {
                            document.body.removeChild(payDiv);
                        }
                        const div = document.createElement('div');
                        div.id = 'payDiv';
                        div.innerHTML = payData.payResponseBody;
                        document.body.appendChild(div);
                        document.getElementById('payDiv').getElementsByTagName('form')[0].submit();
                    } else {
                        if (this.payType === 'WECHAT') {
                            this.qrcode(payData.payResponseBody, paymentNo);
                        }
						if (this.payType === 'ADVANCE') {
							let payData = await api.httpGet('api/pay/detail', {
								paymentNo: paymentNo
							});
							if (payData.payStatus === 'PAYED') {
								clearInterval(this.timer);
								api.to(`/pay/paySuccess?paymentNo=${paymentNo}`);
							}
						}
                        if (this.payType === 'UNIONPAY') {
                            document.write(payData.payResponseBody);
                        }
                    }
                } catch (e) {
                    api.messageError(e.message);
                    if (!source) {
                        setTimeout(function () {
                            api.to(`/order/list`);
                        }, 1000);
                    }
                }
            },
            async getPayStatus(paymentNo) {
              let payData = await api.httpGet('api/pay/detail', {
                    paymentNo: paymentNo
                });
                if (payData.payStatus === 'PAYED') {
                    clearInterval(this.timer);
                    api.to(`/pay/paySuccess?paymentNo=${paymentNo}`);
                }
			},
             qrcode (str, paymentNo) {
                var that = this;
                this.payCodeImg = QRCode.createQrCodeImg(str, {
                    size: parseInt(400),
                    errorCorrectLevel: 'L',
                    typeNumber: 4
                });
                this.payCodeShow = true;
                this.timer = setInterval(function () {
                     that.getPayStatus(paymentNo);
                }, 1000);
            }
		}
	};
</script>

<style lang='scss'>
	.select-pay-ways {
		display: flex;
		padding: 10px;
		border: 1px solid rgba(215, 215, 215, 1);
		.pay-way {
			.el-radio {
				margin-right: 20px;
			}
			img {
				width: 130px;
				height: 40px;
			}
		}
	}
	.mask{
		position:fixed;
		top:0;
		left:0;
		right:0;
		bottom:0;
		z-index:999;
		background:rgba(0,0,0,.6);
		.wrapper{
			position:absolute;
			top:50%;
			left:50%;
			transform:translate(-50%,-50%);
			display: flex;
			flex-direction: column;
			align-items:center;
			.img{
				width:630px;
				height:350px;
				background-color: #fff;
				display:flex;
				flex-direction:column;
				align-items:center;
				background: url("~@/assets/ejoy365pc/images/window-wx.jpg") no-repeat;
				background-size: 100% 100%;
				img{
					position: absolute;
					left: 62px;
					top: 100px;
					width:180px;
					height:180px;
				}
				.el-icon-close{
					position: absolute;
					right: 10px;
					top: 10px;
					font-size: 30px;
				}
				.info{
					margin-top:40px;
				}
			}
		}

	}
</style>
