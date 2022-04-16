# react-native-turbo-starter

React 0.68+ Turbo Module starter using codegen with typescript for Objective-C and Java/Kotlin with C++ shared library. 🚀🚀🚀

## Features
- [x] React Native 0.68+
- [x] Upgraded react-native-create-library module to TurboModule
- [x] Codegen with typescript
- [x] Objective-C using JSI without the bridge
- [x] Java/Kotlin using JSI without the bridge
- [x] Shared C++ TurboModule
- [x] Array/Dictionaries/Promises usage
- [x] Native usage (battery level)

## Considerations and Notes

1. This module doesn't offer backward compatiablility. You will only be able to use it with the new architecture enabled.
2. The shared C++ library does require JNI bindings on Android and converting types on iOS from c++ to Objective-C
3. We didn't find an easy way to incorporate swift instead of Objective-c (it's not as easy to call C++ code from Swift)
4. We pin CMake version to support M1 machines. We also used CMake to compile the shared C++ library because it's the recommended tech (in oppose to ndk-build)
5. In the .podspec file, the version of folly has to be exactly the same as the react-native's version

## Clone and create your own library

## Running the example

```sh
yarn bootstrap
```

ios
```sh
yarn ios
```

android
```sh
yarn android
```

## Adding new functionality

Adding another function is very simple using codegen. 

### Native function

### C++ function

### Codegen

## Steps taken to create this repository

1. Create the repo using react-native-create-library (https://github.com/talknagish/react-native-turbo-starter/commit/f755c6ec6aa653d46a92474592de552cb3ba3f6c)
2. Upgrade the library to react-native 0.68 (https://github.com/talknagish/react-native-turbo-starter/pull/1)
3. Upgrade the example to react-native 0.68 and call 1 turbo module function (https://github.com/talknagish/react-native-turbo-starter/pull/2)
4. Expend the Spec and call complex types (https://github.com/talknagish/react-native-turbo-starter/pull/3)
5. Call native code (https://github.com/talknagish/react-native-turbo-starter/pull/4)
6. Add the shared C++ library (https://github.com/talknagish/react-native-turbo-starter/pull/5)

## Known Issues
1. Full refresh (cmd + R) on Android crashes the application because of an issue in shadowTreeRegistry.cpp (didn't find a respective issue in their repo)
2. When building for Android codegen doesn't always generates the new spec, so sometimes you have to delete the build folders until we find a better solution 

## BridgeSpy

## License

MIT
