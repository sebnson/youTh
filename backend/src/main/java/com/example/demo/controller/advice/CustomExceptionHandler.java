package com.example.demo.controller.advice;

import com.example.demo.exception.CustomException;
import com.example.demo.exception.ExceptionType;
import jakarta.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.event.Level;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@Slf4j
@RestControllerAdvice
public class CustomExceptionHandler {
  @ExceptionHandler
  public ResponseEntity<ErrorDetail> handle(HttpServletRequest request, CustomException e) {
    ExceptionType type = e.getType();
    HttpStatus httpStatus = type.getHttpStatus();
    String message = e.getMessage();
    Level level = type.getLevel();
    log.atLevel(level).setCause(e).log("[Custom]: "+e.getMessage());

    ErrorDetail errorDetail = ErrorDetail.builder().timestamp(LocalDateTime.now()).message(message).status(httpStatus.value()).path(request.getMethod()+ "-"+request.getRequestURI()).build();
    return ResponseEntity.status(httpStatus).body(errorDetail);

  }
  @ExceptionHandler
  public ResponseEntity<ErrorDetail> handle(HttpServletRequest request, Exception e){
    HttpStatus httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    String message = e.getMessage();
    log.error("[Internal Server error]: "+e.getMessage(),e);
    ErrorDetail errorDetail = ErrorDetail.builder().timestamp(LocalDateTime.now()).message("내부 서버 에러").status(httpStatus.value()).path(request.getMethod()+ "-"+request.getRequestURI()).build();
    return ResponseEntity.status(httpStatus).body(errorDetail);


    
  }
}
