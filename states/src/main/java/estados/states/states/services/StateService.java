package estados.states.states.services;


import estados.states.states.model.State;
import estados.states.states.repository.StateRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StateService {

    @Autowired
    private StateRepository stateRepository;

    public List<State> getAll() {
        return stateRepository.findAll();
    }

    public List<State> getByCountryId(Long countryId) {
        return stateRepository.findByCountryId(countryId);
    }
}
