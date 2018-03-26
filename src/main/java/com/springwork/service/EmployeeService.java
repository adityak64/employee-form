package com.springwork.service;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.springwork.model.Employee;
import com.springwork.repository.EmployeeRespository;

@Service
@Transactional
public class EmployeeService {

	@Autowired
	EmployeeRespository employeeRespository;
	
	public Employee getEmployeeDetails(String userId) {
		return employeeRespository.findByUserId(userId);
	}

	public List<Employee> getAllUsers() {
		List<Employee> empLst = new ArrayList<Employee>();
		try {
			employeeRespository.findAll().forEach(t-> empLst.add(t));
		} catch(Exception e) {
			System.out.println("Exception: " + e);
		}
		return empLst;
	}

	public void addEmployee(Employee employee) {
		try {
			employeeRespository.save(employee);
		} catch(Exception e) {
			System.out.println("Exception: " + e);
		}
	}

	public void updateEmployee(String userId, Employee employee) {
		try {
			employeeRespository.save(employee);
		} catch(Exception e) {
			System.out.println("Exception: " + e);
		}
	}

	/*public void deleteEmployee(String userId) {
		employeeRespository.delete(userId);
		
	}*/

}
