package pl.lodz.cash_chat.repository;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Repository;
import pl.lodz.cash_chat.entity.GroupEntity;
import pl.lodz.cash_chat.repository.jpa.GroupJpaRepository;

import java.util.List;

@Repository
@AllArgsConstructor
public class GroupRepository {

    private GroupJpaRepository groupJpaRepository;

    @Transactional
    public void addGroup(GroupEntity groupEntity){
        List<GroupEntity> byDescription = groupJpaRepository.findByDescription(groupEntity.getDescription());
        if (byDescription.isEmpty()){
            groupJpaRepository.save(groupEntity);
        }
    }
}
