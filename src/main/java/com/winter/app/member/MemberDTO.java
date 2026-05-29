package com.winter.app.member;

import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Transient;
import jakarta.validation.constraints.NotBlank; 
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Entity
@Getter
@Setter
@ToString
@Table(name = "tb_users")
public class MemberDTO implements UserDetails { 
    @Id
    @NotBlank(message = "아이디는 필수 입력 항목입니다.") 
    @Column(name = "username") 
    private String username;

    @Column(nullable = false) 
    private String password;

    @Transient 
    private String passwordCheck;

    @Column
    private String name;

    @Column
    private String email;
}