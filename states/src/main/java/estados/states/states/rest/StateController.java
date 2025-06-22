package estados.states.states.rest;

import estados.states.states.services.StateService;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import estados.states.states.model.State;
import java.util.List;

@Tag(name = "States")
@RestController
@RequestMapping("/api/v1/states")
public class StateController {

    @Autowired
    private StateService stateService;

    @GetMapping
    public ResponseEntity<List<State>> getAll() {
        return ResponseEntity.ok(stateService.getAll());
    }

    @GetMapping("/country/{id}")
    public ResponseEntity<List<State>> getByCountry(@PathVariable Long id) {
        return ResponseEntity.ok(stateService.getByCountryId(id));
    }



}
