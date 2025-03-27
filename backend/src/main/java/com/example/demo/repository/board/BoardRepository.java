package com.example.demo.repository.board;

import com.example.demo.entity.Board;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Integer> {

    Board save(Board entity);

    List<Board> findAllByUserId(Integer userId);
}
