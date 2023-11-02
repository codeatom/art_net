package app.artnet.data.service;

import app.artnet.dto.forms.AppUserForm;
import app.artnet.dto.views.AppUserView;
import org.springframework.stereotype.Service;

import java.util.Collection;

@Service
public interface AppUserService {
    AppUserView save (AppUserForm appUserForm);

    AppUserView findById(String userId);

    AppUserView findByUserEmail(String userEmail);

    Collection<AppUserView> findAll();

    AppUserView update(AppUserForm appUserForm);

    Collection<AppUserView> findAllByUserNameContainingIgnoreCase(String userName);

    void deleteById(String userId);
}
