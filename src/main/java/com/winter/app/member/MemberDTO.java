package com.winter.app.member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="tb_users")
public class MemberDTO {
	@Id
	private String useranme;
	@Column
	private String password;
	
	private String passwordCheck;
	
	@Column
	private String name;
	
	@Column
	private String email;

}
