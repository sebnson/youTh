package com.example.demo.controller.board;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/boards")
public class BoardController {

  // 전체 글 보기
  @GetMapping
  public ResponseEntity<List<Map<String, Object>>> getAllBoards() {
    List<Map<String, Object>> response = List.of(
        Map.of(
            "id", 1,
            "content", "게시글 내용",
            "createdAt", LocalDateTime.now(),
            "modifiedAt", LocalDateTime.now(),
            "userId", 1,
            "nickname", "김북보",
            "likes", 12,
            "comments", 1
        ),
        Map.of(
            "id", 2,
            "content", "또 다른 게시글",
            "createdAt", LocalDateTime.now(),
            "modifiedAt", LocalDateTime.now(),
            "userId", 2,
            "nickname", "사용자2",
            "likes", 8,
            "comments", 3
        )
    );

    return ResponseEntity.ok(response);
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

  // 글쓰기
  @PostMapping
  public ResponseEntity<Map<String, Object>> createBoard(@RequestBody Map<String, Object> request) {
    if (request.get("content") == null || request.get("content").toString().length() > 500) {
      return ResponseEntity.badRequest().body(Map.of("status", 400, "message", "내용은 500자 이하여야 합니다."));
    }

    Map<String, Object> response = Map.of(
        "id", 1,
        "content", request.get("content"),
        "useYn", true,
        "createdAt", LocalDateTime.now(),
        "userId", 1,
        "likes", 0,
        "comments", 0
    );

    return ResponseEntity.status(HttpStatus.CREATED).body(response);
  }

  // 글 수정
  @PatchMapping("/{id}")
  public ResponseEntity<Map<String, Object>> updateBoard(@PathVariable Long id, @RequestBody Map<String, Object> request) {
    if (request.get("content") == null || request.get("content").toString().length() > 500) {
      return ResponseEntity.badRequest().body(Map.of("message", "내용은 500자 이하여야 합니다."));
    }

    Map<String, Object> response = Map.of(
        "id", id,
        "content", request.get("content"),
        "useYn", true,
        "createdAt", LocalDateTime.now(),
        "modifiedAt", LocalDateTime.now(),
        "userId", 1,
        "likes", 1,
        "comments", 1
    );

    return ResponseEntity.ok(response);
  }

  // 글 삭제
  @DeleteMapping("/{id}")
  public ResponseEntity<Map<String, String>> deleteBoard(@PathVariable Long id) {
    return ResponseEntity.ok(Map.of("message", "글 삭제 완료"));
  }
}