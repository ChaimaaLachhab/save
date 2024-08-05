package com.hello.service;

import com.hello.Entity.Event;
import com.hello.Entity.Reservation;
import com.hello.Entity.User;
import com.hello.enums.Role;
import com.hello.repository.EventRepository;
import com.hello.repository.ReservationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final EventRepository eventRepository;

    @Autowired
    public ReservationService(ReservationRepository reservationRepository, EventRepository eventRepository) {
        this.reservationRepository = reservationRepository;
        this.eventRepository = eventRepository;
    }

    public Reservation purchaseTicket(Long eventId, User user) {
        Event event = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        if (event.getAvailableTickets() > 0) {
            Reservation reservation = new Reservation();
            reservation.setEvent(event);
            reservation.setUser(user);
            reservation.setPurchaseDate(LocalDateTime.now());

            event.setAvailableTickets(event.getAvailableTickets() - 1);

            eventRepository.save(event);
            return reservationRepository.save(reservation);
        } else {
            throw new IllegalStateException("No available tickets for this event");
        }
    }

    public List<Reservation> getTicketsByUser(User user) {
        return reservationRepository.findByUser(user);
    }

    public List<Reservation> getAllPurchases(User user) {
        return reservationRepository.findAll();
    }
}
