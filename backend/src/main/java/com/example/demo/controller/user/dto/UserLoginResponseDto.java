package com.example.demo.controller.user.dto;

import com.example.demo.entity.Board;
import com.example.demo.entity.BoardLike;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import com.example.demo.entity.User;

@Getter
@RequiredArgsConstructor(access = AccessLevel.PRIVATE)
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserLoginResponseDto {

  Integer id;
  String email;
  String name;
  String nickname;
  boolean useYn;
  LocalDateTime createdAt;
  LocalDateTime modifiedAt;

  public static UserLoginResponseDto from(User user) {
    return new UserLoginResponseDto(user.getId(), user.getEmail(), user.getName(),
        user.getNickname(),user.isUseYn(),user.getCreatedAt(),user.getModifiedAt());

  }


}
