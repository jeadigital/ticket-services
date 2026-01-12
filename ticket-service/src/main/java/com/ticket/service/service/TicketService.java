package com.ticket.service.service;

import com.ticket.service.model.Ticket;
import com.ticket.service.repository.TicketRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Service
public class TicketService {

    @Autowired
    private TicketRepository ticketRepository;

    public Ticket createTicket(Ticket ticket, Long userId) {
        ticket.setTicketUser(userId);
        ticket.setOpenedTime(LocalDateTime.now());
        ticket.setLastReplyTime(LocalDateTime.now());
        ticket.setStatus("N");
        ticket.setUserType("U");
        if (ticket.getPriority() == null)
            ticket.setPriority("M");
        if (ticket.getCatId() == null)
            ticket.setCatId(0);

        // Generate Track ID: T{userId}-{timestamp}-{random}
        String randomStr = UUID.randomUUID().toString().substring(0, 4).toUpperCase();
        String trackId = "T" + userId + "-" + (System.currentTimeMillis() % 10000) + "-" + randomStr;
        ticket.setTicketTrackId(trackId);

        return ticketRepository.save(ticket);
    }

    public List<Ticket> getTickets(Long userId, String status) {
        if ("closed".equalsIgnoreCase(status)) {
            return ticketRepository.findByTicketUserAndStatus(userId, "C");
        } else {
            return ticketRepository.findByTicketUserAndStatusIn(userId, List.of("N", "P", "R"));
        }
    }

    public Ticket getTicketById(Long id, Long userId) {
        return ticketRepository.findById(id)
                .filter(t -> t.getTicketUser().equals(userId))
                .orElse(null);
    }
}
