package com.student.backend.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseResponse {

    private Long id;
    private String courseName;
    private String courseCode;
    private String duration;
    private String lecturer;

}