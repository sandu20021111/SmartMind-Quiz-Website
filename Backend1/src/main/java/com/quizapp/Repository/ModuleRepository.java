package com.quizapp.Repository;

import com.quizapp.Model.Module;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ModuleRepository extends MongoRepository<Module, String> {
    List<Module> findByYearId(int yearId);
}
