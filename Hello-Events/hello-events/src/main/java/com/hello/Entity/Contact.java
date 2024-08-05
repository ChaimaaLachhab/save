package com.hello.Entity;

import com.hello.enums.ContactStatus;
import lombok.*;
import jakarta.persistence.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class Contact {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String message;

    @Enumerated(EnumType.STRING)
    private ContactStatus status;

    @ManyToOne
    private User user;
}

