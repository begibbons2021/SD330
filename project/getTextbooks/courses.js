/*
 * Brendan Gibbons
 * CMPT 330 111
 * Professor Tokash
 * 
 * May 9, 2023
 * 
 * courses.json
 * 
 * Handles field selection responses for courses.html
 * 
 */

/**
 * Holds information on the list of courses currently in the database.
 */
var courseInformation;

/**
 * Activates upon loading the page and sets initial variables and fields
 */
async function onload() {
    courseInformation = await getCourseData();
    fillYears();
}

/**
 * Retrieves initial textbook data from GitHub
 * 
 * @returns The JSON object containing all textbook information
 */
async function getCourseData() {
    const apiCall = await fetch(new Request('https://begibbons2021.github.io/SD330/project/getTextbooks/textbook.json'));
    const apiData = await apiCall.json();

    return apiData;
}

/**
 * Sets options for years in the form
 * 
 */
function fillYears() {
    yearSelect = document.getElementById("yearSelect");

    years = []
    for (course of courseInformation.Course) {
        year = course.year;
        if (!years.includes(year)) {
            years.push(year);
            yearSelect.innerHTML += '<option value="' + year + '">' + year + '</option>';
        }
    }

    // for (data in courseInformation)
}

/**
 * Sets option availability for semesters in the form
 * 
 */
function setSemesters() {
    yearSelect = document.getElementById("yearSelect");
    semesterSelect = document.getElementById("semesterSelect");
    departmentSelect = document.getElementById("departmentSelect");
    courseSelect = document.getElementById("courseSelect");

    resetCourseDisplay();

    lookupButton = document.getElementById("lookupButton");
    lookupButton.setAttribute("disabled", "");

    semesterSelect.selectedIndex = 0;

    departmentSelect.innerHTML = '<option value="">----</option>';
    departmentSelect.setAttribute("disabled", "");

    courseSelect.innerHTML = '<option value="">--------------------------------</option>';
    courseSelect.setAttribute("disabled", "");

    /* https://ricardometring.com/getting-the-value-of-a-select-in-javascript*/
    if (yearSelect.options[yearSelect.selectedIndex].value != '') {
        semesterSelect.removeAttribute("disabled");
    }
    else {
        semesterSelect.setAttribute("disabled", "");
    }
}

/**
 * Sets options and option availability for departments in the form
 * 
 */
function setDepartments() {
    semesterSelect = document.getElementById("semesterSelect");
    departmentSelect = document.getElementById("departmentSelect");
    courseSelect = document.getElementById("courseSelect");

    resetCourseDisplay();

    lookupButton = document.getElementById("lookupButton");
    lookupButton.setAttribute("disabled", "");

    departmentSelect.innerHTML = '<option value="">----</option>';
    courseSelect.innerHTML = '<option value="">--------------------------------</option>';
    courseSelect.setAttribute("disabled", "");

    /* https://ricardometring.com/getting-the-value-of-a-select-in-javascript*/
    if (semesterSelect.options[semesterSelect.selectedIndex].value != '') {
        departmentSelect.removeAttribute("disabled");

        departments = []
        for (course of courseInformation.Course) {
            department = course.department;
            if (!departments.includes(department)) {
                departments.push(department);
                departmentSelect.innerHTML += '<option value="' + department + '">' + department + '</option>';
            }
        }
    }
    else {
        departmentSelect.setAttribute("disabled", "");

    }

}

/**
 * Sets options and option availability for courses in the form
 * 
 */
function setCourses() {
    yearSelect = document.getElementById("yearSelect");
    semesterSelect = document.getElementById("semesterSelect");
    departmentSelect = document.getElementById("departmentSelect");
    courseSelect = document.getElementById("courseSelect");

    resetCourseDisplay();

    lookupButton = document.getElementById("lookupButton");
    lookupButton.setAttribute("disabled", "");

    courseSelect.innerHTML = '<option value="">--------------------------------</option>';
    courseSelect.setAttribute("disabled", "");

    /* https://ricardometring.com/getting-the-value-of-a-select-in-javascript*/
    if (departmentSelect.options[departmentSelect.selectedIndex].value != '') {


        courses = []
        for (course of courseInformation.Course) {
            year = yearSelect.options[yearSelect.selectedIndex].value;
            semester = semesterSelect.options[semesterSelect.selectedIndex].value;
            department = departmentSelect.options[departmentSelect.selectedIndex].value;

            if (course.year == year
                && course.semester == semester
                && course.department == department) {
                courseId = course.courseId;

                if (!courses.includes(courseId)) {
                    courses.push(courseId);
                    courseName = course.department + course.courseNum + " " + course.section + " - " + course.name;
                    courseSelect.innerHTML += '<option value="' + courseId + '">' + courseName + '</option>';
                }

            }
        }


        if (courses.length != 0) {
            courseSelect.removeAttribute("disabled");
        }
        else {
            courseSelect.innerHTML = '<option value="">No Courses Are Being Offered</option>';
        }


    }
    else {
        courseSelect.setAttribute("disabled", "");
    }

}

/**
 * Displays the information for the currently selected course using its course Id.
 * If no course is selected, this calls resetCourseDisplay.
 * 
 * @see resetCourseDisplay
 * 
 */
function displayCourseInfo() {
    courseSelect = document.getElementById("courseSelect");

    lookupButton = document.getElementById("lookupButton");

    courseId = courseSelect.options[courseSelect.selectedIndex].value;
    /* https://ricardometring.com/getting-the-value-of-a-select-in-javascript */
    if (courseId != '') {
        let courseData = courseInformation.Course.find(course => courseId == course.courseId);

        courseNameDisplay.innerText = courseData.name;
        if (courseData.professor != undefined && courseData.professor != null) {
            courseProfessorDisplay.innerText = courseData.professor;
        }

        courseDepartmentDisplay.innerText = courseData.department;
        courseNumDisplay.innerText = courseData.courseNum;
        courseSectionNumDisplay.innerText = courseData.section;

        courseSemesterDisplay.innerText = courseData.semester + " " + courseData.year;

        lookupButton.removeAttribute("disabled");
    }
    else {
        resetCourseDisplay();

        lookupButton.setAttribute("disabled", "");
    }

}

/**
 * Sets all course selection fields to blank values
 * 
 */
function resetCourseDisplay() {
    courseNameDisplay = document.getElementById("courseNameDisplay");
    courseProfessorDisplay = document.getElementById("courseProfessorDisplay");
    courseDepartmentDisplay = document.getElementById("courseDepartmentDisplay");
    courseNumDisplay = document.getElementById("courseNumDisplay");
    courseSectionNumDisplay = document.getElementById("courseSectionNumDisplay");
    courseSemesterDisplay = document.getElementById("courseSemesterDisplay");

    courseNameDisplay.innerText = "No Course Selected";
    courseProfessorDisplay.innerText = "";

    courseDepartmentDisplay.innerText = "";
    courseNumDisplay.innerText = "";
    courseSectionNumDisplay.innerText = "";

    courseSemesterDisplay.innerText = "";

}

/**
 * Redirects the user to textbooks.html with the course ID of the currently
 * selected course as a GET argument.
 * 
 */
function textbookLookup() {
    courseSelect = document.getElementById("courseSelect");

    let courseId = courseSelect.options[courseSelect.selectedIndex].value;

    console.log("Searching for textbooks for CourseID " + courseId);

    window.location.href = "textbooks.html?courseId=" + encodeURIComponent(courseId);
}