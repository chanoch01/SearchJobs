"use strict";

document.querySelector(".button-container").addEventListener("click", function () {
  var text = document.getElementById("filter-jobs").value;
  getJobs().then(function (jobs) {
    var filteredJobs = filterJobs(jobs, text);
    showJobs(filteredJobs);
  });
});

function getJobs() {
  return fetch("data.json").then(function (response) {
    return response.json();
  }).then(function (data) {
    return data;
  });
}

function filterJobs(jobs, searchText) {
  if (searchText) {
    var filteredJobs = jobs.filter(function (job) {
      if (job.roleName.toLowerCase().includes(searchText) || job.type.toLowerCase().includes(searchText) || job.company.toLowerCase().includes(searchText) || job.requirements.content.toLowerCase().includes(searchText)) {
        return true;
      } else {
        return false;
      }
    });
    return filteredJobs;
  } else {
    return jobs;
  }
}

function showJobs(jobs) {
  console.log("Jobs in showJobs", jobs);
  var jobsContainer = document.querySelector(".jobs-container");
  var jobsHTML = "";
  jobs.forEach(function (job) {
    jobsHTML += "\n        <div class=\"job-tile\">\n            <div class=\"top\">\n                <img src=\"".concat(job.logo, "\">\n                <span class=\"material-icons more_horiz\">more_horiz</span>\n            </div>\n            <div class=\"rolename\">\n                <span>").concat(job.roleName, "</span>\n            </div>\n            <div class=\"description\">\n                <span>").concat(job.requirements.content, "</span>\n            </div>\n            <div class=\"buttons\">\n                <div class=\"button apply-now\">\n                    Apply Now\n                </div>\n                <div class=\"button\">\n                    Message\n                </div>\n            </div>\n        </div>\n        ");
  });
  jobsContainer.innerHTML = jobsHTML;
} //when the application is loaded


getJobs().then(function (data) {
  showJobs(data);
});