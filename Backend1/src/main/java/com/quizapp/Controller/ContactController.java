package com.quizapp.Controller;

import com.quizapp.Model.Contact;
import com.quizapp.Service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/contact")
@CrossOrigin(origins = "http://localhost:5173") // React frontend port

public class ContactController {

    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/save") // 👈 Now supports /api/contact/save
    public ResponseEntity<?> submitContactForm(@RequestBody Contact contact) {
        try {
            Contact savedContact = contactService.saveContact(contact);
            return ResponseEntity.ok().body(
                    Map.of(
                            "success", true,
                            "message", "Thank you for your message! We'll get back to you soon.",
                            "data", savedContact
                    )
            );
        } catch (Exception e) {
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("success", false);
            errorResponse.put("message", "Failed to submit your message. Please try again later.");
            errorResponse.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(errorResponse);
        }
    }
}
