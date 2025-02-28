package com.application.vaccine_system.controller;

import java.io.UnsupportedEncodingException;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.application.vaccine_system.service.VNPayService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/vnpay")
@RequiredArgsConstructor
public class VNPayController {

    private final VNPayService vnPayService;

    @PostMapping("/create-payment")
    public ResponseEntity<String> createPayment(@RequestParam long amount, @RequestParam String orderInfo, HttpServletRequest request) throws UnsupportedEncodingException {
        String ipAddress = request.getRemoteAddr();
        String paymentUrl = vnPayService.createPaymentUrl(amount, orderInfo, ipAddress);
        return ResponseEntity.ok(paymentUrl);
    }

    @GetMapping("/return")
    public ResponseEntity<String> paymentReturn(@RequestParam Map<String, String> params) {
        return ResponseEntity.ok("Payment processed successfully");
    }
}
