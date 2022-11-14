package com.sample.jwtauth.config;

import com.amplicode.core.auth.AuthenticationInfoProvider;
import com.amplicode.core.auth.JwtAuthenticationInfoProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.oauth2.core.oidc.StandardClaimNames;
import org.springframework.security.oauth2.server.resource.authentication.JwtAuthenticationConverter;
import org.springframework.security.oauth2.server.resource.authentication.JwtGrantedAuthoritiesConverter;
import org.springframework.security.web.SecurityFilterChain;

import java.util.Arrays;

@EnableWebSecurity
@Configuration
@EnableGlobalMethodSecurity(securedEnabled = true)
public class WebSecurityConfiguration {

    @Bean
    public AuthenticationInfoProvider authenticationInfoProvider() {
        JwtAuthenticationInfoProvider jwtAuthenticationInfoProvider = new JwtAuthenticationInfoProvider();
        jwtAuthenticationInfoProvider.setClaimNames(Arrays.asList(StandardClaimNames.PREFERRED_USERNAME, "cognito:username"));
        return jwtAuthenticationInfoProvider;
    }

    @Bean
    public JwtAuthenticationConverter jwtAuthenticationConverter() {
        JwtGrantedAuthoritiesConverter grantedAuthoritiesConverter = new JwtGrantedAuthoritiesConverter();
        grantedAuthoritiesConverter.setAuthoritiesClaimName("cognito:groups");
        grantedAuthoritiesConverter.setAuthorityPrefix("ROLE_");

        JwtAuthenticationConverter jwtAuthenticationConverter = new JwtAuthenticationConverter();
        jwtAuthenticationConverter.setJwtGrantedAuthoritiesConverter(grantedAuthoritiesConverter);

        return jwtAuthenticationConverter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        //OAuth 2.0 Login
        //http.oauth2Login(Customizer.withDefaults());

        //Authorize Requests
        http.authorizeRequests(authorizeRequests -> authorizeRequests
                .antMatchers("/graphql").permitAll()
                .antMatchers("/graphql/**").permitAll());
        //Headers management
        http.headers(Customizer.withDefaults());
        //JWT Token
        http.oauth2ResourceServer(oauth2ResourceServer -> oauth2ResourceServer
                .jwt(jwt -> jwt.jwtAuthenticationConverter(jwtAuthenticationConverter()))
        );
        //Anonymous
        http.anonymous(Customizer.withDefaults());
        //CSRF
        http.csrf(csrf -> csrf
                .disable());
        return http.build();
    }
}