package pl_lodz.cash_chat;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.context.annotation.Import;

@Import(TestcontainersConfiguration.class)
@SpringBootTest
class CashChatApplicationTests {

	@Test
	void contextLoads() {
	}

}
