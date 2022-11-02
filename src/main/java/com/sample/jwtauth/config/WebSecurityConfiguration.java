package com.sample.jwtauth.config;

import com.amplicode.core.auth.AuthenticationInfoProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@EnableWebSecurity
@Configuration
public class WebSecurityConfiguration {

    @Bean
    public AuthenticationInfoProvider authenticationInfoProvider() {
        return new JwtAuthInfoProvider();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //OAuth 2.0 Login
        http.oauth2Login(Customizer.withDefaults());
        //Authorize Requests
        http.authorizeRequests(authorizeRequests -> authorizeRequests
                .antMatchers("/graphql").permitAll()
                .antMatchers("/graphql/**").permitAll());
        //Headers management
        http.headers(Customizer.withDefaults());
        //JWT Token
        http.oauth2ResourceServer(oauth2ResourceServer -> oauth2ResourceServer
                .jwt(Customizer.withDefaults())
        );
        //Anonymous
        http.anonymous(Customizer.withDefaults());
        //CSRF
        http.csrf(csrf -> csrf
                .disable());
        return http.build();
    }

}