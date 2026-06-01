package com.springinpractice.ch01.dao.jdbc;

import java.util.List;

import com.springinpractice.ch01.model.Account;

public interface AcccountDao {
	
	List<Account> findAll() throws Exception;

}
