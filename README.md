![t-03](https://user-images.githubusercontent.com/176762/163689112-07bcd4da-6c1a-4a6e-93a5-dfafdeb30ea3.png)

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
- [x] M1 e2e Compilation of RN New Architecture

## Considerations and Notes

1. This module doesn't offer backward compatibility. You will only be able to use it with the new architecture enabled.
2. The shared C++ library requires JNI bindings on Android, and converting types on iOS from C++ to Objective-C.
3. We didn't find an easy way to incorporate Swift instead of Objective-C (it's not as easy to call C++ code from Swift).
4. We pin CMake version to support M1 machines. We also used CMake to compile the shared C++ library because it's the recommended tech (in oppose to ndk-build).
5. In the `.podspec` file, the version of folly has to be exactly the same as the react-native's version
6. In case you are using an M1 machine, you will need to add the following to your local.properties file to build on Android (temporary workaround as mentioned [here](https://github.com/reactwg/react-native-releases/discussions/13#discussioncomment-2370415)):

```
ndk.dir=/Users/{USER}/Library/Android/sdk/ndk/24.0.8215888
```

## Running the example project

```sh
yarn bootstrap
```

### iOS

```sh
yarn ios
```

### Android

```sh
yarn android
```

## Adding new functionality

### Native functionality

1. Open `src/NativeTurboStarter.ts`
2. Add your function definition inside the Spec
3. Open `src/index.ts` and export your new function via a wrapper
4. Call your new function from `App.tsx` to test that it works

### iOS

1. Run `RCT_NEW_ARCH_ENABLED=1 pod install` in `example/ios` folder
2. You can run `xed ios` to open to workspace, and on the left side-bar navigate to `Pods -> Development Pods -> react-native-turbo-starter -> ios -> TurboStarter.mm` and next to the `@implementation` XCode will offer to complete the missing protocol for you
3. Alternatively, you can open `TurboStarter.mm` and implement the new function by yourself.
4. We're done! You can find the generated code in this path: `example/ios/build/generated/ios/TurboStarter`

### Android

1. run `./gradlew generateCodegenArtifactsFromSchema` in example/android
2. You can open Android Studio and access `android/src/main/java/com/reactnativeturbostarter/TurboStarterModule.kt` and let android studio complete the missing new function for you
3. Alternatively, you can open `TurboStarterModule.kt` and implement it by yourself
4. We're done! You can find the generated code in this path: `android/build/generated/source/codegen`

Now you can re-run the example project and watch as your code runs with JSI!

### C++ functionality

Follow the steps above, but consider the following:

1. Declare your C++ function here: `cpp/react-native-turbo-starter.h`
2. Implement your C++ function here: `cpp/react-native-turbo-starter.cpp`

#### iOS

1. In TurboStarter.mm, implement the function from the Spec, and you will be able to use it as a wrapper for calling the C++ code.
2. You will need to convert the types when returning the function like so

```objc
- (NSNumber *) turboMultiply:(double)num1 num2:(double)num2{
    double res = turbostarter::multiply(num1, num2);
    return [NSNumber numberWithDouble:res];
}
```

#### Android

1. In `TurboStarterModule.kt` you will need to declare your native JNI function

```kotlin
private external fun nativeMultiply(num1: Double, num2: Double): Double
```

2. Then you will be able to create a wrapper that calls the C++ code

```kotlin
override fun turboMultiply(num1: Double, num2: Double): Double {
  return nativeMultiply(num1, num2)
}
```

3. In `android/src/main/jni/cpp-adapter.cpp` you will need to add the JNI function that wraps around the C++ function

```cpp
extern "C" JNIEXPORT jdouble JNICALL
Java_com_reactnativeturbostarter_TurboStarterModule_nativeMultiply(JNIEnv *env, jclass type, jdouble num1, jdouble num2)
{
    return turbostarter::multiply(num1, num2);
}
```

## Steps taken to create this repository

1. Create the repo using react-native-create-library (<https://github.com/talknagish/react-native-turbo-starter/commit/f755c6ec6aa653d46a92474592de552cb3ba3f6c>)
2. Upgrade the library to react-native 0.68 (<https://github.com/talknagish/react-native-turbo-starter/pull/1>)
3. Upgrade the example to react-native 0.68 and call 1 turbo module function (<https://github.com/talknagish/react-native-turbo-starter/pull/2>)
4. Expend the Spec and call complex types (<https://github.com/talknagish/react-native-turbo-starter/pull/3>)
5. Call native code (<https://github.com/talknagish/react-native-turbo-starter/pull/4>)
6. Add the shared C++ library (<https://github.com/talknagish/react-native-turbo-starter/pull/5>)

## Known Issues

1. Full refresh (cmd + R) on Android crashes the application because of an issue in shadowTreeRegistry.cpp (didn't find a respective issue in their repo)
2. When building for Android codegen doesn't always generate the new spec, so sometimes you have to delete the build folders until we find a better solution

## BridgeSpy

It's all nice but how do we know this is actually not using the bridge anymore?
To see that we enabled JSI correctly, you can log out everything that is passing through the bridge
and see that it's now clean (besides some data from metro-bundler)

in `App.tsx`

1. Add `import MessageQueue from 'react-native/Libraries/BatchedBridge/MessageQueue.js';`

2.

```js
const spyFunction = (msg) => {
  console.log(msg);
};
```

3. Call `MessageQueue.spy(spyFunction);`

## Clone and create your own library

1. clone `react-native-turbo-starter`
2. cd `react-native-turbo-starter`
3. `rm -rf .git`
4. rename all files containing `starter` word (script in the future)
5. `git init`
6. `git remote add origin <new repo url>`
7. `git add .`
8. `git commit -m "Initial Commit"`
9. `git push -u origin main`

## We're Hiring

**Nagish makes communication more accessible to all.** 

We believe that people who are Deaf or Hard-of-Hearing deserve to communicate on their own, without relying on anyone else.

We're always looking for talented humans who are interested in building the future of accessible communication with us.

If you like this project and want to work on similar tech click below

https://talknagish.com/careers

## License

MIT
