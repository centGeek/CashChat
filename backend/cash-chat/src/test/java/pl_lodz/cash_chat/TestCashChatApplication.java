package pl_lodz.cash_chat;

import org.springframework.boot.SpringApplication;

public class TestCashChatApplication {

	public static void main(String[] args) {
		SpringApplication.from(CashChatApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
