
export type CSS = CSS$GeometryStyle;

type CSS$GeometryStyle = {
  /* CSS Properties */
  bottom?: CssDistance;
  height?: CssDistance;
  left?: CssDistance;
  marginBottom?: CssDistance;
  marginLeft?: CssDistance;
  marginRight?: CssDistance;
  marginTop?: CssDistance;
  maxHeight?: CssDistance;
  maxWidth?: CssDistance;
  minHeight?: CssDistance;
  minWidth?: CssDistance;
  opacity?: string;
  outlineColor?: string;
  outlineOffset?: CssDistance;
  outlineStyle?: "none" | "dotted" | "dashed" | "solid" | "double" | "groove" | "ridge" | "inset" | "outset" | "inherit";
  outlineWidth?: "thin" | "medium" | "thick" | string | "inherit";
  padding?: CssDistance;
  paddingBlockEnd?: CssDistance;
  paddingBlockStart?: CssDistance;
  paddingBottom?: CssDistance;
  paddingInlineEnd?: CssDistance;
  paddingInlineStart?: CssDistance;
  paddingLeft?: CssDistance;
  paddingRight?: CssDistance;
  paddingTop?: CssDistance;
  position?: "absolute" | "fixed" | "relative" | "static" | "inherit";
  resize?: "none" | "both" | "horizontal" | "vertical" | "inherit";
  right?: CssDistance;
  top?: CssDistance;
  visibility?: "visible" | "hidden" | "collapse" | "inherit";
  width?: CssDistance;
  zIndex?: number | CssAuto;
};

type CssDistance = string;

type CssAuto = "auto" | "inherit";
