#include <jni.h>
#include "react-native-turbo-starter.h"
#include "log.h"

extern "C" JNIEXPORT jdouble JNICALL
Java_com_reactnativeturbostarter_TurboStarterModule_nativeMultiply(JNIEnv *env, jclass type, jdouble num1, jdouble num2)
{
    LOGI("Calling nativeMultiply");
    return turbostarter::multiply(num1, num2);
}
