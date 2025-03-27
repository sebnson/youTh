package com.example.demo.service.board;

import com.example.demo.controller.board.dto.BoardCreateRequestDto;
import com.example.demo.controller.board.dto.BoardResponseDto;

public interface IBoardService {
    BoardResponseDto save(BoardCreateRequestDto request);
}
