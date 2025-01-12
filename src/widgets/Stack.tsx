import React, { forwardRef } from "react";
import Stack from "@mui/material/Stack";
import type { StackProps } from "@mui/material/Stack";

export const VStack: React.FC<StackProps> = (props) => (
  <Stack alignItems="center" {...props} />
);

export const HStack = forwardRef<HTMLDivElement, StackProps>((props, ref) => (
  <Stack alignItems="center" {...props} direction="row" ref={ref} />
));

HStack.displayName = "HStack";
