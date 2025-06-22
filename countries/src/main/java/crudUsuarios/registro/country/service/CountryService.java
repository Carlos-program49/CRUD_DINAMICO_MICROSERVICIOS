package crudUsuarios.registro.country.service;

import crudUsuarios.registro.country.model.Country;
import crudUsuarios.registro.country.repository.CountryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class CountryService {

    @Autowired
    private CountryRepository countryRepository;

    public List<Country> findAll() {
        return countryRepository.findAll();
    }

    /**
     * Devuelve el Country si existe, o lanza un 404 si no.
     */
    public Country findById(Long id) {
        return countryRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "País con id " + id + " no encontrado"));
    }


}
