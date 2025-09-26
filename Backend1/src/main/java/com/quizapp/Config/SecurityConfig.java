package com.quizapp.Config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {


    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(@org.jetbrains.annotations.NotNull HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())                  // Disable CSRF with lambda
                .authorizeHttpRequests(auth -> auth             // Authorize requests with lambda
                        .anyRequest().permitAll()
                )
                .httpBasic(Customizer.withDefaults());          // Enable HTTP Basic auth if needed

        return http.build();
    }

}