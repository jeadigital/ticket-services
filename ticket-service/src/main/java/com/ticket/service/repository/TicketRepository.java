package com.ticket.service.repository;

import com.ticket.service.model.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
    List<Ticket> findByTicketUser(Long ticketUser);

    List<Ticket> findByTicketUserAndStatus(Long ticketUser, String status);

    List<Ticket> findByTicketUserAndStatusIn(Long ticketUser, List<String> statuses);
}
