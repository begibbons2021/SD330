/**
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

var courseInformation;
onload();

async function onload() {
    courseInformation = await getCourseData();
    fillYears();
}

async function getCourseData() {
    const apiCall = await fetch(new Request('https://begibbons2021.github.io/SD330/project/getTextbooks/textbook.json'));
    const apiData = await apiCall.json();

    return apiData;
}

function fillYears() {
    yearSelect = document.getElementById("yearSelect");

    years = []
    for (course of courseInformation.Course) { 
        year = course.year;
        if (!years.includes(year)) {
            years.push(year);
            yearSelect.innerHTML += '<option value="' +  year + '">' + year + '</option>';
        }

        console.log(course);
    }

    console.log(years)

    // for (data in courseInformation)
}


function setSemesters() {
    yearSelect = document.getElementById("yearSelect");
    semesterSelect = document.getElementById("semesterSelect");
    departmentSelect = document.getElementById("departmentSelect");
    courseSelect = document.getElementById("courseSelect");

    /* https://ricardometring.com/getting-the-value-of-a-select-in-javascript*/
    if (yearSelect.options[yearSelect.selectedIndex].value != '') {
        semesterSelect.removeAttribute("disabled");
    }
    else {
        semesterSelect.setAttribute("disabled", "");

        departmentSelect.innerHTML = '<option value="">----</option>';
        departmentSelect.setAttribute("disabled", "");

        courseSelect.innerHTML = '<option value="">--------------------------------</option>';
        courseSelect.setAttribute("disabled", "");
    }
}

function setDepartments() {
    semesterSelect = document.getElementById("semesterSelect");
    departmentSelect = document.getElementById("departmentSelect");
    courseSelect = document.getElementById("courseSelect");

    departmentSelect.innerHTML = '<option value="">----</option>';

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

        courseSelect.innerHTML = '<option value="">--------------------------------</option>';
        courseSelect.setAttribute("disabled", "");
    }

}

function setCourses() {
    yearSelect = document.getElementById("yearSelect");
    semesterSelect = document.getElementById("semesterSelect");
    departmentSelect = document.getElementById("departmentSelect");
    courseSelect = document.getElementById("courseSelect");

    courseSelect.innerHTML = '<option value="">--------------------------------</option>';

    /* https://ricardometring.com/getting-the-value-of-a-select-in-javascript*/
    if (departmentSelect.options[departmentSelect.selectedIndex].value != '') {
        

        courses = []
        for (course of courseInformation.Course) {
            year = yearSelect.options[yearSelect.selectedIndex].value;
            semester = semesterSelect.options[semesterSelect.selectedIndex].value;
            department = departmentSelect.options[departmentSelect.selectedIndex].value;

            console.log(year + " " + semester + " " + department)

            if (course.year == year 
                    && course.semester == semester
                    && course.department == department) {
                courseId = course.courseId;
                console.log(courseId);
                if (!courses.includes(courseId)) {
                    courses.push(courseId);
                    courseName = department + course.courseNum + " " + course.section +  " - " + course.name; 
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