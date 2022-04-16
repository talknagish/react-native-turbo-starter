#include <android/log.h>
#include <stdio.h>

#define APP_LOG_TAG "reactnativeturbostarter-jni"

#define _APP_LOG(level, tag, ...)                             \
    do                                                        \
    {                                                         \
        ((void)__android_log_print(level, tag, __VA_ARGS__)); \
        printf(__VA_ARGS__);                                  \
        printf("\n");                                         \
        fflush(stdout);                                       \
    } while (0)

#define LOGD(...) _APP_LOG(ANDROID_LOG_DEBUG, APP_LOG_TAG, __VA_ARGS__)
#define LOGI(...) _APP_LOG(ANDROID_LOG_INFO, APP_LOG_TAG, __VA_ARGS__)
#define LOGW(...) _APP_LOG(ANDROID_LOG_WARN, APP_LOG_TAG, __VA_ARGS__)
#define LOGE(...) _APP_LOG(ANDROID_LOG_ERROR, APP_LOG_TAG, __VA_ARGS__)