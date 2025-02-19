package com.application.vaccine_system.controller;


import lombok.RequiredArgsConstructor;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.application.vaccine_system.model.request.ReqAppointment;
import com.application.vaccine_system.service.AppointmentService;

import java.io.UnsupportedEncodingException;

@RestController
@RequiredArgsConstructor
public class AppointmentController {
    private final AppointmentService appointmentService;

    @PostMapping("/order")
    public ResponseEntity<String> order(@RequestBody ReqAppointment reqAppointment,
            @RequestParam("payment_method") String paymentMethod) throws UnsupportedEncodingException {
        
        return ResponseEntity.ok().body(appointmentService.createAppointment(reqAppointment, paymentMethod));
    }

    // @GetMapping("/vnpay_return")
    // public ResponseEntity<String> vnpayReturn(HttpServletRequest request) throws
    // UnsupportedEncodingException {
    // Map<String, String> vnpParams = new HashMap<>();
    // for (Enumeration<String> params = request.getParameterNames();
    // params.hasMoreElements(); ) {
    // String paramName = params.nextElement();
    // String paramValue = request.getParameter(paramName);
    // vnpParams.put(paramName, paramValue);
    // }

    // String vnp_SecureHash = vnpParams.remove("vnp_SecureHash");
    // List<String> fieldNames = new ArrayList<>(vnpParams.keySet());
    // Collections.sort(fieldNames);

    // StringBuilder hashData = new StringBuilder();
    // for (String fieldName : fieldNames) {
    // String fieldValue = vnpParams.get(fieldName);
    // if ((fieldValue != null) && (fieldValue.length() > 0)) {
    // hashData.append(fieldName).append('=').append(fieldValue).append('&');
    // }
    // }
    // String secureHash = PaymentMethod.hmacSHA512(VNPayConfig.VNP_HASH_SECRET,
    // hashData.substring(0, hashData.length() - 1));

    // if (secureHash.equals(vnp_SecureHash)) {
    // // Xử lý giao dịch thành công
    // return ResponseEntity.ok("Transaction successful");
    // } else {
    // // Xử lý giao dịch thất bại
    // return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid
    // signature");
    // }
    // }
}
