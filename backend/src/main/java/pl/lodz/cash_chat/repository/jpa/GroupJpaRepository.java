package pl.lodz.cash_chat.repository.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.lodz.cash_chat.entity.GroupEntity;

import java.util.List;

@Repository
public interface GroupJpaRepository extends JpaRepository<GroupEntity, Long> {

    @Query("SELECT g FROM user_group g WHERE g.description = :description")
    List<GroupEntity> findByDescription(@Param("description") String description);
}
