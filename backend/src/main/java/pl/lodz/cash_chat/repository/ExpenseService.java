package pl.lodz.cash_chat.repository;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import pl.lodz.cash_chat.entity.ExpenseEntity;
import pl.lodz.cash_chat.repository.jpa.ExpenseJpaRepository;

import java.util.List;

@Repository
@AllArgsConstructor
public class ExpenseService {

    private ExpenseJpaRepository expenseJpaRepository;

    public void addExpense(ExpenseEntity expenseEntity) {
        expenseJpaRepository.save(expenseEntity);
    }

    public List<ExpenseEntity> getAll() {
        return expenseJpaRepository.findAll();
    }

//    public List<ExpenseEntity> getAllBy
}
