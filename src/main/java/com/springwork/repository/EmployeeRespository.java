package com.springwork.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.springwork.model.Employee;

@Repository
public interface EmployeeRespository extends CrudRepository<Employee, Integer> {
	
	public Employee findByUserId(String userId);

}
