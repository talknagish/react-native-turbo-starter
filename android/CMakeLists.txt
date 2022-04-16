cmake_minimum_required(VERSION 3.9)

project(reactnativeturbostarter-jni LANGUAGES CXX)

set(CMAKE_VERBOSE_MAKEFILE ON)
set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

file(GLOB SOURCES "../cpp/*.cpp")
file(GLOB JNISOURCES "src/main/jni/*.cpp")

add_compile_options(-Wall -Werror -fexceptions -frtti)
add_library(${PROJECT_NAME}
    SHARED
    ${SOURCES}
    ${JNISOURCES}
)

include_directories(
    ../cpp
)

find_library(
    log-lib
    log
)

target_link_libraries(
    ${PROJECT_NAME}
    android
    ${log-lib}
)