package com.example.demo.controller.user;

import com.example.demo.controller.user.dto.UserLoginRequestDto;
import com.example.demo.controller.user.dto.UserLoginResponseDto;
import com.example.demo.controller.user.dto.UserLogoutRequestDto;
import com.example.demo.exception.CustomException;
import com.example.demo.exception.ExceptionType;
import com.example.demo.service.user.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
@RequestMapping(value = "api/users")
public class UserController {
  public static final String LOGIN_MEMBER = "loginMember";
  UserService userService;

  @PostMapping(value = "/login")
  public ResponseEntity<UserLoginResponseDto> login(@RequestBody UserLoginRequestDto request, HttpServletRequest httpServletRequest) {
    UserLoginResponseDto responseDto = userService.login(request);
    HttpSession session = httpServletRequest.getSession();
    session.setAttribute(LOGIN_MEMBER, responseDto);
    log.info("세션이 유효합니다. 사용자: {}", session.getAttribute(LOGIN_MEMBER));
    return ResponseEntity.ok(responseDto);
  }
  @PostMapping(value = "/logout")
  public ResponseEntity<Void> logout(@RequestBody UserLogoutRequestDto request,HttpServletRequest httpServletRequest) {
    HttpSession session = httpServletRequest.getSession();
    if (session != null) {
      UserLoginResponseDto userLoggedIn = (UserLoginResponseDto) session.getAttribute(LOGIN_MEMBER);
      Integer loggedId = userLoggedIn.getId();
      if(loggedId != request.getId()){
        log.info("id: {}", loggedId);
        throw new CustomException("로그인 한 사용자가 아닙니다.", ExceptionType.LOGOUT_FAILED);

      }
      log.info("로그아웃 완료. 사용자: {}", session.getAttribute(LOGIN_MEMBER));
      session.invalidate();

    }
    return ResponseEntity.ok(null);

  }




}
