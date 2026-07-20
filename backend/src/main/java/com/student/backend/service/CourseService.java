package com.student.backend.service;

import com.student.backend.entity.Course;
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
    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    // Get All Courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Get Course By ID
    public Course getCourseById(Long id) {
        return courseRepository.findById(id).orElse(null);
    }

    // Update Course
    public Course updateCourse(Long id, Course updatedCourse) {

        Course course = courseRepository.findById(id).orElse(null);

        if (course != null) {

            course.setCourseName(updatedCourse.getCourseName());
            course.setCourseCode(updatedCourse.getCourseCode());
            course.setDuration(updatedCourse.getDuration());
            course.setLecturer(updatedCourse.getLecturer());

            return courseRepository.save(course);
        }

        return null;
    }

    // Delete Course
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}