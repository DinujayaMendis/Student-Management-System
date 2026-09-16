package com.student.backend.service;

import com.student.backend.dto.request.CourseRequest;
import com.student.backend.dto.response.CourseResponse;
import com.student.backend.entity.Course;
import com.student.backend.exception.ResourceNotFoundException;
import com.student.backend.repository.CourseRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CourseService {

    private final CourseRepository courseRepository;

    public CourseService(CourseRepository courseRepository) {
        this.courseRepository = courseRepository;
    }

    // Create Course
    public CourseResponse createCourse(CourseRequest request) {

        Course course = Course.builder()
                .courseName(request.getCourseName())
                .courseCode(request.getCourseCode())
                .duration(request.getDuration())
                .lecturer(request.getLecturer())
                .build();

        Course savedCourse = courseRepository.save(course);

        return mapToResponse(savedCourse);
    }

    // Get All Courses
    public List<CourseResponse> getAllCourses() {
        return courseRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Get Course By ID
    public CourseResponse getCourseById(Long id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Course not found with id: " + id));

        return mapToResponse(course);
    }

    // Update Course
    public CourseResponse updateCourse(Long id, CourseRequest request) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Course not found with id: " + id));

        course.setCourseName(request.getCourseName());
        course.setCourseCode(request.getCourseCode());
        course.setDuration(request.getDuration());
        course.setLecturer(request.getLecturer());

        Course updatedCourse = courseRepository.save(course);

        return mapToResponse(updatedCourse);
    }

    // Delete Course
    public void deleteCourse(Long id) {

        Course course = courseRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Course not found with id: " + id));

        courseRepository.delete(course);
    }

    // Entity -> Response DTO
    private CourseResponse mapToResponse(Course course) {
        return CourseResponse.builder()
                .id(course.getId())
                .courseName(course.getCourseName())
                .courseCode(course.getCourseCode())
                .duration(course.getDuration())
                .lecturer(course.getLecturer())
                .build();
    }
}