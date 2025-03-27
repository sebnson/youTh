package com.example.demo.service.board;

import com.example.demo.controller.board.dto.BoardCreateRequestDto;
import com.example.demo.controller.board.dto.BoardCreateResponseDto;

public interface IBoardService {
    BoardCreateResponseDto save(BoardCreateRequestDto request);
}
