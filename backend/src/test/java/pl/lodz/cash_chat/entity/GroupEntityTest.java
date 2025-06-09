package pl.lodz.cash_chat.entity;

import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

class GroupEntityTest {

    @Test
    void testGroup() {
        String description = "group";
        String name = "some";
        GroupEntity groupEntity = new GroupEntity(description, name);

        String actualName = groupEntity.getName();
        String actualDescription = groupEntity.getDescription();

        Assertions.assertEquals(description, actualDescription);
        Assertions.assertEquals(name, actualName);
    }
}
