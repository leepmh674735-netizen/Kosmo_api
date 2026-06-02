package com.springinpractice.ch01.service;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.List;

import com.springinpractice.ch01.dao.jdbc.AccountDao; // 인터페이스 import
import com.springinpractice.ch01.model.Account;

public class AccountService {
	
	// 구체적인 JdbcAccountDao 대신 상위 인터페이스인 AccountDao를 사용합니다.
	private AccountDao accountDao;
	
	// 기본 생성자 오타 수정
	public AccountService() {}
	
	// 스프링이 의존성을 주입(DI)할 수 있도록 Setter 메서드를 제공합니다.
	public void setAccountDao(AccountDao accountDao) {
		this.accountDao = accountDao;
	}
		
	// 메서드명 오타 수정 (findDeliquentAccountcs -> findDelinquentAccounts)
	public List<Account> findDelinquentAccounts() throws Exception {
		// ArrayList 제네릭 오타 수정
		List<Account> delinquentAccounts = new ArrayList<Account>();
		
		// 변수명 통일 (accounts)
		List<Account> accounts = accountDao.findAll();
		
		Date thirtyDaysAgo = daysAgo(30);
		for (Account account : accounts) {
			// 잔액이 0보다 큰지 확인 (owesMoney)
			boolean owesMoney = account.getBalance()
				.compareTo(BigDecimal.ZERO) > 0; 
			
			// 마지막 결제일이 30일 전이거나 그보다 더 과거인지 확인
			boolean thirtyDaysLate = account.getLastPaidOn()
				.compareTo(thirtyDaysAgo) <= 0;
			 
			if (owesMoney && thirtyDaysLate) {
				delinquentAccounts.add(account);
			}
		}
		return delinquentAccounts;
	}
	
	// java.util.Date를 반환하도록 수정하고 Calendar 연산 적용
	private static Date daysAgo(int days) {
		GregorianCalendar gc = new GregorianCalendar();
		gc.add(Calendar.DATE, -days);
		return gc.getTime(); // java.util.Date 반환
	}	
}