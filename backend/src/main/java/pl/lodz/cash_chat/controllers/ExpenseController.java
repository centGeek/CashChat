package pl.lodz.cash_chat.controllers;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import pl.lodz.cash_chat.entity.ExpenseEntity;
import pl.lodz.cash_chat.entity.GroupEntity;
import pl.lodz.cash_chat.repository.ExpenseService;
import pl.lodz.cash_chat.repository.UserRepository;
import pl.lodz.cash_chat.service.GroupService;

import java.util.List;

@RestController
@RequestMapping("/api/expense")
@AllArgsConstructor
public class ExpenseController {

    private ExpenseService expenseService;

    private GroupService groupService;

    private UserRepository userRepository;

    @PostMapping("/add")
    public ResponseEntity<?> addExpense(@RequestBody ExpenseEntity expenseEntity) {
        expenseService.addExpense(expenseEntity);

        return ResponseEntity.ok("Expense was successfully created");
    }

    @GetMapping("/")
    public List<ExpenseEntity> getAll(){
        return expenseService.getAll();
    }

    @GetMapping("/{userId}")
    public List<ExpenseEntity> getAllByUserId(@PathVariable Long userId) {
        Long currentUserId = userRepository.getCurrentUserId();
        GroupEntity groupByUsers = groupService.getGroupByUsers(userId, currentUserId);
        if(groupByUsers == null){
            groupService.createNewGroup(userId, currentUserId);
            groupByUsers = groupService.getGroupByUsers(userId, currentUserId);
        }
        return groupByUsers.getExpenseEntities();
    }
}
