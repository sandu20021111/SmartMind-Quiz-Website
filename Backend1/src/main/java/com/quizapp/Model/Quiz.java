package com.quizapp.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Document(collection = "quizzes")
public class Quiz {

    @Id
    private String id;

    private String moduleId;
    private String title;
    private String description;
    private String difficulty; // Beginner | Intermediate | Advanced | Expert
    private int totalQuestions;
    private List<Question> questions;

    public Quiz() {}

    public Quiz(String moduleId, String title, String description, String difficulty, int totalQuestions, List<Question> questions) {
        this.moduleId = moduleId;
        this.title = title;
        this.description = description;
        this.difficulty = difficulty;
        this.totalQuestions = totalQuestions;
        this.questions = questions;
    }

    // Getters and Setters

    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getModuleId() { return moduleId; }
    public void setModuleId(String moduleId) { this.moduleId = moduleId; }

    public String getTitle() { return title; }
    public void setTitle(String title) { this.title = title; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public int getTotalQuestions() { return totalQuestions; }
    public void setTotalQuestions(int totalQuestions) { this.totalQuestions = totalQuestions; }

    public List<Question> getQuestions() { return questions; }
    public void setQuestions(List<Question> questions) { this.questions = questions; }

    // Question inner class
    public static class Question {
        private String questionText;
        private List<String> options;
        private String correctAnswer;

        public Question() {}

        public Question(String questionText, List<String> options, String correctAnswer) {
            this.questionText = questionText;
            this.options = options;
            this.correctAnswer = correctAnswer;
        }

        public String getQuestionText() { return questionText; }
        public void setQuestionText(String questionText) { this.questionText = questionText; }

        public List<String> getOptions() { return options; }
        public void setOptions(List<String> options) { this.options = options; }

        public String getCorrectAnswer() { return correctAnswer; }
        public void setCorrectAnswer(String correctAnswer) { this.correctAnswer = correctAnswer; }
    }
}
