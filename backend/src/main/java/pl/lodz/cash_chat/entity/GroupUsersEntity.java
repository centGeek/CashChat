package pl.lodz.cash_chat.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "group_users")
public class GroupUsersEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_users_id")
    private Long id;

    @Column(name = "group_id")
    private Integer groupId;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "user_id")
    private UserEntity userEntity;
}
