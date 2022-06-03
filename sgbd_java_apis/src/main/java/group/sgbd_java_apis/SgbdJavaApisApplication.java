package group.sgbd_java_apis;

import classes.CommandHandler;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class SgbdJavaApisApplication {

	public static void main(String[] args) {
		SpringApplication.run(SgbdJavaApisApplication.class, args);
		CommandHandler commandHandler = new CommandHandler();
		commandHandler.run();
	}
}
