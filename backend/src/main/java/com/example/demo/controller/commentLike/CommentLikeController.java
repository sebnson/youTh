package com.example.demo.controller.commentLike;


import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.atomic.AtomicInteger;
@RestController
@RequestMapping("api/comments/{id}/likes")
public class CommentLikeController {
  private final AtomicInteger likeCount = new AtomicInteger(2); // 기본 좋아요 수 (예제용)

  // 한 댓글 좋아요 하기
  @PostMapping
  public ResponseEntity<Map<String, Object>> likeComment(@PathVariable Long id, @RequestBody Map<String, Object> request) {
    if (request.get("userId") == null) {
      return ResponseEntity.badRequest().body(Map.of("message", "좋아요 실패"));
    }

    int updatedLikes = likeCount.incrementAndGet();
    return ResponseEntity.status(HttpStatus.CREATED).body(Map.of("likes", updatedLikes));
  }

  // 한 댓글 좋아요 취소
  @DeleteMapping
  public ResponseEntity<Map<String, Object>> unlikeComment(@PathVariable Long id, @RequestBody Map<String, Object> request) {
    if (request.get("userId") == null || likeCount.get() == 0) {
      return ResponseEntity.badRequest().body(Map.of("message", "좋아요 취소 실패"));
    }

    int updatedLikes = likeCount.decrementAndGet();
    return ResponseEntity.ok(Map.of("likes", updatedLikes));
  }

}
