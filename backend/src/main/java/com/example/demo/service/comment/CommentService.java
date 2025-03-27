package com.example.demo.service.comment;

import com.example.demo.controller.comment.dto.CommentResponseDto;
import com.example.demo.entity.Comment;
import com.example.demo.entity.User;
import com.example.demo.exception.CustomException;
import com.example.demo.exception.ExceptionType;
import com.example.demo.repository.comment.CommentRepository;
import java.util.List;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class CommentService implements ICommentService{
  CommentRepository commentRepository;

  public List<CommentResponseDto> getAllComments(Integer boardId) {
    if(boardId == null){
        throw new CustomException("아이디가 없습니다", ExceptionType.BOARD_ID_INVALID);
    }
    List<Comment> allComments = commentRepository.findAll();
    List<CommentResponseDto> responseDtos = allComments.stream()
        .map(entity -> {
          User user = entity.getUser();
          return CommentResponseDto.from(entity, user.getId(), user.getNickname());
        })
        .toList();

    return responseDtos;
  }



}
