package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class DemoApplication {
	// Quản lí sinh viên
	// Sinh viên (name, studentCode, score)
	// Lấy ra danh sách tất cả sinh viên
	// Thêm 1 sinh viên mới vào danh sách
	// Update điểm cho sinh viên
	// Delete 1 thằng sv nào đó

	public static void main(String[] args) {
		SpringApplication.run(DemoApplication.class, args);
	}

	// Restfull API
	// Cách đặt tên API

	// Thêm một sv mới
	// /api/student      => POST: Tạo 1 thằng student mới
	// /api/student/1     => PUT: Update thông tin của thằng student
	// /api/student		=> GET: lấy tất cả student
	// /api/student/1	=> GET: Lấy thông tin của 1 thằng cụ thể


	// Method:
	/*
	POST => create
	PUT => update
	DELETE => delete
	GET => get
	 */
}
