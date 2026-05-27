package com.winter.app.notice;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "tb_notice")
@Getter
@Setter
public class NoticeDTO {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long boardNum;
	@Column
	private String boardTitle;
	@Column
	private String boardWriter;
	@Column
	private String boardContents;

}
