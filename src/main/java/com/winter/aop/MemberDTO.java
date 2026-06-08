package com.winter.aop;

import java.time.LocalDateTime;

import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedBy;
import org.springframework.data.annotation.LastModifiedDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name="notices")
public class MemberDTO {
	
	@Id
	private Long id;
	@Lob
	private String content;
	
	@Column(updatable = false)
	@CreatedDate
	private LocalDateTime createdAt;
	@Column
	private boolean isPrinned=false;
	@Column
	private String title;
	@LastModifiedDate
	private LocalDateTime updatedAt;
	@Column
	private Long views=0L;
	
	private String username;

}
