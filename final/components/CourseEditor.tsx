import React from 'react';
import { Course } from '../types';

interface CourseEditorProps {
    course?: Course;
}

export const CourseEditor: React.FC<CourseEditorProps> = ({ course }) => {
    return (
        <div>
            <h1>{course ? `Editing: ${course.title}` : 'Create New Course'}</h1>
            {/* Form for editing course details would go here */}
        </div>
    );
};
