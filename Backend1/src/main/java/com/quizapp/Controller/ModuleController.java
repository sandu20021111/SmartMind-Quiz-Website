package com.quizapp.Controller;

import com.quizapp.Model.Module;
import com.quizapp.Service.ModuleService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/modules")
@CrossOrigin(origins = "*")
public class ModuleController {

    private final ModuleService moduleService;

    public ModuleController(ModuleService moduleService) {
        this.moduleService = moduleService;
    }

    // ================== GET ALL MODULES ==================
    @GetMapping
    public List<Module> getAllModules() {
        return moduleService.getAllModules();
    }

    // ================== GET MODULES BY YEAR ==================
    @GetMapping("/year/{yearId}")
    public List<Module> getModulesByYear(@PathVariable int yearId) {
        return moduleService.getModulesByYear(yearId);
    }

    // ================== GET MODULE BY ID ==================
    @GetMapping("/{id}")
    public ResponseEntity<Module> getModuleById(@PathVariable String id) {
        Optional<Module> module = moduleService.getModuleById(id);
        return module.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // ================== CREATE MODULE (ADMIN) ==================
    @PostMapping
    public Module createModule(@RequestBody ModuleRequest moduleRequest) {
        // Convert year string to integer
        int yearId = convertYearStringToId(moduleRequest.getYear());

        Module module = new Module(
                moduleRequest.getName(),
                moduleRequest.getDescription(),
                moduleRequest.getQuizzes(),
                moduleRequest.getDifficulty(),
                yearId
        );

        return moduleService.createModule(module);
    }

    // ================== UPDATE MODULE ==================
    @PutMapping("/{id}")
    public ResponseEntity<Module> updateModule(@PathVariable String id, @RequestBody ModuleRequest moduleRequest) {
        int yearId = convertYearStringToId(moduleRequest.getYear());

        Module updatedModule = new Module(
                moduleRequest.getName(),
                moduleRequest.getDescription(),
                moduleRequest.getQuizzes(),
                moduleRequest.getDifficulty(),
                yearId
        );

        Optional<Module> module = moduleService.updateModule(id, updatedModule);
        return module.map(ResponseEntity::ok).orElse(ResponseEntity.notFound().build());
    }

    // ================== DELETE MODULE ==================
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteModule(@PathVariable String id) {
        moduleService.deleteModule(id);
        return ResponseEntity.noContent().build();
    }

    // ================== HELPER ==================
    private int convertYearStringToId(String year) {
        if (year == null) return 0;
        switch (year) {
            case "1st": return 1;
            case "2nd": return 2;
            case "3rd": return 3;
            case "4th": return 4;
            default: return 0;
        }
    }

    // ================== REQUEST DTO ==================
    public static class ModuleRequest {
        private String name;
        private String description;
        private int quizzes;
        private String difficulty; // Beginner | Intermediate | Advanced
        private String year;       // "1st", "2nd", "3rd", "4th"

        // ===== Getters & Setters =====
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }

        public String getDescription() { return description; }
        public void setDescription(String description) { this.description = description; }

        public int getQuizzes() { return quizzes; }
        public void setQuizzes(int quizzes) { this.quizzes = quizzes; }

        public String getDifficulty() { return difficulty; }
        public void setDifficulty(String difficulty) { this.difficulty = difficulty; }

        public String getYear() { return year; }
        public void setYear(String year) { this.year = year; }
    }
}
