package pl.lodz.cash_chat.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import pl.lodz.cash_chat.entity.GroupEntity;
@Repository
public interface GroupRepository extends JpaRepository<GroupEntity, Long> {
}
