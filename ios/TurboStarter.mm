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

- (NSArray<NSString *> *)getTurboArray:(NSArray *)values {
    NSArray* reversedArray = [[values reverseObjectEnumerator] allObjects];
    return reversedArray;
}

- (NSDictionary *)getTurboObject:(JS::NativeTurboStarter::SpecGetTurboObjectOptions &)options {
    
    NSLog(@"getTurboObject options (title): %@", options.title());
    
    id keys[] = { @"helloString", @"magicNumber", @"response" };
    id objects[] = { @"Hello, World!", @42, @"res" };
    NSUInteger count = sizeof(objects) / sizeof(id);
    
    NSDictionary *dictionary = [NSDictionary dictionaryWithObjects:objects
                                                           forKeys:keys
                                                             count:count];
    
    return dictionary;
}
- (NSDictionary *)getTurboObjectGeneric:(NSDictionary *)options {
    id num = @([[options valueForKey:@"magicNumber"] integerValue] * 6);
    
    id keys[] = { @"magicNumber" };
    id objects[] = { num };
    NSUInteger count = sizeof(objects) / sizeof(id);
    
    NSDictionary *dictionary = [NSDictionary dictionaryWithObjects:objects
                                                           forKeys:keys
                                                             count:count];
    
    return dictionary;
}

- (void)getTurboPromise:(double)magicNumber
                resolve:(RCTPromiseResolveBlock)resolve
                 reject:(RCTPromiseRejectBlock)reject
{
    if (magicNumber == 42) {
        resolve(@YES);
        return;
    } else if (magicNumber == 7) {
        NSError *error = [NSError errorWithDomain:@"com.yourcompany.turbostarter" code:3456 userInfo:@{NSLocalizedDescriptionKey:@"Invalid user name."}];
        reject(@"1", @"You stepped on a mine", error);
        return;
    }
    
    resolve(@NO);
}

- (NSNumber *)getBatteryLevel {
    UIDevice.currentDevice.batteryMonitoringEnabled = TRUE;
    return @(UIDevice.currentDevice.batteryLevel * 100);
}

- (NSNumber *) turboMultiply:(double)num1 num2:(double)num2{
    double res = turbostarter::multiply(num1, num2);
    return [NSNumber numberWithDouble:res];
}

+ (NSString *)moduleName {
    return @"TurboStarter";
}

@end
