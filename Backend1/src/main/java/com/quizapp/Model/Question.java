package com.quizapp.Model;

import org.springframework.data.annotation.Id;

import java.util.List;

public class Question {

    @Id
    private String id;
    private String questionText;
    private List<String> options; // e.g., ["A", "B", "C", "D"]
    private String correctAnswer;

    // Default constructor
    public Question() {
    }

    // Full constructor
    public Question(String id, String questionText, List<String> options, String correctAnswer) {
        this.id = id;
        this.questionText = questionText;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }

    // Getters and Setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public void setQuestionText(String questionText) {
        this.questionText = questionText;
    }

    public List<String> getOptions() {
        return options;
    }

    public void setOptions(List<String> options) {
        this.options = options;
    }

    public String getCorrectAnswer() {
        return correctAnswer;
    }

    public void setCorrectAnswer(String correctAnswer) {
        this.correctAnswer = correctAnswer;
    }
}
