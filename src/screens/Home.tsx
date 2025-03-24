  import { Badge } from '../components/badge';
  import { Header } from "../components/index";
  import { Employee } from "../models/Employee";
  import "./Home.css";

  export const Home = () => {
    let employee: Employee = {
      name: "",
      lastname: "",
      employeeId: 0,
      token: "",
      role: "",
    };

    if (localStorage.getItem("employee") !== null) {
      employee = JSON.parse(localStorage.getItem("employee")!);
    }
    console.log("Employee:", employee); 

    return (
      <div className="container">
        <Header />
        <section className="content">
          {employee.role === "admin" ? (
            <div className="admin-content">
              <h2>Administrador</h2>
              <p>
                Bienvenido {employee.name} {employee.lastname}
              </p>
            </div>
          ) : (
            <div className="employee-content">
              <h2>Empleado</h2>
              <p>
                Bienvenido {employee.name} {employee.lastname}
              </p>
            </div>
          )}
        </section>
          <Badge employee={employee}></Badge>
      </div>
    );
  };
