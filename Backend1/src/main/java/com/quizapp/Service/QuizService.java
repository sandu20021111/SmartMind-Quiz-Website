package com.quizapp.Service;

import com.quizapp.Model.Quiz;
import com.quizapp.Repository.QuizRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class QuizService {

    private final QuizRepository quizRepository;

    public QuizService(QuizRepository quizRepository) {
        this.quizRepository = quizRepository;
    }

    public List<Quiz> getAllQuizzes() {
        return quizRepository.findAll();
    }

    public List<Quiz> getQuizzesByModule(String moduleId) {
        return quizRepository.findByModuleId(moduleId);
    }

    public Optional<Quiz> getQuizById(String id) {
        return quizRepository.findById(id);
    }

    public Quiz createQuiz(Quiz quiz) {
        return quizRepository.save(quiz);
    }

    public Optional<Quiz> updateQuiz(String id, Quiz updated) {
        return quizRepository.findById(id).map(existing -> {
            existing.setTitle(updated.getTitle());
            existing.setDescription(updated.getDescription());
            existing.setDifficulty(updated.getDifficulty());
            existing.setTotalQuestions(updated.getTotalQuestions());
            existing.setQuestions(updated.getQuestions());
            return quizRepository.save(existing);
        });
    }

    public void deleteQuiz(String id) {
        quizRepository.deleteById(id);
    }
}
