package com.sample.jwtauth.config;

import com.amplicode.core.auth.AuthenticationInfoProvider;
import com.sample.jwtauth.controller.UserInfoController;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;

class JwtAuthInfoProvider implements AuthenticationInfoProvider {

    @Override
    public String getAuthenticatedUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof Jwt) {
            final String username = ((Jwt) principal).getClaimAsString("preferred_username");
            return username;
        }
        return null;
    }
}
