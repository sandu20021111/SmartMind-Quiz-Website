package com.quizapp.Model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "modules")
public class Module {

    @Id
    private String id;

    private String name;
    private String description;
    private int quizzes;
    private String difficulty; // Beginner | Intermediate | Advanced
    private int yearId;        // 1,2,3,4

    public Module() {}

    public Module(String name, String description, int quizzes, String difficulty, int yearId) {
        this.name = name;
        this.description = description;
        this.quizzes = quizzes;
        this.difficulty = difficulty;
        this.yearId = yearId;
    }

    // Getters & Setters
    public String getId() { return id; }
    public void setId(String id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public int getQuizzes() { return quizzes; }
    public void setQuizzes(int quizzes) { this.quizzes = quizzes; }

    public String getDifficulty() { return difficulty; }
    public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

    public int getYearId() { return yearId; }
    public void setYearId(int yearId) { this.yearId = yearId; }
}
