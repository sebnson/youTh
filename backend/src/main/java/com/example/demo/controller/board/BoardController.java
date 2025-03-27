package com.example.demo.controller.board;

import com.example.demo.controller.board.dto.BoardCreateRequestDto;
import com.example.demo.controller.board.dto.BoardCreateResponseDto;
import com.example.demo.service.board.IBoardService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController()
@RequestMapping("/api/boards")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class BoardController {
    IBoardService boardService;

    @PostMapping("")
    public ResponseEntity<BoardCreateResponseDto> save(@RequestBody BoardCreateRequestDto request) {
//        log.info("컨트롤러");
        BoardCreateResponseDto response = boardService.save(request);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(response);
    }

}
