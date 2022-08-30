package com.example.f_chat;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication(scanBasePackages = {"com.example.f_chat"},exclude = DataSourceAutoConfiguration.class)
public class FChatApplication {

    public static void main(String[] args) {
        SpringApplication.run(FChatApplication.class, args);
    }



}
