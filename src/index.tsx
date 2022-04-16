import NativeTurboStarter from './NativeTurboStarter';

export function getGreeting(name: string) {
  return NativeTurboStarter.getGreeting(name);
}

export function getTurboArray(values: string[]) {
  return NativeTurboStarter.getTurboArray(values);
}

export function getTurboObject(options: { title: string }) {
  return NativeTurboStarter.getTurboObject(options);
}

export function getTurboObjectGeneric(options: Object) {
  return NativeTurboStarter.getTurboObjectGeneric(options);
}

export async function getTurboPromise(magicNumber: number) {
  return NativeTurboStarter.getTurboPromise(magicNumber);
}
