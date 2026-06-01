package com.springinpractice.ch01.model;

import java.math.BigDecimal;
import java.util.Date; // java.util.Date로 통일하여 사용합니다.

public class Account {
	
	private String accountNo;
	private BigDecimal balance; // 오타 수정 (BigDacimal -> BigDecimal)
	private Date lastPaidOn;
	
	// 생성자 매개변수 타입을 java.util.Date로 수정
	public Account(String accountNo, BigDecimal balance, Date lastPaidOn) {
		this.accountNo = accountNo; // 점(.) 누락 수정
		this.balance = balance;
		this.lastPaidOn = lastPaidOn;
	}
	
	// 메서드명 CamelCase 적용 (getAccountNO -> getAccountNo)
	public String getAccountNo() {
		return accountNo;
	}
	
	public BigDecimal getBalance() {
		return balance;
	}
	
	public Date getLastPaidOn() {
		return lastPaidOn;
	}
}