package com.example.demo.service.board;

import com.example.demo.controller.board.dto.BoardCreateRequestDto;
import com.example.demo.controller.board.dto.BoardResponseDto;
import com.example.demo.entity.Board;
import com.example.demo.entity.User;
import com.example.demo.exception.CustomException;
import com.example.demo.exception.ExceptionType;
import com.example.demo.repository.board.BoardRepository;
import com.example.demo.repository.user.UserRepository;
import java.util.List;
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

        User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new CustomException("사용자 없음",
            ExceptionType.USER_NOT_FOUND));

        Board entity = request.toEntity();
        entity.setUser(user);
        user.getBoards().add(entity);

        Board created = boardRepository.save(entity);

        return BoardResponseDto.from(created);
    }

    public List<BoardResponseDto> getAllBoards() {
        List<Board> boards = boardRepository.findAll();
        return boards.stream()
            .map(BoardResponseDto::from)
            .toList();
    }
}
