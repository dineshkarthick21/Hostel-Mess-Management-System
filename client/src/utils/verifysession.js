const verifysession = async () => {
    let student = localStorage.getItem("student");
    if (student) {
      let studentData = JSON.parse(student);
      if (studentData) {
        window.location.href = "/student-dashboard";
        return;
      }
    }
    let admin = localStorage.getItem("admin");
    if (admin) {
      let adminData = JSON.parse(admin);
      if (adminData) {
        window.location.href = "/admin-dashboard";
        return;
      }
    }
  };

  export default verifysession;