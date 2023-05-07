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
    courseInformation = getCourseData();
    fillYears();
}

async function getCourseData() {
    const apiCall = await fetch(new Request("textbook.json"));
    const apiData = await apiCall.json();

    return apiData;
}

function fillYears() {
    yearSelect = document.getElementById("yearSelect");

    for (course of courseInformation.Course) { 
        console.log(item);
    }

    // for (data in courseInformation)
}