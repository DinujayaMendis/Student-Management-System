package com.student.backend.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CourseRequest {

    @NotBlank(message = "Course name is required")
    private String courseName;

    @NotBlank(message = "Course code is required")
    private String courseCode;

    @NotBlank(message = "Duration is required")
    private String duration;

    @NotBlank(message = "Lecturer is required")
    private String lecturer;
}