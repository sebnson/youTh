package com.example.demo.exception;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.experimental.FieldDefaults;

@Getter
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CustomException extends RuntimeException {

  public CustomException(String message, ExceptionType type) {
    super(message);
    this.type = type;
  }
  ExceptionType type;
}
