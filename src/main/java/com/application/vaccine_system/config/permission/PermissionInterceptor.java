package com.application.vaccine_system.config.permission;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.transaction.annotation.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.HandlerMapping;

import com.application.vaccine_system.config.security.SecurityUtil;
import com.application.vaccine_system.exception.PermissionException;
import com.application.vaccine_system.model.Permission;
import com.application.vaccine_system.model.Role;
import com.application.vaccine_system.model.User;
import com.application.vaccine_system.service.UserService;

import java.util.List;

public class PermissionInterceptor implements HandlerInterceptor {

    @Autowired
    UserService userService;

    @Override
    @Transactional
    public boolean preHandle(
            HttpServletRequest request,
            HttpServletResponse response, Object handler)
            throws Exception {

        String path = (String) request.getAttribute(HandlerMapping.BEST_MATCHING_PATTERN_ATTRIBUTE);
        String requestURI = request.getRequestURI();
        String httpMethod = request.getMethod();
        System.out.println(">>> RUN preHandle");
        System.out.println(">>> path= " + path);
        System.out.println(">>> httpMethod= " + httpMethod);
        System.out.println(">>> requestURI= " + requestURI);

        String email = SecurityUtil.getCurrentUserLogin().isPresent() == true
                ? SecurityUtil.getCurrentUserLogin().get()
                : "";
        if (!email.isEmpty()) {
            User user = this.userService.getUserByEmail(email);
            if (user != null) {
                Role role = user.getRole();
                if (role != null) {
                    List<Permission> permissions = role.getPermissions();
                    boolean isAllow = permissions.stream().anyMatch(item -> item.getApiPath().equals(path)
                            && item.getMethod().equals(httpMethod));

                    if (!isAllow) {
                        throw new PermissionException("Bạn không có quyền truy cập endpoint này.");
                    }
                } else {
                    throw new PermissionException("Bạn không có quyền truy cập endpoint này.");
                }
            }
        }

        return true;
    }
}
