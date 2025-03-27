package com.example.demo.controller.board.dto;

import com.example.demo.entity.Board;
import java.time.LocalDateTime;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PACKAGE)
public class BoardResponseDto {
    Integer id;
    String content;
    Boolean useYn;
    LocalDateTime createdAt;
    Integer userId;
    Integer likes;
    Integer comments;

    public static BoardResponseDto from(Board board) {
        return new BoardResponseDto(
            board.getId(),
            board.getContent(),
            board.getUseYn(),
            board.getCreatedAt(),
            board.getUser().getId(),
            board.getLikes().size(),
            board.getComments().size()
        );
    }
}
