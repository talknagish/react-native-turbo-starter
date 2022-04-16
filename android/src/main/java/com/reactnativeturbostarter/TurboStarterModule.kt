package com.reactnativeturbostarter
import com.facebook.react.bridge.*

class TurboStarterModule(reactContext: ReactApplicationContext?) :
  NativeTurboStarterSpec(reactContext) {

  override fun getGreeting(name: String): String {
    return String.format("Hello, %s!", name)
  }

  override fun getName(): String {
    return NAME
  }

  companion object {
    const val NAME = "TurboStarter"
  }
}
