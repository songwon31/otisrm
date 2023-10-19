package com.finalteam5.otisrm.interceptor;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

//runtime:실행할때만 사용
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD})
public @interface Login {
	public String value() default "Login";
}
