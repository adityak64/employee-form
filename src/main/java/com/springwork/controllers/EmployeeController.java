package com.springwork.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.springwork.model.Employee;
import com.springwork.service.EmployeeService;

@RestController
@RequestMapping(path="/employee")
public class EmployeeController {
	
	@Autowired
	EmployeeService employeeService;
	
	@RequestMapping(method=RequestMethod.GET, value="/viewEmployee/{userId}")
	public Employee getEmployee(@PathVariable String userId) {		
		return employeeService.getEmployeeDetails(userId);
	}
	
	@RequestMapping(method=RequestMethod.GET, value="/allEmployee")
	public List<Employee> getAllEmployee() {
		return employeeService.getAllUsers();		
	}
	
	@RequestMapping(method=RequestMethod.POST, value="/addEmployee")
	public void addEmployee(@RequestBody Employee employee) {
		employeeService.addEmployee(employee);		
	}
	

	@RequestMapping(method=RequestMethod.PUT, value="/updateEmployee/{userId}")
	public void updateEmployee(@RequestBody Employee employee, @PathVariable String userId) {
		employeeService.updateEmployee(userId, employee);
	}
	
	/*@RequestMapping(method=RequestMethod.DELETE, value="/deleteEmployee/{userId}")
	public void deleteEmployee(@PathVariable String userId) {
		employeeService.deleteEmployee(userId);
	}*/
	

}
