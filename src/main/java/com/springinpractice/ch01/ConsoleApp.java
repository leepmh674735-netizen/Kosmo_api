package com.springinpractice.ch01;

import java.util.List;

// 잘못된 Apache Tomcat 라이브러리 대신 올바른 Spring ApplicationContext를 import합니다.
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import com.springinpractice.ch01.model.Account;
import com.springinpractice.ch01.service.AccountService;

public class ConsoleApp {
	
	public static void main(String[] args) throws Exception {
		// 1. 스프링 설정 파일(XML)을 읽어 컨테이너를 초기화합니다.
		ApplicationContext appCtx = 
			new ClassPathXmlApplicationContext("applicationContext.xml");
		
		// 2. 컨테이너로부터 의존성 주입이 완료된 accountService 빈을 가져옵니다.
		AccountService accountService = 
			(AccountService) appCtx.getBean("accountService");
		
		// 3. 서비스 메서드 호출 (오타 수정: findDeliquentAccounts -> findDelinquentAccounts)
		List<Account> delinquentAccounts = accountService.findDelinquentAccounts();

		// 4. 연체된 계좌 목록을 콘솔에 출력합니다.
		for (Account a : delinquentAccounts) {
			System.out.println(a.getAccountNo());
		}
	}
}