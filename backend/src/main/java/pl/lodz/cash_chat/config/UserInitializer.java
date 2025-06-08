package pl.lodz.cash_chat.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.lodz.cash_chat.entity.RoleEntity;
import pl.lodz.cash_chat.entity.UserEntity;
import pl.lodz.cash_chat.repository.RoleRepository;
import pl.lodz.cash_chat.repository.UserRepository;

@Component
@RequiredArgsConstructor
public class UserInitializer implements ApplicationListener<ApplicationReadyEvent> {

    private final UserRepository userRepository;

    private final RoleRepository roleRepository;

    private final PasswordEncoder passwordEncoder;
    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        if (userRepository.count() == 0) {
            RoleEntity role = new RoleEntity( "USER");
            roleRepository.save(role);
            UserEntity student1 = new UserEntity(
                    null, "Jan", "Kowalski", "student1",
                    "123456789", "student1@example.com",
                    passwordEncoder.encode("pass123"),
                    role
            );

            UserEntity student2 = new UserEntity(
                    null, "Ola", "Nowak", "student2",
                    "987654321", "student2@example.com",
                    passwordEncoder.encode("pass456"),
                    role
            );

            userRepository.save(student1);
            userRepository.save(student2);
        }
    }
}
