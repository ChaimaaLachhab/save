package com.hello.controller;

import com.hello.Entity.Reservation;
import com.hello.Entity.User;
import com.hello.enums.Role;
import com.hello.service.ReservationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/reservations")
@CrossOrigin(origins = "http://localhost:4200")
public class ReservationController {

    private final ReservationService reservationService;

    @Autowired
    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @PostMapping("/client/purchase/{eventId}")
    public ResponseEntity<Reservation> purchaseTicket(
            @PathVariable Long eventId,
            @AuthenticationPrincipal User user) {
        System.out.println(user.toString());
        Reservation reservation = reservationService.purchaseTicket(eventId, user);
        return ResponseEntity.ok(reservation);
    }

    @GetMapping("/client/all")
    public ResponseEntity<List<Reservation>> getUserTickets(
            @AuthenticationPrincipal User user) {
        List<Reservation> reservations = reservationService.getTicketsByUser(user);
        return ResponseEntity.ok(reservations);
    }

    @GetMapping("/admin/purchases")
    public ResponseEntity<List<Reservation>> getAllPurchases(
            @AuthenticationPrincipal User user) {
        List<Reservation> purchases = reservationService.getAllPurchases(user);
        return ResponseEntity.ok(purchases);
    }
}
