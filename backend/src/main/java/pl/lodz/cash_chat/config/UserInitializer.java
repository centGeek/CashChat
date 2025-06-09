package pl.lodz.cash_chat.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.ApplicationListener;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;
import pl.lodz.cash_chat.entity.RoleEntity;
import pl.lodz.cash_chat.entity.UserEntity;
import pl.lodz.cash_chat.repository.jpa.RoleJpaRepository;
import pl.lodz.cash_chat.repository.jpa.UserJpaRepository;

@Component
@RequiredArgsConstructor
public class UserInitializer implements ApplicationListener<ApplicationReadyEvent> {

    private final UserJpaRepository userJpaRepository;

    private final RoleJpaRepository roleJpaRepository;

    private final PasswordEncoder passwordEncoder;
    @Override
    public void onApplicationEvent(ApplicationReadyEvent event) {
        if (userJpaRepository.count() == 0) {
            RoleEntity role = new RoleEntity( "USER");
            roleJpaRepository.save(role);
            UserEntity student1 = new UserEntity(
                    null, "Jan", "Kowalski", "student1",
                    "123456789", "student1@cashchat.com",
                    passwordEncoder.encode("pass123"),
                    role
            );

            UserEntity student2 = new UserEntity(
                    null, "Ola", "Nowak", "student2",
                    "987654321", "student2@cashchat.com",
                    passwordEncoder.encode("pass456"),
                    role
            );

            UserEntity student3 = new UserEntity(
                    null, "Izabela", "Kot", "student3",
                    "997997997", "student3@cashchat.com",
                    passwordEncoder.encode("pass789"),
                    role
            );

            userJpaRepository.save(student1);
            userJpaRepository.save(student2);
            userJpaRepository.save(student3);
        }
    }
}
