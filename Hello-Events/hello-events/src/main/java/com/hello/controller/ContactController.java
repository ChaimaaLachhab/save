package com.hello.controller;

import com.hello.Entity.Contact;
import com.hello.Entity.User;
import com.hello.enums.ContactStatus;
import com.hello.enums.Role;
import com.hello.service.ContactService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin(origins = "http://localhost:4200")
public class ContactController {

    private final ContactService contactService;

    @Autowired
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping("/client/create")
    public ResponseEntity<Contact> createContact(
            @RequestBody Contact contact,
            @AuthenticationPrincipal User user) {
        Contact createdContact = contactService.createContact(contact, user);
        return ResponseEntity.ok(createdContact);
    }

    @GetMapping("/admin/all")
    public ResponseEntity<List<Contact>> getAllContacts(
            @AuthenticationPrincipal User user) {

        List<Contact> contacts = contactService.getAllContacts();
        return ResponseEntity.ok(contacts);
    }

    @GetMapping("/admin/find/{id}")
    public ResponseEntity<Contact> getContactById(
            @PathVariable Long id,
            @AuthenticationPrincipal User user) {
        Optional<Contact> contact = contactService.getContactById(id);
        return contact.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PutMapping("/admin/update/{id}")
    public ResponseEntity<Contact> updateContactStatus(
            @PathVariable Long id,
            @RequestBody Contact contact,
            @AuthenticationPrincipal User user) {
        Contact updatedContact = contactService.updateContactStatus(id, contact);
        return ResponseEntity.ok(updatedContact);
    }
}
