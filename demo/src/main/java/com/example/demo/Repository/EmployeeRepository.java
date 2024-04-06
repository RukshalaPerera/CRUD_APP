package com.example.demo.Repository;
import com.example.demo.Model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
    List<Employee> findByNIC(String NIC);
    List<Employee> findByDescription(String description);

}