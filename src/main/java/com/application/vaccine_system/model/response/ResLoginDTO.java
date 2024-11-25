package com.application.vaccine_system.model.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ResLoginDTO {
    private String access_token;
    private UserLogin user;

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserLogin {
        private long id;
        private String email;
        private String fullName;
        private String role;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserGetAccount {
       public UserLogin user;
    }


    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class UserInsideToken {
        private long id;
        private String email;
        private String fullName;
    }
}