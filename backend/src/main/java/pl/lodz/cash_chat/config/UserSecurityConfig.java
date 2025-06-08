package pl.lodz.cash_chat.config;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import pl.lodz.cash_chat.entity.RoleEntity;
import pl.lodz.cash_chat.entity.UserEntity;
import pl.lodz.cash_chat.repository.UserRepository;


import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class UserSecurityConfig implements UserDetailsService {

    private final UserRepository userRepository;

    @Override
    @Transactional
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<UserEntity> user = userRepository.findByEmail(email);

        if (user.isEmpty()) {
            throw new UsernameNotFoundException("User with email " + email + " not found");
        }

        SimpleGrantedAuthority authorities = getUserAuthority(user.get().getRole());

        return buildUserForAuthentication(user.get(), List.of(authorities));
    }

    private SimpleGrantedAuthority getUserAuthority(RoleEntity roleEntity) {
        return new SimpleGrantedAuthority(roleEntity.getRoleName());
    }

    private UserDetails buildUserForAuthentication(
            UserEntity user,
            List<SimpleGrantedAuthority> authorities
    ) {
        return new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                true,
                true,
                true,
                true,
                authorities
        );
    }
}
