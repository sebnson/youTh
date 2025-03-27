package com.example.demo.service.comment;

import com.example.demo.controller.comment.dto.CommentRequestDto;
import com.example.demo.controller.comment.dto.CommentResponseDto;
import com.example.demo.entity.Board;
import com.example.demo.entity.Comment;
import com.example.demo.entity.User;
import com.example.demo.exception.CustomException;
import com.example.demo.exception.ExceptionType;
import com.example.demo.repository.board.BoardRepository;
import com.example.demo.repository.comment.CommentRepository;
import com.example.demo.repository.user.UserRepository;
import java.time.LocalDateTime;
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
  BoardRepository boardRepository;
  UserRepository userRepository;

  @Override
  public List<CommentResponseDto> getAllComments(Integer boardId) {
    if(boardId == null){
        throw new CustomException("아이디가 없습니다", ExceptionType.BOARD_ID_INVALID);
    }
    List<Comment> allComments = commentRepository.findByBoardId(boardId);
    List<CommentResponseDto> responseDtos = allComments.stream()
        .map(entity -> {
          User user = entity.getUser();
          return CommentResponseDto.from(entity, user.getId(), user.getNickname());
        })
        .toList();

    return responseDtos;
  }

  @Override
  public CommentResponseDto createComment(Integer boardId,CommentRequestDto requestDto) {
    Comment comment = requestDto.toEntity();
    Board board = boardRepository.findById(boardId).orElseThrow(() -> new CustomException("게시물이 존재하지 않습니다",
        ExceptionType.BOARD_NOT_FOUND));
    User user = userRepository.findById(requestDto.getUserId()).orElseThrow(() -> new CustomException("사용자 없음",
        ExceptionType.USER_NOT_FOUND));
    comment.setUser(user);
    comment.setBoard(board);
    comment.setCreatedAt(LocalDateTime.now());
    Comment savedComment = commentRepository.save(comment);
    CommentResponseDto responseDto = CommentResponseDto.from(savedComment,user.getId(),user.getNickname());
    return responseDto;

  }
  @Override
  public CommentResponseDto updateComment(Integer commentId, CommentRequestDto requestDto) {
    User user = userRepository.findById(requestDto.getUserId()).orElseThrow(() -> new CustomException("사용자 없음",
        ExceptionType.USER_NOT_FOUND));
    Comment existingComment = commentRepository.findById(commentId).orElseThrow(() -> new CustomException("댓글이 존재하지 않습니다",
        ExceptionType.COMMENT_NOT_FOUND));

    existingComment.setContent(requestDto.getContent());
    existingComment.setModifiedAt(LocalDateTime.now());
    Comment savedComment = commentRepository.save(existingComment);


    CommentResponseDto responseDto = CommentResponseDto.from(savedComment,user.getId(),user.getNickname());
    return responseDto;

  }



}
