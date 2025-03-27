package com.example.demo.service.board;

import com.example.demo.controller.board.dto.BoardCreateRequestDto;
import com.example.demo.controller.board.dto.BoardResponseDto;
import java.util.List;

public interface IBoardService {
    BoardResponseDto save(BoardCreateRequestDto request);

    List<BoardResponseDto> getAllBoards();
}
