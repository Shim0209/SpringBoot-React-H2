package com.react_springboot.book.config;

import com.react_springboot.book.domain.CommonDto;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

import java.util.HashMap;
import java.util.Map;

/**
 * 유효성검사 AOP
 */
@Aspect
@Component
public class BindingAdvice {

    /**
     * 유효성검사 함수
     * com.react_springboot.book.web 하위의 모든 컨트롤러 메서드에서 동작
     * @param proceedingJoinPoint 호출되는 객체, 메서드, 메서드의 매개변수 정보를 제공
     * @return
     *      유효성에 문제 발생 : CommonDto(에러코드 400, 에러메세지)
     *      문제 없음 : 요청에 맞는 컨트롤러 함수 호출
     * @throws Throwable
     */
    @Around("execution(* com.react_springboot.book.web..*Controller.*(..))")
    public Object validCheck(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        // 호출된 함수의 매개변수 정보 추출
        Object[] args = proceedingJoinPoint.getArgs();

        for(Object arg: args){
            // 매개변수에 BindingResult 존재여부 검사
            if(arg instanceof BindingResult) {
                // 매개변수를 BindingResult로 다운캐스팅
                BindingResult bindingResult = (BindingResult) arg;

                // 에러메시지 존재여부 검사
                if (bindingResult.hasErrors()) {
                    Map<String, String> errorMap = new HashMap<>();

                    // 에러메시지가 발생한 필드와 해당 에러메시지를 errorMap에 담기
                    for (FieldError error : bindingResult.getFieldErrors()) {
                        errorMap.put(error.getField(), error.getDefaultMessage());
                    }

                    // 에러메시지 반환
                    return new CommonDto<>(HttpStatus.BAD_REQUEST.value(), errorMap);
                }
            }
        }

        // 유효성검사에 문제가 없을시 다음 호출 정상진행
        return proceedingJoinPoint.proceed();
    }
}
