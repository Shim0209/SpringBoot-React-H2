package com.react_springboot.book.config;

import com.react_springboot.book.domain.CommonDto;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

@Aspect
@Component
public class BindingAdvice {

    private static final Logger log = LoggerFactory.getLogger(BindingAdvice.class);

    /**
     * 유효성검사 함수
     * com.react_springboot.book.web 하위의 모든 컨트롤러 메서드에서 동작
     * @param proceedingJoinPoint 호출되는 객체, 메서드, 메서드의 매개변수 정보를 제공
     * @return
     *      유효성에 문제 발생 : CommonDto(에러코드 400, 에러메세지)
     *      문제 없음 : 요청에 맞는 컨트롤러 함수 호출
     * @throws Throwable
     *
     * 정상적인 접근에서는 동작하지 않음. (프론트에서 유효성검사를 하기때문에)
     * 비정상적인 접근시 막기 위함. Postman사용, http요청 오류 등
     */
    @Around("execution(* com.react_springboot.book.web..*Controller.*(..))")
    public Object validCheck(ProceedingJoinPoint proceedingJoinPoint) throws Throwable {
        String type = proceedingJoinPoint.getSignature().getDeclaringTypeName();
        String method = proceedingJoinPoint.getSignature().getName();
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
                        log.warn(type+"."+method+"() => 필드 : "+error.getField()+", 메시지 : "+error.getDefaultMessage());
                    }

                    // 에러메시지 반환
                    return new CommonDto<>(HttpStatus.BAD_REQUEST.value(), errorMap);
                }
            }
        }

        // 유효성검사에 문제가 없을시 다음 호출 정상진행
        return proceedingJoinPoint.proceed();
    }

//    /**
//     *  AOP 테스트용
//     */
//    @Before("execution(* com.react_springboot.book.web..*Controller.*(..))")
//    public void testCheck() {
//        HttpServletRequest request = ((ServletRequestAttributes)RequestContextHolder.currentRequestAttributes()).getRequest();
//        System.out.println("주소 : " + request.getRequestURI());
//        System.out.println("메서드 : " + request.getMethod());
//        System.out.println("전처리 로그를 남겼습니다.");
//    }
}
