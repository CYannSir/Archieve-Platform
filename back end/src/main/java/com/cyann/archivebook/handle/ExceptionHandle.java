package com.cyann.archivebook.handle;

import com.cyann.archivebook.enums.ResultEnum;
import com.cyann.archivebook.exception.MyException;
import com.cyann.archivebook.util.Result;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;



/**
 * @author CYann
 * @date 2018-02-26 21:24
 */
@ControllerAdvice
public class ExceptionHandle {

    @ExceptionHandler(value = Exception.class)
    @ResponseBody
    public Result handle(Exception e){
        if(e instanceof MyException){
            MyException myException = (MyException) e;
            return Result.error(myException.getCode() , myException.getMessage());
        }
        else {
            System.out.println(e);
            return Result.error(ResultEnum.ERROR_UNKONW.getCode(),ResultEnum.ERROR_UNKONW.getMsg());
        }
    }

}
