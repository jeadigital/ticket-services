package com.ticket.service.model;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "ticket")
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "ticket_track_id")
    private String ticketTrackId;

    @Column(name = "cat_id")
    private Integer catId;

    private String title;

    @Column(name = "ticket_body", columnDefinition = "TEXT")
    private String ticketBody;

    @Column(name = "ticket_user")
    private Long ticketUser;

    @Column(name = "opened_time")
    private LocalDateTime openedTime;

    @Column(name = "last_reply_time")
    private LocalDateTime lastReplyTime;

    private String status;

    @Column(name = "priroty") // Typo in LEGACY DB
    private String priority;

    @Column(name = "user_type")
    private String userType;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTicketTrackId() {
        return ticketTrackId;
    }

    public void setTicketTrackId(String ticketTrackId) {
        this.ticketTrackId = ticketTrackId;
    }

    public Integer getCatId() {
        return catId;
    }

    public void setCatId(Integer catId) {
        this.catId = catId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getTicketBody() {
        return ticketBody;
    }

    public void setTicketBody(String ticketBody) {
        this.ticketBody = ticketBody;
    }

    public Long getTicketUser() {
        return ticketUser;
    }

    public void setTicketUser(Long ticketUser) {
        this.ticketUser = ticketUser;
    }

    public LocalDateTime getOpenedTime() {
        return openedTime;
    }

    public void setOpenedTime(LocalDateTime openedTime) {
        this.openedTime = openedTime;
    }

    public LocalDateTime getLastReplyTime() {
        return lastReplyTime;
    }

    public void setLastReplyTime(LocalDateTime lastReplyTime) {
        this.lastReplyTime = lastReplyTime;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public String getUserType() {
        return userType;
    }

    public void setUserType(String userType) {
        this.userType = userType;
    }
}
