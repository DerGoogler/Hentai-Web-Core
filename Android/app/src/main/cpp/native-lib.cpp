#include <jni.h>
#include <string>
#include <cstdlib>
#include <pthread.h>
#include <unistd.h>
#include <android/log.h>

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_hentai_tools_Lib_getReleaseURl(JNIEnv *env, jclass clazz) {
    std::string data = "https://www.service.dergoogler.com/hentai-web/?activity=main";
    return env->NewStringUTF(data.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_hentai_tools_Lib_getDebugURl(JNIEnv *env, jclass clazz) {
    std::string data = "http://192.168.178.81:5500/?activity=main";
    return env->NewStringUTF(data.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_hentai_tools_Lib_getInterfaceName(JNIEnv *env, jclass clazz) {
    std::string data = "Android";
    return env->NewStringUTF(data.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_hentai_tools_Lib_getUserAgent(JNIEnv *env, jclass clazz) {
    std::string data = "HENTAI_WEB_AGENT";
    return env->NewStringUTF(data.c_str());
}

extern "C"
JNIEXPORT jstring JNICALL
Java_com_dergoogler_hentai_tools_Lib_getStorageKey(JNIEnv *env, jclass clazz) {
    std::string data = "localstorage";
    return env->NewStringUTF(data.c_str());
}