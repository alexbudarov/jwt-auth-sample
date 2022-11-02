package com.sample.jwtauth.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.ConstructorBinding;

@ConfigurationProperties(prefix = "app")
@ConstructorBinding
public class ApplicationProperties {
    private final UsersProperties users;
    private final FrontendProperties frontend;

    public ApplicationProperties(UsersProperties users,
                                 FrontendProperties frontend) {
        this.users = users != null ? users : new UsersProperties(new UserCredentials("admin", "{noop}admin"));
        this.frontend = frontend != null ? frontend : new FrontendProperties("");
    }

    public UsersProperties getUsers() {
        return users;
    }

    public FrontendProperties getFrontend() {
        return frontend;
    }

    public static class UsersProperties {
        private final UserCredentials admin;

        public UsersProperties(UserCredentials admin) {
            this.admin = admin;
        }

        public UserCredentials getAdmin() {
            return admin;
        }
    }

    public static class UserCredentials {
        private final String username;
        private final String password;

        public UserCredentials(String username, String password) {
            this.username = username;
            this.password = password;
        }

        public String getUsername() {
            return username;
        }

        public String getPassword() {
            return password;
        }
    }

    public static class FrontendProperties {
        private final String baseUrl;

        public FrontendProperties(String baseUrl) {
            this.baseUrl = baseUrl;
        }

        public String getBaseUrl() {
            return baseUrl;
        }
    }
}
