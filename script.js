// script.js

var navlinks = document.getElementById("navLinks");
function showMenu() {
  navlinks.style.right = "0";
}
function hideMenu() {
  navlinks.style.right = "-200px";
}

document.addEventListener("DOMContentLoaded", function () {
  // Check if the user is logged in
  checkLoggedInUser();
  var loggedInUserId;

  // Login functionality
  const loginForm = document.getElementById("input-form");
  if (loginForm) {
    loginForm.addEventListener("submit", function (event) {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      // Perform login authentication (simulated)
      const user = getUserByEmail(email);
      if (user && user.password === password) {
        // Set the user in local storage to simulate login
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Login Successful");
        // Redirect to the home page
        window.location.href = "index.html";
      } else {
        alert("Invalid login credentials. Please try again.");
      }
    });
  }
  // Signup functionality
  const signupForm = document.getElementById("signup-form");
  if (signupForm) {
    signupForm.addEventListener("submit", function (event) {
      event.preventDefault();
      // Get user input
      const firstName = document.getElementById("firstname").value;
      const lastName = document.getElementById("lastname").value;
      const gender = document.getElementById("gender").value;
      const dob = document.getElementById("dob").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      // Check if the email is already registered
      if (isEmailRegistered(email)) {
        alert("Email is already registered. Please use a different email.");
      } else {
        // Create a new user object
        const newUser = {
          firstName,
          lastName,
          gender,
          dob,
          email,
          password,
        };

        // Get existing users from local storage
        const users = getUsers();

        // Add the new user to the list
        users.push(newUser);

        // Update the users in local storage
        localStorage.setItem("users", JSON.stringify(users));

        // Set the user in local storage to simulate login after signup
        localStorage.setItem("loggedInUser", JSON.stringify(newUser));

        // Redirect to the home page after signup
        window.location.href = "index.html";
      }
    });
  }

  // Logout functionality
  const logoutButton = document.getElementById("logout");
  if (logoutButton) {
    logoutButton.addEventListener("click", function () {
      // Clear the user from local storage to simulate logout
      localStorage.removeItem("loggedInUser");
      // Redirect to the login page after logout
      window.location.href = "login-page.html";
    });
  }

  // Start Today functionality
  const startTodayButton = document.getElementById("home-button");
  if (startTodayButton) {
    startTodayButton.addEventListener("click", function () {
      // Redirect to the workout page
      window.location.href = "workout.html";
    });
  }

  // Function to check if an email is already registered
  function isEmailRegistered(email) {
    const users = getUsers();
    return users.some((user) => user.email === email);
  }

  // Function to get user by email
  function getUserByEmail(email) {
    const users = getUsers();
    return users.find((user) => user.email === email);
  }

  // Function to get users from local storage
  function getUsers() {
    return JSON.parse(localStorage.getItem("users")) || [];
  }

  // Function to check if a user is logged in
  function checkLoggedInUser() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      // User is logged in, hide login and signup options
      loggedInUserId = loggedInUser.email;
      hideLoginAndSignupOptions();
      console.log("User is logged in:", loggedInUser);
    }
  }

  // Function to hide login container

  // Function to hide login and signup options
  function hideLoginAndSignupOptions() {
    const loginNav = document.getElementById("login-nav");
    const signupNav = document.getElementById("signup-nav");

    if (loginNav) {
      loginNav.style.display = "none";
    }

    if (signupNav) {
      signupNav.style.display = "none";
    }
  }

  const workoutData = {
    type: "Cardio",
    duration: 30,
    intensity: 5,
    caloriesBurnt: 200,
    waterIntake: 1,
  };
  //function to store user workout data in local storage
  saveWorkoutDataToLocal(loggedInUserId, workoutData);

  function saveWorkoutDataToLocal(userId, data) {
    const existingUserData = localStorage.getItem(userId);
    console.log("user details", existingUserData);
    const userDataArray = existingUserData ? JSON.parse(existingUserData) : [];
    console.log("userDataArray", userDataArray);
    userDataArray.push(data);
    localStorage.setItem(userId, JSON.stringify(userDataArray));
  }
});
