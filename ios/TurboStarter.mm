#import "react-native-turbo-starter.h"
#import "TurboStarter.h"
#import <TurboStarter/TurboStarter.h>

@interface TurboStarter() <NativeTurboStarterSpec>
@end

@implementation TurboStarter

- (std::shared_ptr<facebook::react::TurboModule>)getTurboModule:(const facebook::react::ObjCTurboModule::InitParams &)params
{
  return std::make_shared<facebook::react::NativeTurboStarterSpecJSI>(params);
}

- (NSString *)getGreeting:(NSString *)name {
   return [NSString stringWithFormat: @"Hello, %@!", name];
}

+ (NSString *)moduleName {
    return @"TurboStarter";
}

@end
