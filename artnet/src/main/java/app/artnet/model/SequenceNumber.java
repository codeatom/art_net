package app.artnet.model;

import jakarta.persistence.*;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "SEQUENCENUMBER")
public class SequenceNumber {

    @Id
    @Setter(AccessLevel.NONE)
    @GeneratedValue(strategy =  GenerationType.IDENTITY)
    private Long SequenceNumberId;

    private long number;

    public SequenceNumber() {
    }
}
