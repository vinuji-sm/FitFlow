import { SymbolView } from 'expo-symbols';
import type { SFSymbol } from 'sf-symbols-typescript';
import type { ColorValue } from 'react-native';
import { View } from 'react-native';

type IconProps = {
  name: SFSymbol;
  size?: number;
  color?: ColorValue;
};

export function Icon({ name, size = 22, color }: IconProps) {
  return (
    <SymbolView
      name={{ ios: name }}
      size={size}
      tintColor={color}
      fallback={<View style={{ width: size, height: size }} />}
    />
  );
}
