package pl.lodz.cash_chat.controllers;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.lodz.cash_chat.entity.UserEntity;
import pl.lodz.cash_chat.repository.UserRepository;

import java.util.List;

@RestController
@RequestMapping("/api/user")
@AllArgsConstructor
@Slf4j
public class UserController {

    private UserRepository userRepository;

    @GetMapping("/")
    public List<UserEntity> getAllUsers(){
        log.info("Entering getAllUsers()");
        return userRepository.getAllExceptLoggedUser();
    }

}
