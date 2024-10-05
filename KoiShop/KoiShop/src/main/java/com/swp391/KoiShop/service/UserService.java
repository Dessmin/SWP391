package com.swp391.KoiShop.service;

//import com.swp391.KoiShop.SecurityConfig.SecurityConfig;

import com.swp391.KoiShop.entity.User;
import com.swp391.KoiShop.exception.DuplicateEntity;
import com.swp391.KoiShop.exception.EntityNotFoundException;
import com.swp391.KoiShop.model.*;
import com.swp391.KoiShop.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    TokenService tokenService;
    @Autowired
    private EmailService emailService;

    public UserResponse registerUser(RegisterRequest registerRequest) {
        // map regis -> user
        User user = modelMapper.map(registerRequest, User.class);
        try {
            String originpassword = user.getPassword();
            user.setPassword(passwordEncoder.encode(originpassword));
            user.setJoinDate(new Date());
            User savedUser = userRepository.save(user);

            EmailDetail emailDetail = new EmailDetail();
            emailDetail.setUser(savedUser);
            emailDetail.setSubject("Welcome to Koi Shop");
            emailDetail.setLink("https://www.google.com");
            emailService.sentEmail(emailDetail);
            return modelMapper.map(savedUser, UserResponse.class);
        } catch (Exception e) {
            if (e.getMessage().contains(user.getUsername())) {
                throw new DuplicateEntity("Duplicate UserName!");
            } else if (e.getMessage().contains(user.getEmail())) {
                throw new DuplicateEntity("Duplicate email!");
            } else {
                throw new RuntimeException("Error during registration process", e); // Xử lý ngoại lệ chung nếu có lỗi khác
            }
        }
    }

    public Optional<User> findByUserId(long id) {
        return userRepository.findById(id);
    }

    public User updateUser(long id, User user) {
        Optional<User> userUpdate = userRepository.findById(id);
        if (!userUpdate.isPresent()) throw new EntityNotFoundException("User not found!");
        user.setUserId(id);
        return userRepository.save(user);
    }

    public void deleteUser(long id) {
        Optional<User> existingUser = userRepository.findById(id);
        if (!existingUser.isPresent()) throw new EntityNotFoundException("User not found!");
        userRepository.deleteById(id);
    }

    public UserResponse login(LoginRequest loginRequest) {
        try {
            // Truyền mật khẩu thô từ loginRequest
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getUsername(),
                            loginRequest.getPassword() // Mật khẩu thô, không mã hóa
                    )
            );

            // Lấy thông tin người dùng sau khi xác thực thành công
            User user = (User) authentication.getPrincipal();
            UserResponse userResponse = modelMapper.map(user, UserResponse.class);
            userResponse.setToken(tokenService.generateToken(user));
            return userResponse;
        } catch (Exception e) {
            e.printStackTrace();
            throw new EntityNotFoundException("Invalid username or password!");
        }
    }


    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUserName(username);
    }

    public User getCurrentUser() {
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return userRepository.findById(user.getUserId()).orElse(null);
    }

    public void forgotPassword(ForgotPasswordRequest forgotPasswordRequest) {
        User user = userRepository.findByEmail(forgotPasswordRequest.getEmail());

        if (user == null) throw new EntityNotFoundException("User not found!");
        else {
            EmailDetail emailDetail = new EmailDetail();
            emailDetail.setUser(user);
            emailDetail.setSubject("Reset Password");
            emailDetail.setLink("https://www.google.com/?token=" + tokenService.generateToken(user));
            emailService.sentEmail(emailDetail);
        }
    }

    public void resetPassword(ResetPasswordRequest resetPasswordRequest) {
        User user = getCurrentUser();
        user.setPassword(passwordEncoder.encode(resetPasswordRequest.getPassword()));
        try {
            userRepository.save(user);
        }catch (RuntimeException e) {
            throw new RuntimeException("Error during reset password process", e);
        }
    }

    public UserResponse updateForCustomer(long userId, UpdateCustomerRequest updateRequest) {
        try {
            User existingUser = userRepository.findById(userId)
                    .orElseThrow(() -> new EntityNotFoundException("User not found!"));

            modelMapper.map(updateRequest, existingUser);

            userRepository.save(existingUser);

            return modelMapper.map(existingUser, UserResponse.class);

        } catch (Exception e) {
            throw new RuntimeException("Error during update process", e);
        }
    }

}