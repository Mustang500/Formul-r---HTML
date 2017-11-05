

function createRow(){
	var name = document.getElementById('name').value;
	var age = parseInt(document.getElementById('age').value);
	var email = document.getElementById('email').value;	  
	var sex;
	if (document.getElementById('sexM').checked){
		sex = document.getElementById('sexM').innerHTML = "<img src='male.png'>";
	}
	else if (document.getElementById('sexW').checked){
		sex = document.getElementById('sexW').innerHTML = "<img src='female.png'>";
	}

	if(!dataVerification(email)) return;

	addRowToTable([name, email, age, sex]);
  deleteInputValues();
}


function dataVerification(email) {
	var emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/g; 
	if (!emailRegex.test(email)){
		
		alert('insert new email');
		return false;
	}
  if (!isEmailUnique(email)) {
    alert('insert new email');
    return false;
  }
	return true;
}

function isEmailUnique(email){
  var table=document.getElementById('resultTable');
  rows = table.getElementsByTagName("TR");
  for (i = 1; i < (rows.length); i++) {
    emailInRow=rows[i].children[1].innerHTML;
    if (email==emailInRow) {
      return false;
    }
  }
  return true;
}


function addRowToTable(values) {
	
	var newRow = document.createElement("tr");
	var columnCount = document.getElementById('resultHeaderRow').children.length;

	for (var i = 0; i < columnCount-1; i++) {// -1 lebo 5 stlpec bude doplneny manualne addDeleteButton
	newRow.appendChild(createCell(values[i]));
	}
  newRow.appendChild(addDeleteButton());
	document.getElementById('resultTable').appendChild(newRow);
}


function createCell(value){
	var newCell = document.createElement("td");
	newCell.innerHTML = value;
	return newCell;
}

function addDeleteButton(){
var newCell = document.createElement("td");
var button=document.createElement("button");
button.innerHTML="Delete";
button.onclick=deleteRow;
newCell.appendChild(button);
return newCell;
}

 function deleteRow(event){
  var rowToDelete=event.target.parentNode.parentNode;
  var table=rowToDelete.parentNode;
  table.removeChild(rowToDelete); 
 }

function deleteInputValues(){
  document.getElementById('name').value="";
  document.getElementById('surename').value="";
  document.getElementById('age').value="";
  document.getElementById('sexM').checked=false;
  document.getElementById('sexW').checked=false;

}

function sortTable(n) {
  var table, rows, switching, i, x, y, shouldSwitch, dir, switchcount = 0;
  table = document.getElementById("resultTable");
  switching = true;
  
  dir = "asc"; 
  
  while (switching) {
    
    switching = false;
    rows = table.getElementsByTagName("TR");
  
    for (i = 1; i < (rows.length - 1); i++) {
    	
      shouldSwitch = false;
      
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      
      if (dir == "asc") {
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          
          shouldSwitch= true;
          break;
        }
      } else if (dir == "desc") {
        if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
          
          shouldSwitch= true;
          break;
        }
      }
    }
    if (shouldSwitch) {
     
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      
      switchcount ++; 
    } else {
      
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
}


var letters=' ABCÇDEFGHIJKLMNÑOPQRSTUVWXYZabcçdefghijklmnñopqrstuvwxyzáÀÁéèÈÉíìÍÌïÏóòÓÒúùÚÙüÜščž'
var numbers='1234567890./'
var signs=',.:;@-\''
var mathsigns='+-=()*/'
var custom='<>#$%&?¿'

function alpha(e,allow) {
     var k;
     k=document.all?parseInt(e.keyCode): parseInt(e.which);
     return (allow.indexOf(String.fromCharCode(k))!=-1);
}


function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
}




