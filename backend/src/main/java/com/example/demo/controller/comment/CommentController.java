package com.example.demo.controller.comment;

import com.example.demo.controller.comment.dto.CommentRequestDto;
import com.example.demo.controller.comment.dto.CommentResponseDto;
import com.example.demo.service.comment.CommentService;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/boards/{boardId}/comments")
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CommentController {
  CommentService commentService;
  @GetMapping
  public ResponseEntity<List<CommentResponseDto>> getComments(@PathVariable Integer boardId) {
    List<CommentResponseDto> responseDtos = commentService.getAllComments(boardId);
    return ResponseEntity.ok(responseDtos);
  }

  // 한 게시물의 한 댓글 쓰기
  @PostMapping
  public ResponseEntity<CommentResponseDto> createComment(@PathVariable Integer boardId, @RequestBody CommentRequestDto request) {
    CommentResponseDto responseDto = commentService.createComment(boardId,request);
    return ResponseEntity.ok(responseDto);
  }

  // 한 댓글 수정
  @PatchMapping("/{commentId}")
  public ResponseEntity<CommentResponseDto> updateComment(@PathVariable Long boardId, @PathVariable Integer commentId, @RequestBody CommentRequestDto request) {

    CommentResponseDto responseDto = commentService.updateComment(commentId,request);

    return ResponseEntity.status(201).body(responseDto);
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
