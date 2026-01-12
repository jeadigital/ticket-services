package com.ticket.auth.service;

import com.ticket.auth.model.SiteUser;
import com.ticket.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import javax.xml.bind.DatatypeConverter;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public SiteUser register(SiteUser user, String rawPassword) {
        // 1. Check if exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        // 2. Set defaults
        user.setJoinDate(LocalDateTime.now());
        user.setStatus("A");
        user.setUserType("U");

        // 3. Save without password to get ID
        SiteUser savedUser = userRepository.save(user);

        // 4. Generate Hash: md5(id + password)
        String hashedPassword = md5(savedUser.getId() + rawPassword);
        savedUser.setPassword(hashedPassword);

        // 5. Update
        return userRepository.save(savedUser);
    }

    public SiteUser login(String email, String password) {
        SiteUser user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        String hashCheck = md5(user.getId() + password);

        if (!hashCheck.equals(user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        if (!"A".equals(user.getStatus())) {
            throw new RuntimeException("Account is not active");
        }

        return user;
    }

    private String md5(String input) {
        try {
            MessageDigest md = MessageDigest.getInstance("MD5");
            md.update(input.getBytes());
            byte[] digest = md.digest();
            // Convert to Hex String
            StringBuilder sb = new StringBuilder();
            for (byte b : digest) {
                sb.append(String.format("%02x", b));
            }
            return sb.toString();
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}
