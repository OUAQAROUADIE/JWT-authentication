package com.example.demo.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data@AllArgsConstructor
@NoArgsConstructor
public class UserDto {

    private String Firstname;
    private  String Lastname;

    private String mail;
    private String password;
    private String Role;
}
