// komarovs.js for index.html
var firstName;
var lastName;
var studentID;
var userName;
var program;
var homeCountry;
var catList = new Array();
var animalList = new Array();

// class declaration
class Category {
  constructor (cattype, logo) {
    this.cattype = cattype; 
    this.logo = logo;
  }
} // end of class Category

class Animal {
  constructor (animal, category, scientific, color, photo) {
    this.animal = animal; this.category = category;
    this.scientific = scientific; this.color = color;
    this.photo = photo;
  }
} // end of class Animal

// document.ready statement
$(document).ready(function(){
  console.log("in doc ready");

  $.ajax({
		type: "GET", 
		url: "data/A2-JSON.json", 	// http://username.dev.fast.sheridanc.on.ca/dataFiles/A2-JSON.json
		dataType: "json",
		success: loadJSON,
		error: function (e) {alert(`${e.status} - ${e.statusText}`);}
	}); // end of ajax call
}); // end of doc ready

// loadJSON function
function loadJSON(data) {
  console.log("in JSON");
	//console.log(data);

  //retrieve personal information from JSON file
  firstName = data.A2Personal.FirstName;
  lastName = data.A2Personal.LastName;
  studentID = data.A2Personal.StudentID;
  userName = data.A2Personal.UserName;
  program = data.A2Personal.Program;
  homeCountry = data.A2Personal.HomeCountry;

  //create category list
	for(let cat of data.Categories) {
    catList.push(
      new Category(cat.cattype, cat.logo));
  } // end of category loop;

  //create animal list
	for(let anm of data.AnimalDetails) {
    animalList.push(
      new Animal(anm.animal, anm.category, anm.scientific, anm.colors, anm.photoDepiction));
  } // end of animal loop;

  // Save data to local storage
  localStorage.setItem("firstName", firstName);
  localStorage.setItem("lastName", lastName);
  localStorage.setItem("studentID", studentID);
  localStorage.setItem("userName", userName);
  localStorage.setItem("program", program);
  localStorage.setItem("homeCountry", homeCountry);
  localStorage.setItem("catList", JSON.stringify(catList));
  localStorage.setItem("animalList", JSON.stringify(animalList));

  mainScreen();
}// end of loadJSON

// mainScreen function
function mainScreen() {
  // display header
  $("#head").html(
    `
    A2 / ${firstName} ${lastName} / ${studentID} / ${userName}
    `
  ).css("color", "#3c5d5d").css({font: "1em Georgia"}).css("font-weight", "bold");

  // display category list
  $("#catList").html("");
  for (let x = 0; x < catList.length; x++) {
    $("#catList").append(
      `
      <p id='${x}'>
        <a class='button' href='pages/catdisplay.html'>
          ${catList[x].cattype}
        </a>
        <img src='images/${catList[x].logo}' class='image'>
      </p>
      `
    )
  }
  // display footer
  $("#foot").html(
    `
    My Sheridan Program: ${program}<br>My Home Country: ${homeCountry}
    `
  ).css("color", "#3c5d5d").css({font: "0.9em Georgia"}).css("font-weight", "bold");

} // end of main

// Save the unique ID for the selection to local storage
$(document).on("click", "#catList >p", function() {
	localStorage.setItem(
		"choice",
		$(this).closest("p").attr("id")
		);
});
 