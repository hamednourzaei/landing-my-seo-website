import React from "react";
import { ToggleTheme } from "./toogle-theme";

export const SafeToggleTheme = React.memo(() => <ToggleTheme />);
SafeToggleTheme.displayName = "SafeToggleTheme";