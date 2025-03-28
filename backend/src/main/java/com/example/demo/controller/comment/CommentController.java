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


  @PostMapping
  public ResponseEntity<CommentResponseDto> createComment(@PathVariable Integer boardId, @RequestBody CommentRequestDto request) {
    CommentResponseDto responseDto = commentService.createComment(boardId,request);
    return ResponseEntity.ok(responseDto);
  }

  @PatchMapping("/{commentId}")
  public ResponseEntity<CommentResponseDto> updateComment(@PathVariable Long boardId, @PathVariable Integer commentId, @RequestBody CommentRequestDto request) {

    CommentResponseDto responseDto = commentService.updateComment(commentId,request);

    return ResponseEntity.status(201).body(responseDto);
  }

  @DeleteMapping("/{commentId}")
  public ResponseEntity<Void> deleteComment(@PathVariable Long boardId, @PathVariable Integer commentId) {
    commentService.deleteById(commentId);
    return ResponseEntity.ok().body(null);
  }

}
