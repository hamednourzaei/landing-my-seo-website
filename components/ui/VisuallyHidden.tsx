import React from "react";

export const VisuallyHidden = ({
  children,
  as: Component = "span",
  ...props
}: React.ComponentPropsWithoutRef<"span"> & {
  as?: keyof JSX.IntrinsicElements;
}) => {
  return (
    <Component>
      style={{
        border: 0,
        clip: "rect(0 0 0 0)",
        height: "1px",
        margin: "-1px",
        overflow: "hidden",
        padding: 0,
        position: "absolute",
        whiteSpace: "nowrap",
        width: "1px",
      }}
      {...props}
      {children}
    </Component>
  );
};
