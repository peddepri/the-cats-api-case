package com.priscila.catsapi;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class CatsapiApplicationTests {

	@Test
	void contextLoads() {
	}

	@Test
	void deveExecutarMetodoMain() {
		CatsapiApplication.main(new String[]{});
	}

}
