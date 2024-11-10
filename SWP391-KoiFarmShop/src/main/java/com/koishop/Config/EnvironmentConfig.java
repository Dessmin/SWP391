package com.koishop.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class EnvironmentConfig {

    @Value("${app.env}")
    private String appEnv;

    public boolean isProductionEnvironment() {
        return "production".equalsIgnoreCase(appEnv);
    }
}
