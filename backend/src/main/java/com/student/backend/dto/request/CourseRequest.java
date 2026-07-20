package com.student.backend.dto.request;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseRequest {

    private String courseName;
    private String courseCode;
    private String duration;
    private String lecturer;

}