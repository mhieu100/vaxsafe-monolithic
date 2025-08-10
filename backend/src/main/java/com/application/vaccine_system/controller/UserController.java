package com.application.vaccine_system.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.application.vaccine_system.annotation.ApiMessage;
import com.application.vaccine_system.config.security.SecurityUtil;
import com.application.vaccine_system.exception.InvalidException;
import com.application.vaccine_system.model.User;
import com.application.vaccine_system.model.request.ReqUser;
import com.application.vaccine_system.model.response.Pagination;
import com.application.vaccine_system.model.response.ResUser;
import com.application.vaccine_system.service.UserService;
import com.turkraft.springfilter.boot.Filter;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @ApiMessage("Get all users")
    public ResponseEntity<Pagination> getAllUsers(@Filter Specification<User> specification,
            Pageable pageable) {
                specification = Specification.where(specification).and((root, query, criteriaBuilder) -> criteriaBuilder
                                .equal(root.get("isDeleted"), false));
        return ResponseEntity.ok().body(userService.getAllUsers(specification, pageable));
    }

    @GetMapping("/doctors")
    @ApiMessage("Get all doctors of center")
    public ResponseEntity<Pagination> getAllDoctorsOfCenter(@Filter Specification<User> specification,
            Pageable pageable) {
        String email = SecurityUtil.getCurrentUserLogin().isPresent()
                ? SecurityUtil.getCurrentUserLogin().get()
                : "";
        String centerName = this.userService.getUserByEmail(email).getCenter().getName();
        specification = Specification.where(specification).and((root, query, criteriaBuilder) -> criteriaBuilder
                .equal(root.get("role").get("name"), "DOCTOR")).and(specification).and((root, query, criteriaBuilder) -> criteriaBuilder
                .equal(root.get("center").get("name"), centerName));
        return ResponseEntity.ok().body(userService.getAllUsers(specification, pageable));
    }

    @PostMapping
    @ApiMessage("Create a user")
    public ResponseEntity<ResUser> createUser(@Valid @RequestBody ReqUser reqUser) throws InvalidException {
        return ResponseEntity.ok().body(userService.createUser(reqUser));
    }

    @PutMapping("/{id}")
    @ApiMessage("Update a user")
    public ResponseEntity<ResUser> updateUser(@PathVariable Long id, @Valid @RequestBody ReqUser reqUser)
            throws InvalidException {
        return ResponseEntity.ok().body(userService.updateUser(id, reqUser));
    }

    @DeleteMapping("/{id}")
    @ApiMessage("Delete a user")
    public void deleteUser(@PathVariable Long id) throws InvalidException {
        userService.deleteUser(id);
    }
}
