package com.winter.app.member;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Entity
@Table(name="tb_users")
public class MemberDTO implements UserDetails {

    @Id
    private String username; 
    private String password;
    private String role;     // 데이터베이스에 "ROLE_USER" 형태로 저장된다고 가정
    private String email;
    private String name;

    // 데이터 바인딩 및 MyBatis/JPA를 위한 Getter / Setter
    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    // =================================================================
    // UserDetails 필수 구현 메서드들
    // =================================================================
    
    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> authorities = new ArrayList<>();
        
        // 데이터베이스에서 가져온 role 값이 null이 아닐 때만 권한 리스트에 추가 (Null 방어)
        if (this.role != null && !this.role.isEmpty()) {
            authorities.add(new SimpleGrantedAuthority(this.role));
        } else {
            // 권한이 없을 경우 기본 권한 부여 혹은 빈 리스트 유지
            authorities.add(new SimpleGrantedAuthority("ROLE_USER")); 
        }
        
        return authorities;
    }

    @Override
    public String getPassword() {
        return this.password;
    }

    @Override
    public String getUsername() {
        return this.username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true; 
    }

    @Override
    public boolean isAccountNonLocked() {
        return true; 
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true; 
    }

    @Override
    public boolean isEnabled() {
        return true; 
    }
}