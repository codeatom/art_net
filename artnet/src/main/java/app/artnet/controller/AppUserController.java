package app.artnet.controller;

import app.artnet.data.service.AppUserService;
import app.artnet.dto.forms.AppUserForm;
import app.artnet.dto.views.AppUserView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;


@CrossOrigin
@RestController
@RequestMapping("/api/v1/user")
public class AppUserController {

    private final AppUserService appUserService;

    @Autowired
    public AppUserController(AppUserService appUserService) {
        this.appUserService = appUserService;
    }


    @PostMapping("/save")
    public ResponseEntity<AppUserView> saveUser(@RequestBody AppUserForm createAppUserForm) {
        return ResponseEntity.status(HttpStatus.CREATED).body(appUserService.save(createAppUserForm));
    }

    @GetMapping("/get-by-userId/{userId}")
    public ResponseEntity<AppUserView> getUserById(@PathVariable String userId){
        return ResponseEntity.ok(appUserService.findById(userId));
    }

    @GetMapping("/get-by-email")
    public ResponseEntity<AppUserView> getUserByEmail(@RequestParam String userEmail){
        return ResponseEntity.ok(appUserService.findByUserEmail(userEmail));
    }

    @GetMapping("/get-all")
    public ResponseEntity<ArrayList<AppUserView>> getAllUser() {
        ArrayList<AppUserView> result = (ArrayList<AppUserView>) appUserService.findAll();
        return ResponseEntity.ok(result);
    }

    @PutMapping("/update")
    public ResponseEntity<AppUserView> updateUser(@RequestBody AppUserForm appUserForm){
        return ResponseEntity.status(HttpStatus.CREATED).body(appUserService.update(appUserForm));
    }

    @GetMapping("/search")
    public ResponseEntity<ArrayList<AppUserView>> searchForUsers(@RequestParam String keyWord){
        ArrayList<AppUserView> result = (ArrayList<AppUserView>) appUserService.findAllByUserNameContainingIgnoreCase(keyWord);
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable("userId") String userId){
        appUserService.deleteById(userId);
        return ResponseEntity.noContent().build();
    }

}
