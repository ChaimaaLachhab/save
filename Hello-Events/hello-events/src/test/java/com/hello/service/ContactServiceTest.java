package com.hello.service;

import com.hello.Entity.Contact;
import com.hello.Entity.User;
import com.hello.enums.ContactStatus;
import com.hello.repository.ContactRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.mockito.Mockito.when;

class ContactServiceTest {

    @Mock
    private ContactRepository contactRepository;

    @InjectMocks
    private ContactService contactService;

    private Contact contact;
    private User user;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);

        user = new User();
        user.setId(1L);
        user.setUsername("user1");

        contact = new Contact();
        contact.setId(1L);
        contact.setMessage("Test message");
        contact.setStatus(ContactStatus.PENDING);
        contact.setUser(user);
    }

    @Test
    void createContact() {
        when(contactRepository.save(any(Contact.class))).thenReturn(contact);

        Contact createdContact = contactService.createContact(contact, user);

        assertNotNull(createdContact);
        assertEquals(contact.getMessage(), createdContact.getMessage());
        assertEquals(contact.getStatus(), createdContact.getStatus());
        assertEquals(contact.getUser(), createdContact.getUser());
    }

    @Test
    void getAllContacts() {
        Contact contact1 = new Contact();
        contact1.setId(2L);
        contact1.setMessage("Test message");
        contact.setStatus(ContactStatus.IN_PROGRESS);

        List<Contact> contactList = Arrays.asList(contact, contact1);

        when(contactRepository.findAll()).thenReturn(contactList);

        List<Contact> allContacts = contactService.getAllContacts();

        assertNotNull(allContacts);
        assertEquals(2, allContacts.size());
    }

    @Test
    void getContactById() {
        when(contactRepository.findById(anyLong())).thenReturn(Optional.of(contact));

        Optional<Contact> foundContact = contactService.getContactById(1L);

        assertTrue(foundContact.isPresent());
        assertEquals(contact.getId(), foundContact.get().getId());
    }

    @Test
    void updateContactStatus() {
        Contact updatedContact = new Contact();
        updatedContact.setStatus(ContactStatus.RESOLVED);

        when(contactRepository.findById(anyLong())).thenReturn(Optional.of(contact));
        when(contactRepository.save(any(Contact.class))).thenReturn(contact);

        Contact result = contactService.updateContactStatus(1L, updatedContact);

        assertNotNull(result);
        assertEquals(ContactStatus.RESOLVED, result.getStatus());
    }
}
