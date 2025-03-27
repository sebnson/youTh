package com.example.demo.service.user;

import com.example.demo.controller.user.dto.UserLoginRequestDto;
import com.example.demo.controller.user.dto.UserLoginResponseDto;
import com.example.demo.entity.User;
import com.example.demo.repository.user.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class UserService {

  UserRepository userRepository;

  public UserLoginResponseDto login(UserLoginRequestDto requestDto) {

    String email = requestDto.getEmail();
    String password = requestDto.getPassword();
    User user = userRepository.findByEmail(email)
        .orElseThrow(() -> new RuntimeException("이메일에 해당하는 유저 없음"));
    if (!password.equals(user.getPassword())) {
      throw new RuntimeException("비밀번호가 올바르지 않습니다");

    }
    UserLoginResponseDto responseDto = UserLoginResponseDto.from(user);
    return responseDto;

  }

}