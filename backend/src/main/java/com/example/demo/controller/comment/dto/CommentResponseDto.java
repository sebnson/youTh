package com.example.demo.controller.comment.dto;

import com.example.demo.entity.Board;
import com.example.demo.entity.Comment;
import com.example.demo.entity.CommentLike;
import com.example.demo.entity.User;
import jakarta.persistence.Column;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CommentResponseDto {
  Integer id;
  String content;

  boolean useYn = true;
  LocalDateTime createdAt;
  LocalDateTime modifiedAt;
  Integer userId;
  String nickname;
  Integer like;

  public static CommentResponseDto from(Comment comment,Integer userId, String nickname) {
    return new CommentResponseDto(comment.getId(), comment.getContent(), comment.getCreatedAt(),comment.getModifiedAt(),userId,nickname,comment.getLikes().size());
  }


}
