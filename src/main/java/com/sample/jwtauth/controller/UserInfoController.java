package com.sample.jwtauth.controller;

import com.amplicode.core.auth.AuthenticationInfoProvider;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Controller;

@Controller
public class UserInfoController {

    private final AuthenticationInfoProvider authenticationInfoProvider;

    public UserInfoController(AuthenticationInfoProvider authenticationInfoProvider) {
        this.authenticationInfoProvider = authenticationInfoProvider;
    }

    /**
     * Provides information about an authenticated user. If there is no authenticated user, the {@link AccessDeniedException} is thrown.
     *
     * @return {@link UserInfo} with information about an authenticated user.
     */
    @PreAuthorize("isAuthenticated()")
    @QueryMapping("userInfo")
    public UserInfo userInfo() {
        String currentUsername = authenticationInfoProvider.getPreferredUsername();
        if (currentUsername != null) {
            return new UserInfo(currentUsername);
        }
        throw new AccessDeniedException("Unable to extract authenticated user information");
    }

    public static class UserInfo {
        private final String username;

        public UserInfo(String username) {
            this.username = username;
        }

        public String getUsername() {
            return username;
        }
    }
}
