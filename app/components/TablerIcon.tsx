import { rem } from "@mantine/core";

type TablerIconProps = {
  IconComponent: any;
  size?: number;
  strokes?: number;
  color?: string;
};
export default function TablerIcon({
  IconComponent,
  size,
  strokes,
  color,
}: TablerIconProps) {
  return (
    <IconComponent
      style={{
        width: size ? rem(size) : rem(20),
        height: size ? rem(size) : rem(20),
        color: color ? color : "currentColor",
      }}
      stroke={strokes ? strokes : 2}
    />
  );
}
