package com.koishop.api;

import com.koishop.models.user_model.*;
import com.koishop.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:5173/")
@RestController
@RequestMapping("/api/user")
@SecurityRequirement(name = "api")
public class UserAPI {

    @Autowired
    private UserService userService;

    // Register API
    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody RegisterRequest registerRequest) {
        CustomerRequest newUser = userService.registerUser(registerRequest);
        return ResponseEntity.ok(newUser);
    }

    // List API
    @GetMapping("/list-user")
    public List<UserForList> getAllAccount(){
        return userService.getAllUsers();
    }

    // Login API
    @PostMapping("/login")
    public ResponseEntity login(@Valid @RequestBody LoginRequest loginRequest) {
        UserResponse user = userService.login(loginRequest);
        return ResponseEntity.ok(user);
    }

    // Update API
    @PutMapping("/{id}/update")
    public ResponseEntity update(@PathVariable long id, @Valid @RequestBody AdminViewUser adminViewUser) {
        AdminViewUser existingUser = userService.updateUser(id, adminViewUser);
        return ResponseEntity.ok(existingUser);
    }

    @PutMapping("/{userId}/customer-update")
    public ResponseEntity updateForCustomer( @RequestBody CustomerRequest updateRequest) {
        CustomerRequest updatedUser = userService.updateForCustomer(updateRequest);
        return ResponseEntity.ok(updatedUser);  // Trả về HTTP 200 với UserResponse
    }

    // Delete API
    @DeleteMapping("/{id}/delete")
    @PreAuthorize("hasRole('Manager')")
    public ResponseEntity delete(@PathVariable long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().build();
    }

    @PostMapping("forgot-password")
    public ResponseEntity forgotPassword(@Valid @RequestBody ForgotPasswordRequest forgotPasswordRequest) {
        userService.forgotPassword(forgotPasswordRequest);
        return ResponseEntity.ok("Success sent request to forgot password");
    }

    @PostMapping("/reset-password-email")
    public ResponseEntity resetPasswordByEmail(@Valid @RequestBody ResetPasswordRequest resetPasswordRequest) {
        userService.resetPasswordByEmail(resetPasswordRequest);
        return ResponseEntity.ok("Success sent request to reset password");
    }

    @PutMapping("/reset-password")
    public ResponseEntity resetPassword(@RequestParam String oldPassword, @Valid @RequestBody ResetPasswordRequest newPassword) {
        userService.resetPassword(oldPassword, newPassword);
        return ResponseEntity.ok("Success sent request to reset password");
    }

    @PutMapping("/{userId}/update-role")
    public ResponseEntity<AdminViewUser> updateRole(@PathVariable long userId, @RequestBody UpdateRoleRequest updateRoleRequest) {
        AdminViewUser adminViewUser = userService.updateRole(userId, updateRoleRequest);
        return ResponseEntity.ok(adminViewUser);  // Trả về HTTP 200 với UserResponse
    }

    @GetMapping("/{id}/detail")
    public ResponseEntity<AdminViewUser> getUser(@PathVariable long id) {
        AdminViewUser adminViewUser = userService.detail(id);
        return ResponseEntity.ok(adminViewUser);
    }

    @GetMapping("/customer-detail")
    public ResponseEntity getCustomerDetail() {
        CustomerRequest detailUser = userService.detailForUser();
        return ResponseEntity.ok(detailUser);
    }

    @GetMapping("/customer-point")
    public Double getCustomerPoints() {
        return userService.getPointsUser();
    }

    @PutMapping("/usePoint")
    public Double usePoint(@RequestBody Point point) {
        return userService.usePoint(point);
    }
}