package com.quizapp.Repository;

import com.quizapp.Model.Description;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface DescriptionRepository extends MongoRepository<Description, String> {
    List<Description> findByModuleId(String moduleId);
}
