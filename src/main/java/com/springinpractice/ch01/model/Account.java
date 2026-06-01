package com.springinpractice.ch01.model;

import java.math.BigDecimal;
import java.sql.Date;

import javax.xml.crypto.Data;

public class Account {
	
	private String accountNo;
	private BigDacimal balance;
	private Date lastPaidOn;
	
	public Account(String accountNo, BigDecimal balance , Data lastPaidOn) {
		this accountNo = accountNo;
		this.balance = balance;
		this.lastPaidOn = lastPaidOn;
	}
	
	public String getAccountNO() {
		return accountNo;
	}
	
	public BigDecimal getBalance() {
		return balance;
	}
	
	public Date getLastPaidOn() {
		return lastPaidOn;
	}
}