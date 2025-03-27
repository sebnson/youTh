package com.example.demo.controller.board;

import com.example.demo.controller.board.dto.BoardCreateRequestDto;
import com.example.demo.controller.board.dto.BoardResponseDto;
import com.example.demo.service.board.IBoardService;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@Slf4j
@RestController
@RequestMapping("/api/boards")
@RequiredArgsConstructor
@FieldDefaults(makeFinal = true, level = AccessLevel.PRIVATE)
public class BoardController {
    IBoardService boardService;

    // 글 등록
    @PostMapping("")
    public ResponseEntity<BoardResponseDto> save(@RequestBody BoardCreateRequestDto request) {
        BoardResponseDto response = boardService.save(request);
        return ResponseEntity
            .status(HttpStatus.CREATED)
            .body(response);
    }

    // 전체 글 보기
    @GetMapping
    public ResponseEntity<List<BoardResponseDto>> getAllBoards() {
        List<BoardResponseDto> response = boardService.getAllBoards();
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(response);
    }

    // 사용자 작성 글 목록 보기
    @GetMapping("by-user/{userId}")
    public ResponseEntity<List<BoardResponseDto>> getUserBoards(@PathVariable Integer userId) {
        List<BoardResponseDto> response = boardService.getUserBoards(userId);
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(response);
    }

    // 글 하나 보기
    @GetMapping("/{id}")
    public ResponseEntity<Map<String, Object>> getBoard(@PathVariable Long id) {
        Map<String, Object> response = Map.of(
            "id", id,
            "content", "게시글 내용",
            "createdAt", LocalDateTime.now(),
            "modifiedAt", LocalDateTime.now(),
            "userId", 1,
            "nickname", "사용자1",
            "likes", 12,
            "comments", 1
        );

        return ResponseEntity.ok(response);
    }

    // 글 수정
    @PatchMapping("/{id}")
    public ResponseEntity<BoardResponseDto> updateBoard(@PathVariable Integer id,
        @RequestBody BoardCreateRequestDto request) {
        BoardResponseDto response = boardService.updateBoard(id, request);
        return ResponseEntity
            .status(HttpStatus.OK)
            .body(response);
    }

//    @PatchMapping("/{id}")
//    public ResponseEntity<Map<String, Object>> updateBoard(@PathVariable Long id,
//        @RequestBody Map<String, Object> request) {
//        if (request.get("content") == null || request.get("content").toString().length() > 500) {
//            return ResponseEntity.badRequest().body(Map.of("message", "내용은 500자 이하여야 합니다."));
//        }
//
//        Map<String, Object> response = Map.of(
//            "id", id,
//            "content", request.get("content"),
//            "useYn", true,
//            "createdAt", LocalDateTime.now(),
//            "modifiedAt", LocalDateTime.now(),
//            "userId", 1,
//            "likes", 1,
//            "comments", 1
//        );
//
//        return ResponseEntity.ok(response);
//    }

    // 글 삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Map<String, String>> deleteBoard(@PathVariable Long id) {
        return ResponseEntity.ok(Map.of("message", "글 삭제 완료"));
    }
}