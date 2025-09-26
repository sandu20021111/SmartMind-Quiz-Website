package com.quizapp.DTO;

import com.quizapp.Model.Description;
import com.quizapp.Model.Module;

public class ModuleWithDescriptionDTO {
    private Module module;
    private Description description;

    public ModuleWithDescriptionDTO() {}

    public ModuleWithDescriptionDTO(Module module, Description description) {
        this.module = module;
        this.description = description;
    }

    // Getters and Setters
    public Module getModule() { return module; }
    public void setModule(Module module) { this.module = module; }
    public Description getDescription() { return description; }
    public void setDescription(Description description) { this.description = description; }
}