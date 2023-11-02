package app.artnet.data.service;

import app.artnet.model.SequenceNumber;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public interface SequenceNumberService {
    SequenceNumber save(SequenceNumber sequenceNumber);

    List<SequenceNumber> findAll();
}
