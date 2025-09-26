package com.quizapp.Service;

import com.quizapp.Model.Description;
import com.quizapp.Repository.DescriptionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DescriptionService {

    private final DescriptionRepository descriptionRepository;

    public DescriptionService(DescriptionRepository descriptionRepository) {
        this.descriptionRepository = descriptionRepository;
    }

    public List<Description> getAllDescriptions() {
        return descriptionRepository.findAll();
    }

    public Optional<Description> getDescriptionById(String id) {
        return descriptionRepository.findById(id);
    }

    public List<Description> getDescriptionsByModuleId(String moduleId) {
        return descriptionRepository.findByModuleId(moduleId);
    }

    public Description createDescription(Description description) {
        return descriptionRepository.save(description);
    }

    public Optional<Description> updateDescription(String id, Description updated) {
        return descriptionRepository.findById(id).map(existing -> {
            existing.setModuleId(updated.getModuleId());
            existing.setName(updated.getName());
            existing.setDescription(updated.getDescription());
            existing.setLearningOutcomes(updated.getLearningOutcomes());
            existing.setInstructors(updated.getInstructors());
            existing.setPrerequisites(updated.getPrerequisites());
            existing.setAssessments(updated.getAssessments());
            existing.setTopics(updated.getTopics());
            existing.setDuration(updated.getDuration());
            return descriptionRepository.save(existing);
        });
    }

    public void deleteDescription(String id) {
        descriptionRepository.deleteById(id);
    }
}
