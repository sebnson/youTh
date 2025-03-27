package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.experimental.FieldDefaults;

@Entity
@Builder
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@FieldDefaults(level = AccessLevel.PRIVATE)
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;

    @Column(length = 100, nullable = false, unique = true)
    String email;

    @Column(length = 30, nullable = false)
    String password;

    @Column(length = 20, nullable = false)
    String name;

    @Column(length = 20, nullable = false)
    String nickname;

    @Column(nullable = false)
    boolean useYn = true;

    LocalDateTime createdAt;
    LocalDateTime modifiedAt;

    @OneToMany(mappedBy = "user")
    List<BoardLike> boardLikes = new ArrayList<>();

    @OneToMany(mappedBy = "user")
    List<Board> boards = new ArrayList<>();

}
