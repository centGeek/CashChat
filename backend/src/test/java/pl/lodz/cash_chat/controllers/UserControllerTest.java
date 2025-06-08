package pl.lodz.cash_chat.controllers;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import pl.lodz.cash_chat.config.PostgresContainerConfig;
import pl.lodz.cash_chat.entity.RoleEntity;
import pl.lodz.cash_chat.entity.UserEntity;
import pl.lodz.cash_chat.repository.jpa.UserJpaRepository;

import java.util.List;

import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
@SpringBootTest(classes = {PostgresContainerConfig.class})
@AutoConfigureMockMvc
@ActiveProfiles("test")
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private UserJpaRepository userJpaRepository;

    @Test
    void shouldReturnListOfUsers() throws Exception {
        // given
        RoleEntity role = new RoleEntity("USER");
        UserEntity user = new UserEntity("Jan", "Kowalski", "janek", "123456789", "jan@a.pl", "pass", role);
        user.setId(1L);
        when(userJpaRepository.findAll()).thenReturn(List.of(user));

        // when, then
        mockMvc.perform(get("/api/user/"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1L))
                .andExpect(jsonPath("$[0].name").value("Jan"))
                .andExpect(jsonPath("$[0].surname").value("Kowalski"))
                .andExpect(jsonPath("$[0].nickname").value("janek"))
                .andExpect(jsonPath("$[0].email").value("jan@a.pl"));
    }

}