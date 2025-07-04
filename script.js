document.addEventListener("DOMContentLoaded", () => {
  const studentForm = document.getElementById("studentForm");
  const recordsList = document.getElementById("recordsList");

  let students = JSON.parse(localStorage.getItem("students")) || [];

  function validateForm(name, id, email, contact) {
    const namePattern = /^[A-Za-z\s]+$/;
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const contactPattern = /^[0-9]{10}$/;

    if (!name || !id || !email || !contact) {
      alert("Please fill all fields.");
      return false;
    }
    if (!namePattern.test(name)) {
      alert("Name should contain only letters.");
      return false;
    }
    if (!emailPattern.test(email)) {
      alert("Invalid email format.");
      return false;
    }
    if (!contactPattern.test(contact)) {
      alert("Contact should be a 10-digit number.");
      return false;
    }
    return true;
  }

  function displayStudents() {
    recordsList.innerHTML = "";
    students.forEach((student, index) => {
      const row = `<tr>
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.contact}</td>
        <td>
          <button class="edit" onclick="editStudent(${index})">Edit</button>
          <button class="delete" onclick="deleteStudent(${index})">Delete</button>
        </td>
      </tr>`;
      recordsList.innerHTML += row;
    });
  }

  window.editStudent = function (index) {
    const student = students[index];
    document.getElementById("studentName").value = student.name;
    document.getElementById("studentID").value = student.id;
    document.getElementById("emailID").value = student.email;
    document.getElementById("contactNo").value = student.contact;

    deleteStudent(index);
  };

  window.deleteStudent = function (index) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    displayStudents();
  };

  studentForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("studentName").value.trim();
    const id = document.getElementById("studentID").value.trim();
    const email = document.getElementById("emailID").value.trim();
    const contact = document.getElementById("contactNo").value.trim();

    if (validateForm(name, id, email, contact)) {
      const newStudent = { name, id, email, contact };
      students.push(newStudent);
      localStorage.setItem("students", JSON.stringify(students));
      displayStudents();
      studentForm.reset();
    }
  });

  displayStudents();
});
