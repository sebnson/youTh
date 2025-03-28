package com.example.demo.repository.comment;

import com.example.demo.entity.Comment;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Integer> {
  List<Comment> findByBoardId(Integer boardId);
  Comment save(Comment entity);
  void deleteById(Integer commentId);

}
