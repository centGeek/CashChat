package pl.lodz.cash_chat.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {

    @GetMapping("/")
    public String home() {
        return "CashChat Application is running!";
    }

    @GetMapping("/test")
    public String test() {
        return "Test endpoint works!";
    }

    @GetMapping("/health")
    public String health() {
        return "Application is healthy!";
    }
}