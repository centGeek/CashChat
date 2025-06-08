package pl.lodz.cash_chat.repository.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.lodz.cash_chat.entity.ExpenseEntity;
@Repository
public interface ExpenseJpaRepository extends JpaRepository<ExpenseEntity, Long> {

}
