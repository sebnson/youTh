package com.example.demo.service.comment;

import com.example.demo.controller.comment.dto.CommentResponseDto;
import java.util.List;

public interface ICommentService {
  List<CommentResponseDto> getAllComments(Integer boardId);

}
