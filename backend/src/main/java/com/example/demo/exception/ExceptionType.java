package com.example.demo.exception;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.slf4j.event.Level;
import org.springframework.http.HttpStatus;

@RequiredArgsConstructor
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public enum ExceptionType {
  LOGIN_FAILED(HttpStatus.UNAUTHORIZED,Level.WARN),
  LOGOUT_FAILED(HttpStatus.UNAUTHORIZED,Level.WARN),
  USER_NOT_FOUND(HttpStatus.NOT_FOUND,Level.WARN),
  BOARD_ID_INVALID(HttpStatus.BAD_REQUEST,Level.WARN);


  HttpStatus httpStatus;
  Level level;

}
