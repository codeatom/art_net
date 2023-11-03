package app.artnet.data.service.impl;

import app.artnet.converter.Converter;
import app.artnet.data.repository.AppUserRepository;
import app.artnet.data.service.AppUserService;
import app.artnet.data.service.SequenceNumberService;
import app.artnet.dto.forms.AppUserForm;
import app.artnet.dto.views.AppUserView;
import app.artnet.model.AppUser;
import app.artnet.model.SequenceNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.time.LocalDateTime;
import java.util.Collection;
import java.util.List;


@Transactional
@Service
public class AppUserServiceImpl implements AppUserService {

    private final AppUserRepository appUserRepository;
    private final SequenceNumberService sequenceNumberService;
    private final Converter converter;

    @Autowired
    public AppUserServiceImpl(AppUserRepository appUserRepository, SequenceNumberService sequenceNumberService, Converter converter) {
        this.appUserRepository = appUserRepository;
        this.sequenceNumberService = sequenceNumberService;
        this.converter = converter;
    }


    @Transactional
    @Override
    public AppUserView save(AppUserForm appUserForm) {
        AppUser appUser = new AppUser(
                appUserForm.getUserId(),
                appUserForm.getUserName(),
                appUserForm.getFirstName(),
                appUserForm.getLastName(),
                appUserForm.getUserEmail(),
                appUserForm.getUserImage());

        appUser.setJoinDate(LocalDateTime.now());
        appUser.setActive(true);
        appUser.setUserName(appUserForm.getFirstName().toLowerCase() + getSequenceNumber());

        appUserRepository.save(appUser);
        return converter.appUserToAppUserView(appUser);
    }

    @Transactional(readOnly = true)
    @Override
    public AppUserView findById(String userId) {
        AppUser appUser = appUserRepository.findById(userId).orElse(null);
        return converter.appUserToAppUserView(appUser);
    }

    @Transactional(readOnly = true)
    @Override
    public AppUserView findByUserEmail(String userEmail) {
        AppUser appUser = appUserRepository.findByUserEmail(userEmail).orElse(null);
        return converter.appUserToAppUserView(appUser);
    }

    @Transactional(readOnly = true)
    @Override
    public Collection<AppUserView> findAll() {
        List<AppUser> appUserList = appUserRepository.findAll();
        return converter.appUserListToAppUserViewList(appUserList);
    }

    @Transactional(readOnly = true)
    @Override
    public Collection<AppUserView> findAllByUserNameContainingIgnoreCase(String userName) {
        List<AppUser> appUserList = (List<AppUser>) appUserRepository.findAllByUserNameContainingIgnoreCase(userName);
        return converter.appUserListToAppUserViewList(appUserList);
    }

    @Transactional
    @Override
    public AppUserView update(AppUserForm appUserForm) {
        AppUser existingAppUser = appUserRepository.findById(appUserForm.getUserId()).orElse(null);

        if(existingAppUser == null){
            return null;
        }

        existingAppUser.setUserName(appUserForm.getUserName());
        existingAppUser.setFirstName(appUserForm.getFirstName());
        existingAppUser.setLastName(appUserForm.getLastName());
        existingAppUser.setUserEmail(appUserForm.getUserEmail());
        existingAppUser.setUserImage(appUserForm.getUserImage());

        return converter.appUserToAppUserView(existingAppUser);
    }

    @Transactional
    @Override
    public void deleteById(String userId) {
        if(appUserRepository.existsById(userId)){
            appUserRepository.deleteById(userId);
        }
    }

    private Long getSequenceNumber(){
        List<SequenceNumber> sequenceNumberList = sequenceNumberService.findAll();

        if(sequenceNumberList.size() < 1){
            SequenceNumber sequenceNumber = sequenceNumberService.save(new SequenceNumber());
            sequenceNumber.setNumber(sequenceNumber.getNumber() + 1);
            return sequenceNumber.getNumber();
        }

        SequenceNumber currentSequenceNumber = sequenceNumberList.get(0);
        currentSequenceNumber.setNumber(currentSequenceNumber.getNumber() + 1);
        return currentSequenceNumber.getNumber();
    }

}
