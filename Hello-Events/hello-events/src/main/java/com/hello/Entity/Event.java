package com.hello.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.hello.enums.EventCategory;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.sql.Date;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor

public class Event {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String description;
    private LocalDateTime date;
    private String image;
    private Double price;
    private String location;
    private EventCategory category;
    private int availableTickets;

    @OneToMany(cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Reservation> reservations;


}
