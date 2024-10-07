package com.example.demo.api;

import com.example.demo.models.user_model.*;
import com.example.demo.service.UserService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "http://localhost:8080/")
@RestController
@RequestMapping("/api/user")
@SecurityRequirement(name = "api")
public class UserAPI {

    @Autowired
    private UserService userService;

    // Register API
    @PostMapping("/register")
    public ResponseEntity register(@Valid @RequestBody CustomerRequest registerRequest) {
        UserResponse newUser = userService.registerUser(registerRequest);
        return ResponseEntity.ok(newUser);
    }

    // List API
    @GetMapping("/user")
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

    @PutMapping("/{userId}/customer")
    public ResponseEntity updateForCustomer(@PathVariable long userId, @RequestBody CustomerRequest updateRequest) {
        UserResponse updatedUser = userService.updateForCustomer(userId, updateRequest);
        return ResponseEntity.ok(updatedUser);  // Trả về HTTP 200 với UserResponse
    }

    // Delete API
    @DeleteMapping("/{id}/delete")
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
}

