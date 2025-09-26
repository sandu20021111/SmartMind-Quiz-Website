package com.quizapp.Service;

import com.quizapp.Model.Module;
import com.quizapp.Repository.ModuleRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ModuleService {

    private final ModuleRepository moduleRepository;

    public ModuleService(ModuleRepository moduleRepository) {
        this.moduleRepository = moduleRepository;
    }

    public List<Module> getAllModules() {
        return moduleRepository.findAll();
    }

    public List<Module> getModulesByYear(int yearId) {
        return moduleRepository.findByYearId(yearId);
    }

    public Optional<Module> getModuleById(String id) {
        return moduleRepository.findById(id);
    }

    public Module createModule(Module module) {
        return moduleRepository.save(module);
    }

    public Optional<Module> updateModule(String id, Module updated) {
        return moduleRepository.findById(id).map(existing -> {
            existing.setName(updated.getName());
            existing.setDescription(updated.getDescription());
            existing.setQuizzes(updated.getQuizzes());
            existing.setDifficulty(updated.getDifficulty());
            existing.setYearId(updated.getYearId());
            return moduleRepository.save(existing);
        });
    }

    public void deleteModule(String id) {
        moduleRepository.deleteById(id);
    }
}