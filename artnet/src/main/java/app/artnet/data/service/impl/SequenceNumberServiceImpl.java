package app.artnet.data.service.impl;

import app.artnet.data.repository.SequenceNumberRepository;
import app.artnet.data.service.SequenceNumberService;
import app.artnet.model.SequenceNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;


@Service
public class SequenceNumberServiceImpl implements SequenceNumberService {

    private final SequenceNumberRepository sequenceNumberRepository;

    @Autowired
    public SequenceNumberServiceImpl(SequenceNumberRepository sequenceNumberRepository) {
        this.sequenceNumberRepository = sequenceNumberRepository;
    }


    @Override
    public SequenceNumber save(SequenceNumber sequenceNumber) {
        return sequenceNumberRepository.save(sequenceNumber);
    }

    @Override
    public List<SequenceNumber> findAll() {
       return sequenceNumberRepository.findAll();
    }

}
