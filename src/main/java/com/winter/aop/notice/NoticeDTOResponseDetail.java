package com.winter.aop.notice;

import java.time.LocalDateTime;

public record NoticeDTOResponseDetail(
    Long id,
    
    String content,
    
    LocalDateTime createdAt,
    
    boolean isPinned,
    
    String title,
    
    LocalDateTime updatedAt,
    
    Long views
) {}