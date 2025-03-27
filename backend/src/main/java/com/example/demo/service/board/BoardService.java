package com.example.demo.service.board;

import com.example.demo.controller.board.dto.BoardCreateRequestDto;
import com.example.demo.controller.board.dto.BoardResponseDto;
import com.example.demo.entity.Board;
import com.example.demo.entity.User;
import com.example.demo.repository.board.BoardRepository;
import com.example.demo.repository.user.UserRepository;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class BoardService implements IBoardService {
    BoardRepository boardRepository;
    UserRepository userRepository;

    public BoardResponseDto save(BoardCreateRequestDto request) {
        log.info("들어온 req: {}", request.getContent());

        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("사용자 없음"));

        Board entity = request.toEntity();
        entity.setUser(user);
        user.getBoards().add(entity);

        Board created = boardRepository.save(entity);

        return BoardResponseDto.from(created);
    }

    ;
}
