/* * Copyright (c) 2013 Manning Publications Co.
 * * Book: http://manning.com/wheeler/
 * Blog: http://springinpractice.com/
 * Code: https://github.com/springinpractice
 */
package com.springinpractice.ch01.dao.csv;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.math.BigDecimal;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import org.springframework.core.io.Resource;
import com.springinpractice.ch01.dao.AccountDao;
import com.springinpractice.ch01.model.Account;

public class CsvAccountDao implements AccountDao {

	private Resource csvResource; 
	
	public void setCsvResource(Resource csvFile) {
		this.csvResource = csvFile;
	}
	
	@Override
	public List<Account> findAll() throws Exception {
		List<Account> results = new ArrayList<>();
		DateFormat fmt = new SimpleDateFormat("MMddyyyy");		
		
		// try-with-resources 구문으로 BufferedReader 자동 close 보장
		// csvResource.getInputStream()을 사용하여 JAR 내부 리소스 로딩 대응
		try (BufferedReader br = new BufferedReader(
				new InputStreamReader(csvResource.getInputStream(), "UTF-8"))) {
			
			String line;
			while ((line = br.readLine()) != null) {
				// 빈 줄이거나 공백만 있는 줄은 스킵 (방어적 코드)
				if (line.trim().isEmpty()) {
					continue;
				}
				
				String[] fields = line.split(",");
				
				// 배열 크기 체크로 예외 방지
				if (fields.length >= 3) {
					String accountNo = fields[0].trim();
					BigDecimal balance = new BigDecimal(fields[1].trim());
					Date lastPaidOn = fmt.parse(fields[2].trim());
					
					Account account = new Account(accountNo, balance, lastPaidOn);			
					results.add(account);
				}
			}
		} // 이 중괄호를 벗어나면 br이 자동으로 close 됩니다.
		
		return results;
	}
}