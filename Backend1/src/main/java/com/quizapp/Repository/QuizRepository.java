package com.quizapp.Repository;

import com.quizapp.Model.Quiz;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface QuizRepository extends MongoRepository<Quiz, String> {
    List<Quiz> findByModuleId(String moduleId);
}
