package com.sample.jwtauth.config;

import com.amplicode.core.auth.AuthenticationInfoProvider;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.oidc.StandardClaimNames;
import org.springframework.security.oauth2.jwt.Jwt;

class JwtAuthInfoProvider implements AuthenticationInfoProvider {

    @Override
    public String getAuthenticatedUsername() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        if (principal instanceof Jwt) {
            final String username = ((Jwt) principal).getClaimAsString(StandardClaimNames.PREFERRED_USERNAME);
            return username;
        }
        return null;
    }
}
