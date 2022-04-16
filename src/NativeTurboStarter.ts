// @ts-ignore
import type { TurboModule } from 'react-native/Libraries/TurboModule/RCTExport';
import { TurboModuleRegistry } from 'react-native';

export interface Spec extends TurboModule {
  getConstants: () => {};
  getGreeting(name: string): string;
}

// We know the module is going to be load so we export with the "!" so it doesn't add undefined to every function return value
export default TurboModuleRegistry.get<Spec>('TurboStarter')!;