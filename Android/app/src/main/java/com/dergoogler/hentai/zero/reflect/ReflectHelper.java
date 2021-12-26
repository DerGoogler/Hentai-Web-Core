package com.dergoogler.hentai.zero.reflect;

import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;

/**
 * Reflect Helper
 *
 * @author mcharima5@gmail.com
 * @since 2018
 */
public class ReflectHelper {

	public static Method getMethod(Object instance, String methodName) throws IllegalArgumentException {
		Method[] methods = instance.getClass().getDeclaredMethods();
		for (Method method : methods) {
			if (methodName.equals(method.getName())) {
				return method;
			}
		}
		return null;
	}

	public static void invoke(Object instance, Method method, Object...param) throws InvocationTargetException, IllegalAccessException {
		if (null == instance) {
			return;
		}
		method.setAccessible(true);
		method.invoke(instance, param);
		method.setAccessible(false);
	}

}
