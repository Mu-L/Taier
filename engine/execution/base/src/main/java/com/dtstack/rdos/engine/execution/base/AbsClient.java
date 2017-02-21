package com.dtstack.rdos.engine.execution.base;

import com.dtstack.rdos.engine.entrance.sql.operator.AddJarOperator;
import com.dtstack.rdos.engine.entrance.sql.operator.Operator;
import com.dtstack.rdos.engine.execution.pojo.JobResult;

import java.util.List;
import java.util.Properties;

/**
 * Reason:
 * Date: 2017/2/21
 * Company: www.dtstack.com
 *
 * @ahthor xuchao
 */

public abstract class AbsClient implements IClient{

    @Override
    public JobResult submitJob(JobClient jobClient) {
        //根据operator 判断是提交jar任务还是生成sqltable并提交任务
        boolean isJarOperator = false;
        AddJarOperator jarOperator = null;
        for(Operator operator : jobClient.getOperators()){
            if(operator instanceof AddJarOperator){
                isJarOperator = true;
                jarOperator = (AddJarOperator) operator;
                break;
            }
        }

        if(isJarOperator){
            adaptToJarSubmit(jarOperator);
        }else{
            adaptToSqlSubmit(jobClient.getOperators());
        }

        return null;
    }

    public void adaptToJarSubmit(AddJarOperator jarOperator){
        Properties properties = new Properties();
        properties.setProperty("jarpath", jarOperator.getJarPath());
        submitJobWithJar(properties);
    }

    public void adaptToSqlSubmit(List<Operator> operators){

    }
}
