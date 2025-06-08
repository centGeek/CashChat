package pl.lodz.cash_chat.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigDecimal;

@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "expense")
@Getter
@Setter
public class ExpenseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "expense_id")
    private Long id;

    @Column(name = "description")
    private String description;

    @Column(name = "value")
    private BigDecimal value;

    @Enumerated(EnumType.STRING)
    @Column(name = "type_of_division")
    private TypeOfDivision typeOfDivision;

    @ManyToOne
    @JoinColumn(name = "group_id", referencedColumnName = "group_id")
    private GroupEntity groupEntity;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private UserEntity userEntity;

    public ExpenseEntity(String description, BigDecimal value, TypeOfDivision typeOfDivision, GroupEntity groupEntity, UserEntity userEntity) {
        this.description = description;
        this.value = value;
        this.typeOfDivision = typeOfDivision;
        this.groupEntity = groupEntity;
        this.userEntity = userEntity;
    }
}
