package com.student.backend.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StudentRequest {

    private String firstName;
    private String lastName;
    private String email;
    private String course;
    private Integer age;

}