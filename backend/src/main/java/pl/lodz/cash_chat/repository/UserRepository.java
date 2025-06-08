package pl.lodz.cash_chat.repository;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Repository;
import pl.lodz.cash_chat.entity.UserEntity;
import pl.lodz.cash_chat.repository.jpa.UserJpaRepository;

import java.util.List;

@Repository
@AllArgsConstructor
public class UserRepository {

    private UserJpaRepository userJpaRepository;

    public List<UserEntity> getAllExceptLoggedUser() {
//        Long loggedUserId = getCurrentUserId();
        List<UserEntity> users = userJpaRepository.findAll();

//        users.removeIf(user -> user.getId().equals(loggedUserId));

        return users;
    }

    private Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("User not authenticated");
        }

        Object principal = authentication.getPrincipal();
        System.out.println(principal.toString());
        if (principal instanceof UserEntity user) {
            return user.getId();
        }

        throw new IllegalStateException("Unsupported principal type: " + principal.getClass());
    }
}
