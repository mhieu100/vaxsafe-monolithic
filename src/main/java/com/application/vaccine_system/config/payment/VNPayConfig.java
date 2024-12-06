package com.application.vaccine_system.config.payment;

import org.springframework.context.annotation.Configuration;

@Configuration
public class VNPayConfig {
    public static final String VNP_URL = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
    public static final String VNP_RETURN_URL = "http://localhost:8080//vnpay_return";
    public static final String VNP_TMNCODE = "W4YV410E";
    public static final String VNP_HASH_SECRET = "I54A2HLE6VI0BDRNR34IAKTJG9VORIMB";
    public static final String VNP_API_VERSION = "2.1.0";
}
