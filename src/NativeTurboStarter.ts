// @ts-ignore
import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getConstants: () => {};

  //
  // Regular JSI
  //
  getGreeting(name: string): string;

  //
  // Complex types JSI
  //
  getTurboArray(values: Array<string>): Array<string>;
  // On iOS, codegen generates a typed NSObject, but on Android it's just a generic dictionary.
  // So for now, it can't be completely type-safe
  getTurboObject(options: { title: string }): { response: string };
  getTurboObjectGeneric(options: Object): Object;
  getTurboPromise(magicNumber: number): Promise<boolean>;

  //
  // Native JSI calls
  //
  getBatteryLevel(): number;
}

// We know the module is going to be load so we export with the "!" so it doesn't add undefined to every function return value
export default TurboModuleRegistry.get<Spec>('TurboStarter')!;
