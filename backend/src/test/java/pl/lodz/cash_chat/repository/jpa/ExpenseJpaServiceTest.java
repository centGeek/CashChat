package pl.lodz.cash_chat.repository.jpa;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import pl.lodz.cash_chat.config.PostgresContainerConfig;
import pl.lodz.cash_chat.entity.*;

import java.math.BigDecimal;

@DataJpaTest
@Import({PostgresContainerConfig.class})
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class ExpenseJpaServiceTest {

    @Autowired
    private ExpenseJpaRepository expenseJpaRepository;

    @Autowired
    private GroupJpaRepository groupJpaRepository;

    @Autowired
    private UserJpaRepository userJpaRepository;

    @Autowired
    private RoleJpaRepository roleJpaRepository;
    @Test
    void thatExpenseIsAddedCorrectly(){

        //given
        GroupEntity groupEntity = new GroupEntity("Slawek", "nasza");
        RoleEntity roleEntity = new RoleEntity("USER");
        UserEntity userEntity = new UserEntity("Jan", "Kowalski", "janek", "+48 443 343 233", "janek@cashchat.com",
                "test", roleEntity);
        ExpenseEntity expenseEntity = new ExpenseEntity("piwo", BigDecimal.valueOf(35),
                TypeOfDivision.HALF, groupEntity,
                userEntity);

        roleJpaRepository.save(roleEntity);
        userJpaRepository.save(userEntity);
        groupJpaRepository.save(groupEntity);

        //when
        expenseJpaRepository.save(expenseEntity);

        //then
        ExpenseEntity actualExpense = expenseJpaRepository.findAll().stream().findFirst().get();

        Assertions.assertEquals(actualExpense.getDescription(), expenseEntity.getDescription());
        Assertions.assertEquals(actualExpense.getTypeOfDivision(), expenseEntity.getTypeOfDivision());
        Assertions.assertEquals(actualExpense.getValue(), expenseEntity.getValue());

    }

}