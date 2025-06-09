package pl.lodz.cash_chat.repository;

import lombok.AllArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Repository;
import pl.lodz.cash_chat.entity.UserEntity;
import pl.lodz.cash_chat.repository.jpa.UserJpaRepository;

import java.util.List;
import java.util.Optional;

@Repository
@AllArgsConstructor
public class UserRepository {

    private UserJpaRepository userJpaRepository;

    public List<UserEntity> getAllExceptLoggedUser() {
        Long loggedUserId = getCurrentUserId();
        List<UserEntity> users = userJpaRepository.findAll();

        users.removeIf(user -> user.getId().equals(loggedUserId));

        return users;
    }

    public Optional<UserEntity> findByEmail(String email) {
        return userJpaRepository.findByEmail(email);
    }

     public Long getCurrentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new IllegalStateException("User not authenticated");
        }

        Object principal = authentication.getPrincipal();
        System.out.println(principal.toString());
        if (principal instanceof UserDetails userDetails) {
            String username = userDetails.getUsername();
            UserEntity dbUser = userJpaRepository.findByEmail(username).get();
            return dbUser.getId();
        }
            throw new IllegalStateException("Unsupported principal type: " + principal.getClass());
        }

    public Optional<UserEntity> findById(Long id) {
        return userJpaRepository.findById(id);
    }
}
