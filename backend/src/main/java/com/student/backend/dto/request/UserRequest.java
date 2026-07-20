package com.student.backend.dto.request;

import com.student.backend.entity.Role;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserRequest {

    private String fullName;
    private String email;
    private String password;
    private Role role;

}