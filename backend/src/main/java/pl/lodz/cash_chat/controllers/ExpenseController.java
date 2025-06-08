package pl.lodz.cash_chat.controllers;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.lodz.cash_chat.entity.ExpenseEntity;
import pl.lodz.cash_chat.repository.ExpenseService;

import java.util.List;

@RestController
@RequestMapping("/api/expense")
@AllArgsConstructor
public class ExpenseController {

    private ExpenseService expenseService;
    @PostMapping("/add")
    public ResponseEntity<?> addExpense(@RequestBody ExpenseEntity expenseEntity) {
        expenseService.addExpense(expenseEntity);

        return ResponseEntity.ok("Expense was successfully created");
    }

    @GetMapping("/")
    public List<ExpenseEntity> getAll(){
        return expenseService.getAll();
    }
}
