package com.quizapp.Controller;

import com.quizapp.Model.Description;
import com.quizapp.Service.DescriptionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/descriptions")
@CrossOrigin(origins = "*")
public class DescriptionController {

    private final DescriptionService descriptionService;

    public DescriptionController(DescriptionService descriptionService) {
        this.descriptionService = descriptionService;
    }

    @GetMapping
    public List<Description> getAllDescriptions() {
        return descriptionService.getAllDescriptions();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Description> getDescriptionById(@PathVariable String id) {
        return descriptionService.getDescriptionById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping("/module/{moduleId}")
    public List<Description> getDescriptionsByModuleId(@PathVariable String moduleId) {
        return descriptionService.getDescriptionsByModuleId(moduleId);
    }

    @PostMapping
    public Description createDescription(@RequestBody Description description) {
        return descriptionService.createDescription(description);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Description> updateDescription(@PathVariable String id, @RequestBody Description description) {
        return descriptionService.updateDescription(id, description)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteDescription(@PathVariable String id) {
        descriptionService.deleteDescription(id);
        return ResponseEntity.noContent().build();
    }
}
