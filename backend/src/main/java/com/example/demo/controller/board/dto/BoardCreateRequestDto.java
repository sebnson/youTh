package com.example.demo.controller.board.dto;

import com.example.demo.entity.Board;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
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
    @NotNull(message = "내용을 입력해주세요.")
    @Size(max = 500, message = "내용은 500자 이내여야 합니다.")
    String content;

    public Board toEntity() {
        log.info("엔티티: {}", content);
        return Board.builder()
            .content(content)
            .createdAt(LocalDateTime.now())
            .build();
    }
}
