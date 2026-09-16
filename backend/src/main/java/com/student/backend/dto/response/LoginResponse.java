package com.student.backend.dto.response;

import com.student.backend.entity.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class LoginResponse {

    private String token;
    private String fullName;
    private String email;
    private Role role;

}