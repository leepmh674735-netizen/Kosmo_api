package com.springinpractice.ch01.dao.jdbc;

import javax.sql.DataSource;
import java.util.List;
import com.springinpractice.ch01.dao.AccountDao;
import com.springinpractice.ch01.model.Account;

public class JdbcAccountDao implements AccountDao {

	// 상위 인터페이스인 javax.sql.DataSource를 사용하여 유연성을 높입니다.
	private DataSource dataSource;
	
	// 1. 스프링이 수정자(Setter)를 통해 DataSource 빈(Bean)을 주입해 줍니다.
	public void setDataSource(DataSource dataSource) {
		this.dataSource = dataSource;
	}
	
	// 2. 인터페이스(AccountDao)에 정의된 메서드들을 구현해야 합니다.
	@Override
	public List<Account> findAll() throws Exception {
		// 여기에 JDBC API(또는 JdbcTemplate)를 사용해 
		// DB에서 데이터를 조회하는 로직이 들어갑니다.
		return null; 
	}
}