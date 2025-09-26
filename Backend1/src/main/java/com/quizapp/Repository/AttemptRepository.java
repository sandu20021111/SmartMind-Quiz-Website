package com.quizapp.Repository;

import com.quizapp.Model.Attempt;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface AttemptRepository extends MongoRepository<Attempt, String> {
    List<Attempt> findByUserIdAndQuizId(String userId, String quizId);
}
