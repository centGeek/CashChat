package pl.lodz.cash_chat.service;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import pl.lodz.cash_chat.entity.GroupEntity;
import pl.lodz.cash_chat.entity.GroupUsersEntity;
import pl.lodz.cash_chat.entity.UserEntity;
import pl.lodz.cash_chat.repository.GroupRepository;
import pl.lodz.cash_chat.repository.UserRepository;
import pl.lodz.cash_chat.repository.jpa.GroupJpaRepository;
import pl.lodz.cash_chat.repository.jpa.GroupMembersJpaRepository;

import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class GroupService {

    private GroupMembersJpaRepository groupMembersJpaRepository;
    private GroupJpaRepository groupJpaRepository;
    private GroupRepository groupRepository;
    private UserRepository userRepository;

    public GroupEntity getGroupByUsers(Long id1, Long id2) {
        List<Long> userIds = List.of(id1, id2);
        System.out.println("EEEEHO");
        groupMembersJpaRepository.findAll().forEach(System.out::println);
        List<Long> groupIds = groupMembersJpaRepository.findGroupIdsByUserIds(userIds, userIds.size());

        if (groupIds.isEmpty()) {
            return null;
        }

        Long groupId = groupIds.get(0);

        return groupJpaRepository.findById(groupId).orElse(null);
    }

    public void createNewGroup(Long id1, Long id2) {
        String description = "" + id1 + id2;
        groupRepository.addGroup(new GroupEntity(description, "group_name"));
        List<GroupEntity> byDescription = groupJpaRepository.findByDescription(description);
        Optional<UserEntity> byId1 = userRepository.findById(id1);
        Optional<UserEntity> byId2 = userRepository.findById(id2);
        groupMembersJpaRepository.save(new GroupUsersEntity(byDescription.get(0), byId1.get()));
        groupMembersJpaRepository.save(new GroupUsersEntity(byDescription.get(0), byId2.get()));

    }
}
