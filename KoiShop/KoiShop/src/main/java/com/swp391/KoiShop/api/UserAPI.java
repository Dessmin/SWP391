package com.swp391.KoiShop.api;

import com.swp391.KoiShop.entity.User;
import com.swp391.KoiShop.model.*;
import com.swp391.KoiShop.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080/")
@RestController
@RequestMapping("/api")
@SecurityRequirement(name = "api")
public class UserAPI {

    @Autowired
    private UserService userService;

    // Register API
    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody RegisterRequest registerRequest) {
        UserResponse newUser = userService.registerUser(registerRequest);
        return ResponseEntity.ok(newUser);
    }

    // List API
    @GetMapping("/user")
    public ResponseEntity getAllAccount(){
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    // Login API
    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody LoginRequest loginRequest) {
        UserResponse user = userService.login(loginRequest);
        return ResponseEntity.ok(user);
    }

    // Update API
    @PutMapping("/{id}")
    public ResponseEntity update(@PathVariable long id, @Valid @RequestBody User user) {
        User existingUser = userService.updateUser(id, user);
        return ResponseEntity.ok(existingUser);
    }

    @PutMapping("/{userId}/customer")
    public ResponseEntity updateForCustomer(@PathVariable long userId, @RequestBody UpdateCustomerRequest updateRequest) {
        UserResponse updatedUser = userService.updateForCustomer(userId, updateRequest);
        return ResponseEntity.ok(updatedUser);  // Trả về HTTP 200 với UserResponse
    }

    // Delete API
    @DeleteMapping("/{id}")
//    @PreAuthorize("hasAuthority('Manager')")
    public ResponseEntity delete(@PathVariable long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("forgot-password")
    public ResponseEntity forgotPassword(@Valid @RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        userService.forgotPassword(forgotPasswordRequest);
        return ResponseEntity.ok("Success sent request to forgot password");
    }

    @PostMapping("reset-password")
    public ResponseEntity resetPassword(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest) {
        userService.resetPassword(resetPasswordRequest);
        return ResponseEntity.ok("Success sent request to reset password");
    }
}

