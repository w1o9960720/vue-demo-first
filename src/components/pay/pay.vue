<template>
    <div class="checkout-contains">
        <el-steps :active="2" finish-status="success">
            <el-step title="1.我的购物车"></el-step>
            <el-step title="2.填写核对订单信息"></el-step>
            <el-step title="3.成功提交订单"></el-step>
        </el-steps>
        <div class="check-title">收货信息</div>
        <div class="address-list">
            <div v-for="(item,i) in addressList" :key="i" class="address-item-wrap">
                <div v-on:click="changAddressSelect(item.id)" v-if="hidePart||i<4" class="address-item"
                     :class="{'active':item.id===addressId}">
                    <div class="item-top">
                        <span>{{item.name}} ({{item.receiverState}}{{item.receiverCity}}{{item.receiverDistrict}})</span>
                    </div>
                    <div class="item-address">
                        <span>{{item.receiverAddress}}</span>
                    </div>
                    <div class="item-tel">
                        <span>{{item.mobile}}</span>
                    </div>
                    <div class="sign-tag" v-if="item.id===addressId"><i class="el-icon-check"></i></div>
                    <div class="edit-tag" v-if="item.id===addressId">
                        <i @click="editAddress(item)">编辑</i>
                    </div>
                    <div class="delete-tag" v-if="item.id===addressId">
                        <i @click="deleteAddressClick(item.id)">删除</i>
                    </div>
                </div>
            </div>
        </div>
        <div class="item-option">
            <div v-if="addressList.length > 4" @click="handleHide"><span v-if="hidePart">收起</span> <span v-else>展开</span></div>
            <div @click="addAddresss">新增收货地址</div>
        </div>
        <div v-if="crossType != 'DUTY_PAID'">
            <div class="check-title">
                实名认证
                  <span>  因易捷国际商品涉及入境清关，需要您完善身份证信息，并保证订购人（下单人），付款人（支付账户所有人），收件人三者身份信息一致，易捷国际会严格保密您的个人信息</span>
            </div>
            <div class="item-auth" v-on:click="navToCertificationPage">
                <span v-if="authInfo">已完成实名认证：</span>
                <span v-else>前往实名认证</span>
                <span class="auth-real-name">{{certificationRealName}}</span>
                <span class="el-icon-arrow-right"></span>
            </div>
        </div>
        <!-- 支付方式 -->
        <div class="check-title">选择支付方式</div>
        <payment ref="orderPayment" :paymentList="paymentList"></payment>
        <div class="check-title">商品信息</div>
        <div class="cart-sec" v-for="(branch, index) in orderSummary.salesOrders" :key="index">
            <!--<div v-if="branch.serviceBranchName">
                {{branch.serviceBranchName}}
            </div>
            <div v-else>
                {{branch.salesBranchName}}
            </div>-->
            <el-table
                    ref="multipleTable"
                    :data="branch.lines"
                    :cell-style="{padding:'10px 0'}"
                    tooltip-effect="dark"
                    style="width: 100%"
            >
                <el-table-column label="商品信息" width="400">
                    <template slot-scope="scope">
                        <div class="shop-item" v-on:click="navToDetailPage(scope.row)">
                            <div class="img-box">
                                <img v-if="scope.row.thumbnail" :src="scope.row.thumbnail"/>
                                <img v-else src="@/assets/ejoy365pc/images/default.jpg"/>
                                <div  class="red-sign" v-if="scope.row.activityTypeName">
                                    {{scope.row.activityTypeName}}
                                </div>
                            </div>
                            <div class="item-info">
                                <p class="goods-name">{{ scope.row.itemName }}</p>
                                <p>{{scope.row.skuSpec}}</p>
                            </div>
                        </div>
                    </template>
                </el-table-column>

                <el-table-column label="单价" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div class="unit-price">
                            <div><span>{{scope.row.salePrice | money}}</span></div>
                            <div v-if="scope.row.salePrice < scope.row.price"><span><del>{{scope.row.price | money}}</del></span></div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column prop="qty" label="数量"></el-table-column>
                <el-table-column label="商品金额" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <div v-if="scope.row.salePrice < scope.row.price">{{scope.row.lineTotal | money}}<div><del>{{scope.row.lineTotal + scope.row.lineDiscountTotal | money}}</del></div></div>
                        <div v-else>{{scope.row.lineTotal + scope.row.lineDiscountTotal | money}}</div>
                    </template>
                </el-table-column>
<!--                <el-table-column label="优惠后金额" show-overflow-tooltip>-->
<!--                    <template slot-scope="scope">-->
<!--                        {{scope.row.lineTotal | money}}-->
<!--                    </template>-->
<!--                </el-table-column>-->
            </el-table>
        </div>
        <!-- 结算信息 -->
        <div class="checkout-info">
            <div class="checkout-info-left">
                <el-row>
                    <span>订单优惠</span>
                    <el-select class="about-discounts" v-on:change="onActivity" v-model="activityId" placeholder="请选择优惠订单">
                        <el-option
                                v-for="(promotion,index) in promotionActivities"
                                :key="index"
                                :label="promotion.activityName"
                                :value="promotion.activityId">
                        </el-option>
                    </el-select>
                </el-row>
                <el-row>
                    <span class="about-span">优惠券</span>
                    <el-select class="about-discounts" v-on:change="loadData" v-model="couponId" placeholder="请选择优惠券" >
                        <el-option
                                v-for="(coupon,index) in promotionCoupons"
                                :key="index"
                                :label="coupon.couponName"
                                :value="coupon.couponMemberId">
                        </el-option>
                    </el-select>
                </el-row>
<!--                移除积分-->
<!--                <el-row class="score">-->
<!--                    <span>积分折扣</span>-->
<!--                    <el-input v-model="point" placeholder="请输入兑换积分"></el-input>-->
<!--                    &lt;!&ndash;<span>已抵扣0.99元</span>&ndash;&gt;-->
<!--                </el-row>-->
                <!--<el-row>
                    <span>已包邮</span>
                </el-row>-->
            </div>
            <div class="checkout-info-right">
                <el-row>
                    <el-col>
                        <span>商品总计</span>
                        <span>{{orderSummary.itemTotal | yuan}}</span>
                    </el-col>
                    <el-col>
                        <span>商品优惠总计</span>
                        <span>- {{orderSummary.itemDiscountTotal >=0 ? orderSummary.itemDiscountTotal : 0 | yuan}}</span>
                    </el-col>
                    <el-col>
                        <span>订单优惠总计</span>
                        <span>- {{orderSummary.discountTotal >= 0 ? orderSummary.discountTotal : 0 | yuan}}</span>
                    </el-col>
<!--                    <el-col>-->
<!--                        <span>积分抵扣</span>-->
<!--                        <span>- 0.00</span>-->
<!--                    </el-col>-->
                    <el-col>
                        <span>税费</span>
                        <span>+ {{orderSummary.taxTotal | yuan}}</span>
                    </el-col>
                    <el-col>
                        <span>运费</span>
                        <span>+ {{orderSummary.feeTotal | yuan}}</span>
                    </el-col>
                    <el-col>
                        <span>消费可获积分</span>
                        <span>{{orderSummary.point|| 0}}点</span>
                    </el-col>
                    <el-col>
                        <span>{{orderSummary.itemQtyTotal}}</span>
                        <span>件商品</span>
                        <span>应付金额</span>
                        <span>{{orderSummary.orderTotal | yuan}}</span>
                    </el-col>
                </el-row>
            </div>
        </div>
        <div class="checkout-info-bottom">
            <div>订单备注：</div>
            <el-input
                    type="textarea"
                    autosize
                    placeholder="请在此填写您对该订单的特殊要求或说明，最多100字"
                    maxlength="100"
                    v-model="desc"
            ></el-input>
        </div>
        <div class="checkout-btn">
            <el-button v-if="payStatus==1" type="info" disabled>提交订单</el-button>
            <button class="submit" v-on:click="orderCheck" v-else>提交订单</button>
        </div>
        <!-- 新增弹出框 -->
        <div class="pop-content " v-if="editAddressStatus">
            <div class="mask-box"></div>
            <div class="addaddr-wrapper" >
                <p class="tit">新增收货地址<i @click="closeAddress" class="choice">×</i></p>
                <el-form :rules="ruleForm" :model="addressInfo" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-row :gutter="20" type="flex" align="middle" class="info">
                        <el-col :span="4">
                            <p class="star">收货人</p>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item prop="name">
                                <el-input v-model="addressInfo.name"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" type="flex" align="middle" class="info">
                        <el-col :span="4">
                            <p class="star">所在地区</p>
                        </el-col>
                        <el-col :span="18">
                            <div class="divwrap">
                                <el-select v-model="addressInfo.receiverState" filterable
                                           placeholder="请选择省/地区"
                                           @change="clearCitySelected" style="width:30%">
                                    <el-option
                                            v-for="item in provinces"
                                            :key="item.id"
                                            :label="item.areaName"
                                            :value="item.areaName">
                                    </el-option>
                                </el-select>
                                <el-select v-model="addressInfo.receiverCity" filterable placeholder="请选择城市"
                                           @focus="loadCities" @change="clearDistrictSelected"
                                           style="width:30%">
                                    <el-option
                                            v-for="item in cities"
                                            :key="item.id"
                                            :label="item.areaName"
                                            :value="item.areaName">
                                    </el-option>
                                </el-select>
                                <el-select v-model="addressInfo.receiverDistrict"
                                           filterable placeholder="请选择区/县" @focus="loadDistricts"
                                           @change="fillDistrictName" style="width:30%">
                                    <el-option
                                            v-for="item in districts"
                                            :key="item.id"
                                            :label="item.areaName"
                                            :value="item.areaName">
                                    </el-option>
                                </el-select>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" type="flex" align="middle" class="info">
                        <el-col :span="4">
                            <p class="star">详细地址</p>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item prop="receiverAddress">
                                <el-input v-model="addressInfo.receiverAddress"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" type="flex" align="middle" class="info">
                        <el-col :span="4">
                            <p class="star">收货电话</p>
                        </el-col>
                        <el-col :span="16">
                            <el-form-item prop="mobile">
                                <el-input
                                        type="phone"
                                        v-model="addressInfo.mobile"
                                        autocomplete="off"
                                        placeholder="请输入手机号码"
                                        maxlength="11"
                                ></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" type="flex" align="middle" class="info">
                        <el-col :span="4">
                            <el-checkbox :checked="addressInfo.isDefault" v-on:change="setDefaultAddress">
                                设为默认地址
                            </el-checkbox>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20" type="flex" justify="center" class="addr-bottom">
                        <el-col :span="5" type="flex" align="middle">
                            <div class="commit choice" @click="onSaveAddress">提交</div>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    import api from '@/service/api';
    import payment from './pay/payment';
    import validate from '../auth/validate';

    export default {
        name: 'address-list',
        components: {
            payment
        },
        data() {
            let validatePhone = (rule, value, callback) => {
                validate.validatePhone(rule, value, callback);
            };
            return {
                certificationShow: true,
                certificationDirectMaiShow: true,
                payStatus: 0,
                shopCartId: 0,
                addressId: 0,
                certificationId: 0,
                activityId: '',
                couponId: '',
                desc: '',
                editAddressStatus: false,
                hidePart: false,
                paymentList: [],
                radio: '1',
                point: 0,
                crossType: 'DUTY_PAID',
                certification: {},
                md5CartInfo: '',
                orderSummary: [],
                promotionCoupons: [],
                promotionActivities: [],
                addressList: [],
                addressInfo: {},
                authInfo: false,
                certificationRealName: '',
                provinces: [],
                cities: [],
                districts: [],
                ruleForm: { // 密码登录验证方法
                    name: [{ required: true, message: '请输入收货人', trigger: 'blur' }],
                    receiverAddress: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
                    mobile: [{ validator: validatePhone, trigger: 'blur' }]
                },
                selectAddresss: null
            };
        },
        created() {
            if (api.getUser() == null) {
                api.messageError('请先登录!', 1000);
                setTimeout(function () {
                    api.to('/login');
                }, 1000);
                return;
            }
            let params = this.$route.query;
            if (params.addressId) {
                this.addressId = parseInt(params.addressId);
            }
            if (params.shopCartId) {
                this.shopCartId = parseInt(params.shopCartId);
            }
            if (params.certificationId) {
                this.certificationId = parseInt(params.certificationId);
            }
            this.loadData();
        },
        computed: {},
        methods: {
            onActivity() {
                this.couponId = '';
                this.loadData();
            },
            // 请求数据
            async loadData() {
                try {
                    let orderDetail = await api.httpPost('api/order/checkout', {
                        shopCartId: this.shopCartId,
                        addressId: this.addressId,
                        certificationId: this.certificationId,
                        md5CartInfo: this.md5CartInfo,
                        activityId: this.activityId === '' ? 0 : this.activityId,
                        couponId: this.couponId === '' ? 0 : this.couponId,
                        remark: this.desc
                    });
                    this.crossType = orderDetail.orderInfo.crossType;
                    this.md5CartInfo = orderDetail.md5CartInfo;
                    this.checkCertification(orderDetail);
                    this.selectAddresss = orderDetail.address;
                    this.addressList = orderDetail.memberAddressList;
                    this.paymentList = orderDetail.paymentList;
                    // 隐藏支付宝支付
                    let arrIndex = -1;
                    this.paymentList.find((o, i) => {
                        if (o.paymentType === 'ALIPAY') {
                          arrIndex = i;
                        }
                      });
                    if (arrIndex !== -1) {
                      this.paymentList.splice(arrIndex, 1);
                    }
                    // 将默认地址放在第一位
                    let index = this.addressList.findIndex(address => address.isDefault === true);
                    if (index >= 0) {
                        this.addressId = this.selectAddresss.id;
                        let data = this.addressList[0];
                        this.addressList[0] = this.addressList[index];
                        this.addressList[index] = data;
                    }
                    this.orderSummary = orderDetail.orderInfo;
                    this.promotionActivities = orderDetail.orderInfo.promotionActivities;
                    this.promotionCoupons = orderDetail.orderInfo.promotionCoupons;
                    // 获取默认优惠
                    if (orderDetail.orderInfo.promotionActivities && orderDetail.orderInfo.promotionActivities.length > 0) {
                        let noUsePromotion = {
                            'activityId': -1,
                            'isDefault': false,
                            'activityName': '不使用优惠'
                        };
                        orderDetail.orderInfo.promotionActivities.unshift(noUsePromotion);
                        for (let i = 0; i < orderDetail.orderInfo.promotionActivities.length; i++) {
                            if (orderDetail.orderInfo.promotionActivities[i].isDefault) {
                                this.activityId = orderDetail.orderInfo.promotionActivities[i].activityId;
                                break;
                            }
                        }
                    }
                    if (orderDetail.orderInfo.promotionCoupons && orderDetail.orderInfo.promotionCoupons.length > 0) {
                        let noUseCoupon = {
                            'couponMemberId': -1,
                            'defaultCoupon': false,
                            'couponId': -1,
                            'couponName': '不使用优惠券'
                        };
                        orderDetail.orderInfo.promotionCoupons.unshift(noUseCoupon);
                        if (this.couponId === -1) {
                            return;
                        }
                        for (let i = 0; i < orderDetail.orderInfo.promotionCoupons.length; i++) {
                            if (orderDetail.orderInfo.promotionCoupons[i].defaultCoupon) {
                                this.couponId = orderDetail.orderInfo.promotionCoupons[i].couponMemberId;
                                break;
                            }
                        }
                    }
                } catch (e) {
                    this.orderSummary = {};
                    this.addressData = {};
                    api.messageError(e.message, 500);
                    if (e.message === '购物车数据为空' || e.message === 'Shopping cart data is empty') {
                        setTimeout(function () {
                            api.to(`/cart`);
                        }, 1000);
                    }
                }
            },
            navToCertificationPage () {
                // 按钮点击-易观数据埋点
                let eventInfo = {
                  '$title': '订单结算页',
                  'btn_name': '确定实名认证'
                };
                api.ygTrackEvent('btn_click', eventInfo);

                let shopCartId = this.shopCartId;
                let addressId = this.addressId;
                let url = '/user/certification?source=1';
                if (shopCartId > 0) {
                    url += `&shopCartId=${shopCartId}`;
                }
                if (addressId > 0) {
                    url += `&addressId=${addressId}`;
                }
                url += `&crossType=${this.crossType}`;
                api.to(url);
            },
            checkCertification(orderDetail) {
                if (orderDetail.certification == null) {
                    if (orderDetail.orderInfo.crossType !== 'DUTY_PAID') {
                        this.crossTip();
                    }
                    return;
                }
                this.certificationId = orderDetail.certification.id;
                this.certification = orderDetail.certification;

                if (this.certification && (this.certification.certificationStatus === 'SUCCESS' || this.certification.certificationStatus === 'INAUTHORIZATION')) {
                    if (this.certification && this.certification.realName && this.certification.idNumber) {
                        if (orderDetail.orderInfo.crossType === 'DIRECT_MAIL' || orderDetail.orderInfo.crossType === 'BONDED') {
                            this.authInfo = true;
                            this.certificationRealName = this.certification.realName;
                            if ((!this.certification.backPhotoFileResourceId || !this.certification.facePhotoFileResourceId) &&
                                orderDetail.orderInfo.crossType === 'DIRECT_MAIL') {
                                this.crossDirectMailTip();
                            }
                        }
                    } else {
                        this.crossTip();
                    }
                }
            },
            userCoupon(couponId) {
                this.couponId = couponId;
            },
            userPromotion(activityId) {
                this.activityId = activityId;
            },
            handleHide() {
                this.hidePart = !this.hidePart;
            },
            navToDetailPage (item) {
                let id = item.itemId;
                api.to(`/goods/details?id=${id}`);
            },
            closeAddress() {
                this.editAddressStatus = false;
            },
            async loadProvinces() {
                this.provinces = await api.httpPost('api/area/province');
            },
            async loadCities() {
                this.cities = await api.httpPost(
                    'api/area/city_by_name?stateName=' + this.addressInfo.receiverState);
            },
            async loadDistricts() {
                this.districts = await api.httpPost(
                    'api/area/district_by_name?cityName=' + this.addressInfo.receiverCity);
            },
            clearCitySelected() {
                this.addressInfo.receiverCity = '';
                this.clearDistrictSelected();
            },
            clearDistrictSelected() {
                this.addressInfo.receiverDistrictId = '';
                this.addressInfo.receiverDistrict = '';
            },
            fillDistrictName(value) {
                let list = this.districts;
                for (let i in list) {
                    if (list[i].areaName === value) {
                        this.addressInfo.receiverDistrictId = list[i].id;
                    }
                }
                this.addressInfo.receiverStreet = '';
            },
            async onSaveAddress() {
                let data = this.addressInfo;
                if (!this.addressInfo.name) {
                    api.messageError('请填写收货人');
                    return;
                }
                let nameMatchedLen = api.checkNickName(this.addressInfo.name);
                if (nameMatchedLen !== this.addressInfo.name.length || nameMatchedLen < 1 || nameMatchedLen > 12) {
                    api.messageError('收货人仅支持1-12个字符，可由中英文、数字、“-”、“_”构成。');
                    return;
                }
                if (!this.addressInfo.receiverState || !this.addressInfo.receiverCity || !this.addressInfo.receiverDistrict) {
                    api.messageError('请选择所在地区');
                    return;
                }
                if (!this.addressInfo.mobile) {
                    api.messageError('请填写收货电话');
                    return;
                }
                let regex = /^1[3-9][0-9]{9}$/;
                if (!regex.test(this.addressInfo.mobile)) {
                    api.messageError('手机号格式错误');
                    return;
                }
                if (api.checkFullWhitespace(this.addressInfo.receiverAddress)) {
                    api.messageError('请输入详细地址');
                    return;
                }
                let addressMatchedLen = api.checkAddress(this.addressInfo.receiverAddress);
                if (addressMatchedLen !== this.addressInfo.receiverAddress.length || addressMatchedLen < 1 || addressMatchedLen > 50) {
                    api.messageError('收货地址包含非法字符，或长度不符合要求1到50位。');
                    return;
                }
                let result = await api.httpPost('/api/member/save_address', data);
                if (result) {
                    this.addressId = result.id;
                    api.toast('保存成功');
                    this.editAddressStatus = false;
                    await this.loadAddresses();
                } else {
                    api.messageError('保存失败');
                }
            },
            changAddressSelect(addressId) {
                this.addressId = addressId;
            },
            setDefaultAddress(data) {
                this.addressInfo.isDefault = data;
            },
            async loadAddresses() {
                let addresses = await api.httpGet('/api/member/search_address');
                if (addresses.length >= 0) {
                    this.addressList = addresses;
                }
            },
            addAddresss() {
                this.addressInfo = {
                    id: '',
                    name: '',
                    receiverState: '',
                    receiverCity: '',
                    receiverDistrict: '',
                    receiverStreet: '',
                    receiverAddress: '',
                    mobile: '',
                    isDefault: false
                };
                this.editAddressStatus = true;
                this.loadAddresses();
                this.loadProvinces();
            },
            crossTip() {
                if (!this.certificationShow) {
                    return false;
                }
                // 实名验证框只展示一次f
                this.certificationShow = false;
                this.$confirm('订单包含跨境商品，入境清关需要实名认证', '您还没有完成实名认证', {
                    confirmButtonText: '立即前往',
                    cancelButtonText: '稍后实名',
                    type: 'warning',
                    center: true
                }).then(() => {
                    this.navToCertificationPage();
                });
            },
            crossDirectMailTip() {
                if (!this.certificationDirectMaiShow) {
                    return false;
                }
                // 实名验证框只展示一次
                this.certificationDirectMaiShow = false;
                this.$confirm('直邮商品需要上传身份证照片', '您还没有完善实名认证', {
                    confirmButtonText: '立即前往',
                    cancelButtonText: '稍后上传',
                    type: 'info',
                    center: true
                }).then(() => {
                    this.navToCertificationPage();
                });
            },
            async orderCheck() {
                // 按钮点击-易观数据埋点
                let eventInfo = {
                  '$title': '订单结算页',
                  'btn_name': '提交订单'
                };
                api.ygTrackEvent('btn_click', eventInfo);

                if (this.payStatus === 0) {
                    this.payStatus = 1;
                } else {
                    this.payStatus = 0;
                    return false;
                }
                if (this.addressId <= 0) {
                    this.payStatus = 0;
                    api.messageError('请先选择收货地址再支付');
                    return false;
                }
                if (this.crossType > 0 && !this.authInfo) {
                    this.$confirm('订单包含跨境商品，入境清关需要实名认证', '您还没有完成实名认证', {
                        confirmButtonText: '立即前往',
                        cancelButtonText: '稍后实名',
                        type: 'warning',
                        center: true
                    }).then(() => {
                        this.navToCertificationPage();
                    }).catch(() => {
                        this.submit();
                    });
                    return;
                }
                this.submit();
            },
            async submit() {
              // 获取站外引流
              let drainageOffsite = api.retrieveDrainageData();
              try {
                  let clientType = 'PC';
                  let orderPort = 'PC';
                    let payment = await api.httpPost('api/order/create', {
                        shopCartId: this.shopCartId,
                        addressId: this.addressId,
                        certificationId: this.certificationId,
                        md5CartInfo: this.md5CartInfo,
                        activityId: !this.activityId || this.activityId === '' || this.activityId === 0 ? -1 : this.activityId,
                        couponId: !this.couponId || this.couponId === '' || this.couponId === 0 ? -1 : this.couponId,
                        clientType: clientType,
                        orderPort: orderPort,
                        remark: this.desc,
                        drainageBaseId: !drainageOffsite ? null : drainageOffsite.code,
                        drainageType: !drainageOffsite ? null : drainageOffsite.type
                    });
                    if (payment.paymentNo) {
                        // 更新购物车角标数量
                        let cartNum = await api.httpGet('/api/cart/count');
                        this.$store.state.cartNum = parseInt(cartNum);
                        api.setCartNum(parseInt(cartNum));
                    }
                    // 如果已支付直接跳转支付成功页面
                    if (payment.paymentStatus === 'PAYED') {
                        api.to(`/pay/paySuccess?paymentNo=` + payment.paymentNo);
                        return;
                    }
                    // 调取组件支付函数
                    this.$refs.orderPayment.requestPayment(payment.paymentNo);
                } catch (e) {
                    this.payStatus = 0;
                    api.messageError(e.message);
                } finally {
                  if (drainageOffsite && drainageOffsite.type === 'offsite') {
                    api.updateDrainageOffsite(drainageOffsite.type);
                  }
                }
            },
            editAddress(addressItem) {
                this.addressInfo = addressItem;
                this.editAddressStatus = true;
                this.loadAddresses();
                this.loadProvinces();
            },
            async deleteAddress(id) {
               try {
                   let res = await api.httpPost('/api/member/delete_address-' + id, {
                       id: id
                   });
                   if (res) {
                       api.toast('删除成功');
                       // 防止已删除地址ID传入后续提交
                       this.addressId = 0;
                       await this.loadAddresses();
                   } else {
                       api.messageError('删除失败');
                   }
               } catch (e) {
                   api.messageError('删除失败');
                   console.error(e);
               }
            },
            deleteAddressClick(id) {
                this.$confirm('此操作将删除该地址, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(async () => {
                   await this.deleteAddress(id);
                }).catch(() => {
                    api.toast('已取消');
                });
            }
        }
    };
</script>

<style lang="scss">
    .checkout-contains {
        width: 1210px;
        margin: 0 auto;
        .el-steps {
            padding: 10px 0;
        }
        .check-title {
            font-size: 20px;
            font-weight: bold;
            padding: 20px;
            background: rgba(242, 242, 242, 0.6);
            margin: 10px 0;
            span {
                font-weight: 400;
                font-style: normal;
                font-size: 10px;
                color: #AAAAAA;
            }
        }
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
        .address-list {
            display: flex;
            flex-wrap: wrap;
            .address-item-wrap {
                cursor: pointer;
                width: 24%;
                margin-right: 0.75%;
                .address-item {
                    width: 100%;
                    border: 1px solid rgba(121, 121, 121, 1);
                    padding-bottom: 50px;
                    position: relative;
                    margin-bottom: 10px;
                    div {
                        padding: 10px 20px;
                    }
                    .item-top {
                        width: 90%;
                        margin: 0 auto;
                        border-bottom: 1px dotted #ccc;
                        position: relative;
                    }
                    .sign-tag {
                        position: absolute;
                        right: 0;
                        top: 0;
                        background-color: rgba(239, 72, 82, 1);
                        color: #fff;
                        padding: 1px 10px;
                        i{
                            font-size: 23px;
                        }
                    }
                    .edit-tag {
                        display: none;
                        position: absolute;
                        right: 0;
                        bottom: 0;
                        background-color: rgba(239, 72, 82, 1);
                        color: #fff;
                        padding: 1px 10px;
                        i{
                            font-size: 18px;
                        }
                    }
                    .delete-tag {
                        display: none;
                        position: absolute;
                        left: 0;
                        bottom: 0;
                        background-color: rgba(239, 72, 82, 1);
                        color: #fff;
                        padding: 1px 10px;
                        i{
                            font-size: 18px;
                        }
                    }
                }
                .address-item:nth-child(4n) {
                    margin-right: 0;
                }
                .active {
                    border: 1px solid rgba(239, 72, 82, 1);
                    .edit-tag {
                        display: block;
                    }
                    .delete-tag {
                        display: block;
                    }
                }

            }

        }
        del{
            font-weight: 400;
            font-style: normal;
            font-size: 9px;
            color:#AAAAAA;
        }
        .cart-sec {
            padding: 10px;
            border: 1px solid #ebeef5;
            margin-bottom: 10px;
            .unit-price {
                margin-top: 5.5px;
            }
        }
        .item-option {
            display: flex;
            width: 25%;
            margin-top: 10px;
            justify-content: space-between;
            div {
                width: 48%;
                text-align: center;
                border: 1px solid rgba(121, 121, 121, 1);
                padding: 4px 0;
                cursor: pointer;
            }
        }
        .item-auth {
            border: 1px solid rgba(215, 215, 215, 1);
            padding: 30px 20px;
            .el-icon-arrow-right {
                margin-left: 66rem;
                cursor: pointer;
                &:hover{
                    color: #007aff;
                }
            }
            .auth-real-name {
                color: red;
            }
        }
        .el-table__header-wrapper {
            height: 40px;
            line-height: 38px;
            text-align: center;
            color: #666;
            margin-top: 10px;
            border: 1px solid #e1e1e1;
            .el-table__header {
                .has-gutter {
                    tr {
                        th {
                            flex: 1;
                            text-align: center;
                            border-bottom: none;
                            background: rgba(242, 242, 242, 1);
                        }
                        .el-table_1_column_2 {
                            flex: 2;
                        }
                    }
                }
            }
        }
        .el-table__body-wrapper {
            tr {
                //   border: 1px solid #ebeef5;
                td {
                    text-align: center;
                    .cell {
                        .el-input-number {
                            span {
                                height: 26px;
                            }
                        }
                    }
                }
                .item-info{
                    margin-left: 30px;
                }
                td:nth-child(1) {
                    .cell {
                        text-align: left;
                        .shop-item {
                            cursor: pointer;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            .img-box {
                                cursor: pointer;
                                width: 120px;
                                height: 120px;
                                img {
                                    width: 100%;
                                    height: 100%;
                                }
                                .red-sign {
                                    position:sticky;
                                    bottom:0;
                                    left:30px;
                                    font-size:10px;
                                    width:120px;
                                    height:20px;
                                    text-align:center;
                                    line-height:20px;
                                    color:#fff;
                                    background-color: rgba(252, 111, 126, 0.65)
                                }
                            }
                            .promotion-box {
                                display: flex;
                                align-items: center;
                            }
                            .item-info {
                                display: flex;
                                flex-direction: column;
                                justify-content: space-between;
                                padding: 10px 0;
                                height: 120px;
                                .goods-name{
                                    width: 190px;
                                    overflow: hidden;
                                    text-overflow: ellipsis;
                                    display: -webkit-box;
                                    -webkit-line-clamp: 2;
                                    line-clamp: 2;
                                    -webkit-box-orient: vertical;
                                }
                                /*.red-sign {*/
                                /*    width: 80px;*/
                                /*    color: #ef4852;*/
                                /*    border: 1px solid #ef4852;*/
                                /*    text-align: center;*/
                                /*}*/
                            }
                        }
                    }
                }
            }
        }
        .checkout-info {
            display: flex;
            margin-top: 20px;
            background-color: rgba(242, 242, 242, 0.6);
            padding: 30px 30px 0 30px;
            border-left: 1px solid rgba(215, 215, 215, 1);
            border-right: 1px solid rgba(215, 215, 215, 1);
            .checkout-info-left {
                width: 50%;
                .el-input__inner {
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    line-clamp: 1;
                    -webkit-box-orient: vertical;
                }
                .el-row {
                    padding: 20px;
                    span {
                        margin-right: 2px;
                    }
                    .about-span {
                        margin-left: 13px;
                    }
                    .about-discounts {
                        margin-left: 1rem;
                    }
                }
                .score {
                    display: flex;
                    align-items: center;
                    .el-input {
                        width: 130px;
                        margin-right: 10px;
                    }
                }
                .el-dropdown-link {
                    background: #fff;
                    border: 1px solid #000;
                    cursor: pointer;
                    color: #000;
                    padding: 6px;
                }
                .el-icon-arrow-down {
                    font-size: 12px;
                }
            }
            .checkout-info-right {
                width: 50%;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                color: #555555;
                .el-row {
                    padding: 6px;
                    text-align: right;
                    .el-col {
                        span {
                            display: inline-block;
                            width: 150px;
                            padding: 8px;
                            margin-right: 20px;
                        }
                        span:nth-child(2) {
                            text-align: left;
                        }
                    }
                    .el-col:nth-child(1) {
                        span:nth-child(2) {
                            font-size: 20px;
                            color: #d9001b;
                        }
                    }
                    .el-col:last-child {
                        span {
                            width: auto;
                        }
                        span:first-child {
                            margin: 0;
                            padding: 0;
                            color: #d9001b;
                        }
                        span:nth-child(3),
                        span:nth-child(4) {
                            font-size: 20px;
                            color: #d9001b;
                        }
                    }
                }
            }
        }
        .checkout-info-bottom {
            display: flex;
            align-items: center;
            padding: 10px;
            background: rgba(242, 242, 242, 0.6);
            border: 1px solid rgba(215, 215, 215, 1);
            .el-textarea {
                width: 60%;
            }
        }
        .checkout-btn {
            display: flex;
            justify-content: flex-end;
            .submit{
                background-color: rgba(217, 0, 27, 1);
            }
            button {
                padding: 14px 100px;
                color: #fff;
                outline: none;
                border: none;
                margin-top: 40px;
            }
        }
        .el-form-item {
            margin-bottom:0 !important;
        }
        .el-form-item__content {
            margin-left: 0 !important;
        }
        // 弹框
        .pop-content {
            .mask-box {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                z-index: 9;
                background: rgba(0, 0, 0, 0.6);
            }
            .addaddr-wrapper {
                position: absolute;
                top: 220px;
                left: 50%;
                transform: translateX(-50%);
                z-index: 10;
                width: 600px;
                height: 400px;
                border: 1px solid #333;
                background-color: #fff;

                .tit {
                    font-size: 16px;
                    text-align: center;
                    border-bottom: 1px solid #333;
                    padding: 10px 0;
                    position: relative;

                    i {
                        position: absolute;
                        top: 50%;
                        right: 10px;
                        transform: translateY(-50%);
                        font-style: normal;
                        font-size: 20px;
                    }
                }

                .info {
                    padding: 20px 0 0 30px;
                }

                .commit {
                    width: 104px;
                    height: 35px;
                    line-height: 35px;
                    background-color: #ec808d;
                    color: #fff;
                    margin-top: 25px;
                }

                .el-row:nth-child(2) {
                    .el-col:nth-child(2) {
                        .distpicker-address-wrapper select {
                            font-size: 14px;
                            width: 121px;
                        }
                    }
                }

                .el-checkbox .el-checkbox__input {
                    margin-right: 5px;
                    vertical-align: middle;
                }
            }
        }
    }
</style>