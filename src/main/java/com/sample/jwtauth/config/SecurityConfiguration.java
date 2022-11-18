package com.sample.jwtauth.config;

import com.amplicode.core.auth.AuthenticationInfoProvider;
import com.amplicode.core.auth.UserDetailsAuthenticationInfoProvider;
import com.amplicode.core.security.UnauthorizedStatusAuthenticationEntryPoint;
import com.amplicode.core.security.formlogin.FormLoginAuthenticationFailureHandler;
import com.amplicode.core.security.formlogin.FormLoginAuthenticationSuccessHandler;
import com.amplicode.core.security.formlogin.FormLoginLogoutSuccessHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.*;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfiguration {
    @Autowired
    private ApplicationProperties applicationProperties;

    @Bean
    public AuthenticationSuccessHandler authenticationSuccessHandler() {
        return new FormLoginAuthenticationSuccessHandler();
    }

    @Bean
    public AuthenticationFailureHandler authenticationFailureHandler() {
        return new FormLoginAuthenticationFailureHandler();
    }

    @Bean
    public LogoutSuccessHandler logoutSuccessHandler() {
        return new FormLoginLogoutSuccessHandler();
    }

    @Bean
    public AuthenticationEntryPoint authenticationEntryPoint() {
        return new UnauthorizedStatusAuthenticationEntryPoint();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //Form Login
        http.formLogin(formLogin -> formLogin
                .successHandler(authenticationSuccessHandler())
                .failureHandler(authenticationFailureHandler())
                .permitAll());
        //Exception handling
        http.exceptionHandling(exceptionHandling -> exceptionHandling
                .authenticationEntryPoint(authenticationEntryPoint()));
        //Logout
        http.logout(logout -> logout
                .logoutSuccessHandler(logoutSuccessHandler()));
        //Authorize
        http.authorizeRequests(authorization -> authorization
                .antMatchers("/graphql").permitAll()
                .antMatchers("/graphql/**").permitAll());
        //CORS
        http.cors(withDefaults());
        //CSRF
        http.csrf(AbstractHttpConfigurer::disable);
        return http.build();
    }

    @Bean
    public InMemoryUserDetailsManager userDetailsService() {
        UserDetails admin = User.builder()
                .username(applicationProperties.getUsers().getAdmin().getUsername())
                .password(applicationProperties.getUsers().getAdmin().getPassword())
                .roles("ADMIN")
                .build();

        UserDetails user = User.builder()
                .username("user")
                .password("{noop}user")
                .roles("TICKET_OPERATOR")
                .build();

        return new InMemoryUserDetailsManager(admin, user);
    }

    @Bean
    public AuthenticationInfoProvider authenticationInfoProvider() {
        return new UserDetailsAuthenticationInfoProvider();
    }
}
