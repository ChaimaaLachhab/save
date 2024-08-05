package com.hello.controller;

import com.hello.Entity.Event;
import com.hello.enums.EventCategory;
import com.hello.service.EventService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/events")
@CrossOrigin(origins = "http://localhost:4200")
public class EventController {
    @Autowired
    private EventService eventService;

    // Endpoint accessible to both roles
    @GetMapping("/all")
    public List<Event> getEvents() {
        return eventService.getAllEvents();
    }
    @GetMapping("/search")
    public ResponseEntity<List<Event>> searchEvents(
            @RequestParam(required = false) LocalDateTime date,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) EventCategory category,
            @RequestParam(required = false) Double price) {
        List<Event> events = eventService.searchEvents(date, location, category, price);
        return ResponseEntity.ok(events);
    }
    @GetMapping("/{id}")
    public ResponseEntity<Event> getEventById(@PathVariable Long id) {
        Event event = eventService.getEventById(id);
        return ResponseEntity.ok(event);
    }

    // Endpoint restricted to admin role
    @PostMapping("/admin/create")
    public Event createEvent(@RequestBody Event event) {
        return eventService.createEvent(event);
    }

    @PutMapping("/admin/update/{id}")
    public ResponseEntity<Event> updateEvent(@PathVariable Long id, @RequestBody Event eventDetails) {
        Event updatedEvent = eventService.updateEvent(id, eventDetails);
        return ResponseEntity.ok(updatedEvent);
    }

    @DeleteMapping("/admin/delete/{id}")
    public ResponseEntity<Boolean> deleteEvent(@PathVariable Long id) {
        eventService.deleteEvent(id);
        return ResponseEntity.ok(Boolean.TRUE);
    }
}