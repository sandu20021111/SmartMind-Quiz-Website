package com.quizapp.Model;

import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "attempts")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Attempt {
    @Id
    private String id;

    private String userId;
    private String quizId;
    private int score;
    private LocalDateTime attemptDate;

    public void setUserId(String userId) {
    }

    public void setQuizId(String quizId) {
    }

    public void setScore(int score) {
    }

    public void setAttemptDate(LocalDateTime now) {
    }

    public int getScore() {
        return 0;
    }
}
