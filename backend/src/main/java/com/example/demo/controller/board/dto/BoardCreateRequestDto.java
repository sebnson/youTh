package com.example.demo.controller.board.dto;

import com.example.demo.entity.Board;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Getter
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class BoardCreateRequestDto {
    Integer userId;
    String content;

    public Board toEntity() {
        log.info("엔티티: {}", content);
        return Board.builder()
            .content(content)
            .createdAt(LocalDateTime.now())
            .build();
    }
}
