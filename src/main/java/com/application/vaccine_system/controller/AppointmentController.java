package com.application.vaccine_system.controller;

import com.application.vaccine_system.config.payment.VNPayConfig;
import com.application.vaccine_system.model.response.ResAppointmentDTO;
import com.application.vaccine_system.util.PaymentMethod;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.application.vaccine_system.model.request.ReqAppointmentDTO;
import com.application.vaccine_system.service.AppointmentService;

import java.io.UnsupportedEncodingException;
import java.util.*;


@RestController
public class AppointmentController {
    private final AppointmentService appointmentService;

    public AppointmentController(AppointmentService appointmentService) {
        this.appointmentService = appointmentService;
    }

    @PostMapping("/order")
    public ResponseEntity<ResAppointmentDTO> order(@RequestBody ReqAppointmentDTO req, @RequestParam("payment_method") String paymentMethod) throws UnsupportedEncodingException {
        ResAppointmentDTO newAppointment = appointmentService.createAppointment(req, paymentMethod);
        return ResponseEntity.ok().body(newAppointment);
    }

    @GetMapping("/vnpay_return")
    public ResponseEntity<String> vnpayReturn(HttpServletRequest request) throws UnsupportedEncodingException {
        Map<String, String> vnpParams = new HashMap<>();
        for (Enumeration<String> params = request.getParameterNames(); params.hasMoreElements(); ) {
            String paramName = params.nextElement();
            String paramValue = request.getParameter(paramName);
            vnpParams.put(paramName, paramValue);
        }

        String vnp_SecureHash = vnpParams.remove("vnp_SecureHash");
        List<String> fieldNames = new ArrayList<>(vnpParams.keySet());
        Collections.sort(fieldNames);

        StringBuilder hashData = new StringBuilder();
        for (String fieldName : fieldNames) {
            String fieldValue = vnpParams.get(fieldName);
            if ((fieldValue != null) && (fieldValue.length() > 0)) {
                hashData.append(fieldName).append('=').append(fieldValue).append('&');
            }
        }
        String secureHash = PaymentMethod.hmacSHA512(VNPayConfig.VNP_HASH_SECRET, hashData.substring(0, hashData.length() - 1));

        if (secureHash.equals(vnp_SecureHash)) {
            // Xử lý giao dịch thành công
            return ResponseEntity.ok("Transaction successful");
        } else {
            // Xử lý giao dịch thất bại
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid signature");
        }
    }
}
