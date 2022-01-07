// variable declaration for each data item 
var firstName;
var lastName;
var studentID;
var userName;
var program;
var homeCountry;
var choice;
var catList = new Array();
var animalList = new Array();

$(document).ready(function() {
  
  // get local storage values
  firstName = localStorage.getItem("firstName");
  lastName = localStorage.getItem("lastName");
  studentID = localStorage.getItem("studentID");
  userName = localStorage.getItem("userName");
  program = localStorage.getItem("program");
  homeCountry = localStorage.getItem("homeCountry");
	choice = localStorage.getItem("choice");
  catList = JSON.parse(localStorage.getItem("catList"));
	animalList = JSON.parse(localStorage.getItem("animalList"));

  //console.log(catList[choice].cattype);

    // display header
    $("#head").html(
      `
      A2 / ${firstName} ${lastName} / ${studentID} / ${userName}
      `
    ).css("color", "#3c5d5d").css({font: "1em Georgia"}).css("font-weight", "bold");

    //create animal list of chosen category
    $("#list").html(`<h3>Animals from the ${catList[choice].cattype} Category</h3>`);

	  for(let item of animalList) {
		if(item.category === catList[choice].cattype) {
      // display animal in upper case
      let animal = item.animal.toUpperCase();
      $("#list").append(
      `
      <p><label><strong>Name: ${animal}</strong> with 
        scientific name of <em>${item.scientific}</em> has a basic
        colour range of: <em>${item.color}</em></label><br>
        <img src = '${item.photo}' width='79' height='79'></p>
      `)
			} // end of loop;
  }

    // display footer
    $("#foot").html(
      `
      My Sheridan Program: ${program}<br>My Home Country: ${homeCountry}
      `
    ).css("color", "#3c5d5d").css({font: "0.9em Georgia"}).css("font-weight", "bold");

}); // end of doc ready


