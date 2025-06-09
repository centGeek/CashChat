package pl.lodz.cash_chat.repository.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import pl.lodz.cash_chat.entity.GroupUsersEntity;

import java.util.List;

@Repository
public interface GroupMembersJpaRepository extends JpaRepository<GroupUsersEntity, Long> {

    @Query("SELECT gu.groupEntity.id FROM group_users gu WHERE gu.userEntity.id = :userId")
    List<Long> findGroupIdsByUserId(@Param("userId") Long userId);

    @Query("SELECT gu.groupEntity.id FROM group_users gu WHERE gu.userEntity.id IN (:userIds) GROUP BY gu.groupEntity.id HAVING COUNT(DISTINCT gu.userEntity.id) = :count")
    List<Long> findGroupIdsByUserIds(@Param("userIds") List<Long> userIds, @Param("count") long count);
}
