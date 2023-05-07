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
 * Holds the course Id which is being searched
 */
var courseId; 

/**
 * Activates upon loading the page and sets initial variables and fields.
 * It also calls @function getTextbooks() to display the textbooks associated 
 * with the course.
 */
async function onload() {
    courseInformation = await getCourseData();
    courseId = new URLSearchParams(document.location.search).get("courseId");
    /* https://stackoverflow.com/questions/22607150/getting-the-url-parameters-inside-the-html-page */

    checkCourseId();

    getTextbooks();
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
 * Checks if the course Id provided as parameter is a valid course ID and sets
 * the breadcrumb field to the Department, Course Number, Section Number, and 
 * course name of the course if it exists. 
 * 
 * Otherwise, the user is redirected back to the course selection page.
 * 
 */
function checkCourseId() {
    course = courseInformation.Course.find(course => course.courseId == courseId);

    if (course != null && course != undefined) {
        console.log("Course data was found!");

        let courseInfo = document.getElementById("currentCourse");
        let courseName = course.department + course.courseNum + " " + course.section + " - " + course.name;

        courseInfo.innerText = courseName;
    }
    else {
        console.log("Course data does not exist for CourseID " + courseId);

        alert("The course you requested does not exist or was removed from the catalog.\n" +
            "Please try again.")
        window.location.href = "courses.html";
    }
}

/**
 * Displays all textbooks which belong to the courseId selected by the user.
 * 
 */
function getTextbooks() {
    books = courseInformation.Textbook.map(book => {
                                                    if (book.courseId == courseId) {
                                                        return book;
                                                    }
    });

    if (books.length != 0) {
        courseTextbookList = document.getElementById("courseTextbookList");
        
        let matches = 0;
        for (book of books) {
            if (book != undefined) {

                matches++;

                console.log(book);

                textbookInfo = "<div class='textbookListing'>";

                textbookInfo += "<h2 class='textbookName'>" + book.name + "</h2>";
                if (book.edition != null && book.edition != undefined) {
                    textbookInfo += "<h3 class='textbookEdition'> Edition: " + book.edition + "</h3>";
                }

                if (book.author != null && book.author != undefined) {
                    textbookInfo += "<h3 class='textbookAuthors'> Author(s): " + book.author + "</h3>";
                }

                if (book.publisher != null && book.publisher != undefined) {
                    textbookInfo += "<h3 class='textbookPublisher'> Publisher: " + book.publisher + "</h3>";
                }

                if (book['ISBN-13'] != null && book['ISBN-13'] != undefined) {
                    textbookInfo += "<h4 class='textbookISBN'> ISBN-13: <a href='https://isbnsearch.org/isbn/" + encodeURIComponent(book['ISBN-13']) + "' target='.blank'> " + book['ISBN-13'] + "</h4>";
                }

                textbookInfo += "</div>";

                courseTextbookList.innerHTML += textbookInfo;
            }
        }

        if (matches > 0) {
            countElement = document.getElementById("courseTextbookCount");

            let countStr = matches + " Textbook";

            if (matches != 1) {
                countStr += "s";
            }
            
            countStr += " Found";

            countElement.innerHTML = "<h1>" + countStr + "</h1>";

        }
    }
}


