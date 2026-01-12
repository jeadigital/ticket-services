package com.ticket.auth.service;

import com.ticket.auth.exception.AccountNotActiveException;
import com.ticket.auth.exception.InvalidCredentialsException;
import com.ticket.auth.exception.PasswordHashingException;
import com.ticket.auth.exception.UserAlreadyExistsException;
import com.ticket.auth.model.SiteUser;
import com.ticket.auth.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Transactional
    public SiteUser register(SiteUser user, String rawPassword) {
        // 1. Check if exists
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException(user.getEmail());
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
                .orElseThrow(() -> new InvalidCredentialsException());

        String hashCheck = md5(user.getId() + password);

        if (!hashCheck.equals(user.getPassword())) {
            throw new InvalidCredentialsException();
        }

        if (!"A".equals(user.getStatus())) {
            throw new AccountNotActiveException(user.getEmail(), user.getStatus());
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
            throw new PasswordHashingException("MD5", e);
        }
    }
}
