package pl.lodz.cash_chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.lodz.cash_chat.entity.GroupUsersEntity;
@Repository
public interface GroupMembersRepository extends JpaRepository<GroupUsersEntity, Long> {
}
