package com.windsnow1025.canteenmanagement.springboot.api;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/test")
public class TestController {

    @GetMapping("/")
    public ResponseEntity<Map<String, Object>> test() {
        return ResponseEntity.ok(Map.of("test", "test"));
    }
}
