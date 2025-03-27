package com.example.demo.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.experimental.FieldDefaults;
import org.hibernate.annotations.Where;

@Entity
@Getter
@Setter
@Builder
@Where(clause = "use_yn = true")
@FieldDefaults(level = AccessLevel.PRIVATE)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Integer id;
    @Column(length = 500, nullable = false)
    String content;
    @Column(length = 255)
    String image_path;
    @Builder.Default
    @Column(nullable = false)
    Boolean useYn = true;
    LocalDateTime createdAt;
    LocalDateTime modifiedAt;

    @ManyToOne
    @JoinColumn(name = "user_id")
    User user;

    @Builder.Default
    @OneToMany(mappedBy = "board", fetch = FetchType.EAGER)
    List<BoardLike> likes = new ArrayList<>();

    @Builder.Default
    @OneToMany(mappedBy = "board", fetch = FetchType.EAGER)
    List<Comment> comments = new ArrayList<>();

}
