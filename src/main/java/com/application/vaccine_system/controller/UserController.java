package com.application.vaccine_system.controller;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
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
import com.application.vaccine_system.exception.InvalidException;
import com.application.vaccine_system.model.User;
import com.application.vaccine_system.model.response.Pagination;
import com.application.vaccine_system.model.response.UserDTO;
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
        return ResponseEntity.ok().body(userService.getAllUsers(specification, pageable));
    }

    @PostMapping
    @ApiMessage("Create a new user")
    public ResponseEntity<UserDTO> createUser(@Valid @RequestBody User user) throws InvalidException {
        return ResponseEntity.status(HttpStatus.CREATED).body(userService.createUser(user));
    }

    @PutMapping("/{id}")
    @ApiMessage("Update a user")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @Valid @RequestBody User user)
            throws InvalidException {
        return ResponseEntity.ok().body(userService.updateUser(id, user));
    }

    @DeleteMapping("/{id}")
    @ApiMessage("Delete a user")
    public void deleteUser(@PathVariable Long id) throws InvalidException {
        userService.deleteUser(id);
    }
}
