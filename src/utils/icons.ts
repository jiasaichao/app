declare var require: {
    <T>(path: string): T;
    (paths: string[], callback: (...modules: any[]) => void): void;
    ensure: (paths: string[], callback: (require: <T>(path: string) => T) => void) => void;
};
const Chevron_Down = <any>require('../assets/svg/chevron-down.svg');
const Chevron_Up = <any>require('../assets/svg/chevron-up.svg');
const Chevron_Left = <any>require('../assets/svg/chevron-left.svg');
const Chevron_Right = <any>require('../assets/svg/chevron-right.svg');
  export {
    Chevron_Down,
    Chevron_Up,
    Chevron_Left,
    Chevron_Right
  }