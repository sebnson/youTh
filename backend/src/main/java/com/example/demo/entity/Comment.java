package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Builder
@FieldDefaults(level = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(length = 100, nullable = false)
    @Setter
    String content;

    @Column(nullable = false)
    boolean useYn = true;
    @Setter
    LocalDateTime createdAt;
    @Setter
    LocalDateTime modifiedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @Setter
    User user;

    @ManyToOne
    @JoinColumn(name = "board_id")
    @Setter
    Board board;

    @OneToMany(mappedBy = "comment", fetch = FetchType.EAGER)
    @Builder.Default
    List<CommentLike> likes = new ArrayList<>();
}
