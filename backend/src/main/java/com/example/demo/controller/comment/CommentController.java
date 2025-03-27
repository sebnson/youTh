package com.example.demo.controller.comment;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/boards/{boardId}/comments")
public class CommentController {
  // 한 게시물의 전체 댓글 보기
  @GetMapping
  public ResponseEntity<?> getComments(@PathVariable Long boardId) {
    if (boardId == null) {
      return ResponseEntity.status(401).body(Map.of("message", "잘못된 요청입니다."));
    }

    Map<String, Object> response = Map.of(
        "boardId", boardId,
        "comments", List.of(
            Map.of(
                "id", 1,
                "content", "좋은 글이네요!",
                "useYn", true,
                "createdAt", LocalDateTime.now().toString(),
                "modifiedAt", LocalDateTime.now().toString(),
                "userId", 1,
                "nickname", "길동이",
                "likes", 3
            ),
            Map.of(
                "id", 2,
                "content", "동감합니다!",
                "useYn", true,
                "createdAt", LocalDateTime.now().toString(),
                "modifiedAt", LocalDateTime.now().toString(),
                "userId", 2,
                "nickname", "코딩왕",
                "likes", 5
            )
        )
    );

    return ResponseEntity.ok(response);
  }

  // 한 게시물의 한 댓글 쓰기
  @PostMapping
  public ResponseEntity<?> createComment(@PathVariable Long boardId, @RequestBody Map<String, String> request) {
    String content = request.get("content");
    if (content == null || content.length() > 100) {
      return ResponseEntity.badRequest().body(Map.of("message", "내용은 100자 이하여야 합니다."));
    }

    Map<String, Object> response = Map.of(
        "id", 123,
        "userId", 1,
        "nickname", "닉네임",
        "createdAt", LocalDateTime.now().toString(),
        "content", content
    );

    return ResponseEntity.status(201).body(response);
  }

  // 한 댓글 수정
  @PatchMapping("/{commentId}")
  public ResponseEntity<?> updateComment(@PathVariable Long boardId, @PathVariable Long commentId, @RequestBody Map<String, String> request) {
    String content = request.get("content");
    if (content == null || content.length() > 100) {
      return ResponseEntity.badRequest().body(Map.of("message", "내용은 100자 이하여야 합니다."));
    }

    Map<String, Object> response = Map.of(
        "id", commentId,
        "nickname", "닉네임",
        "modifiedAt", LocalDateTime.now().toString(),
        "content", content
    );

    return ResponseEntity.status(201).body(response);
  }

  // 한 댓글 삭제
  @DeleteMapping("/{commentId}")
  public ResponseEntity<?> deleteComment(@PathVariable Long boardId, @PathVariable Long commentId) {
    if (commentId == null) {
      return ResponseEntity.badRequest().body(Map.of("status", 400, "message", "댓글 삭제 실패"));
    }

    return ResponseEntity.ok().build();
  }

}
