package user.persona.user.rest;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import user.persona.user.dto.UserRequest;
import user.persona.user.model.User;
import user.persona.user.services.UserService;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/v1/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    public ResponseEntity<List<User>> getAll() {
        return ResponseEntity.ok(userService.findAll());
    }

    @PostMapping
    public ResponseEntity<User> save(@Valid @RequestBody User request) {
        return ResponseEntity.ok(userService.save(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<User> findById(@PathVariable Long id) {
        return userService.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/{id}")
    public ResponseEntity<User> update(@PathVariable Long id, @Valid @RequestBody User userDto) {
        if (!userService.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        User user = new User();
        user.setId(id); // solo aquí se usa el id
        user.setNombre(userDto.getNombre());
        user.setApellido(userDto.getApellido());
        user.setEdad(userDto.getEdad());
        user.setCountryId(userDto.getCountryId());
        user.setStateId(userDto.getStateId());

        User updated = userService.save(user);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        userService.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
