package com.example.demo.service.comment;

import com.example.demo.controller.comment.dto.CommentRequestDto;
import com.example.demo.controller.comment.dto.CommentResponseDto;
import java.util.List;

public interface ICommentService {
  List<CommentResponseDto> getAllComments(Integer boardId);
  CommentResponseDto createComment(Integer boardId,CommentRequestDto requestDto);
  CommentResponseDto updateComment(Integer commentId,CommentRequestDto requestDto);
  void deleteById(Integer commentId);

}
