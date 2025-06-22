package user.persona.user.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import user.persona.user.model.User;


@Repository
public interface UserRepository extends JpaRepository<User, Long> {
}
