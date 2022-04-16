#import "react-native-turbo-starter.h"
#import "TurboStarter.h"
#import <TurboModulez/TurboModulez.h>

@interface TurboStarter() <NativeTurboStarterSpec>
@end

@implementation TurboStarter

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeTurboModulezSpecJSI>(params);
}

- (NSString *)getGreeting:(NSString *)name {
   return [NSString stringWithFormat: @"Hello, %@!", name];
}

+ (NSString *)moduleName {
    return @"TurboStarter";
}

@end
