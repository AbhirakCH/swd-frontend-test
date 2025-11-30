import styles from "./ShapeCard.module.scss";

export type ShapeType =
  | "square"
  | "circle"
  | "oval"
  | "trapezoid"
  | "rectangle"
  | "parallelogram"
  | "triangle-up"
  | "triangle-down"
  | "triangle-left"
  | "triangle-right";

interface ShapeCardProps {
  shape?: ShapeType;
  label?: string;
  onClick?: () => void;
  className?: string;
  children?: React.ReactNode;
  style?: React.CSSProperties;
  shouldInvertOnHover?: boolean;
}

export const ShapeCard = ({
  shape,
  label,
  onClick,
  className,
  children,
  style,
  shouldInvertOnHover,
}: ShapeCardProps) => {
  return (
    <div
      className={`${styles.card} ${
        shouldInvertOnHover ? styles.invertOnHover : ""
      } ${className || ""}`}
      onClick={onClick}
      style={style}
    >
      {shape && <div className={`${styles.shape} ${styles[shape]}`}></div>}
      {children}
      {label && <div className={styles.label}>{label}</div>}
    </div>
  );
};

export const Shape = ({ type }: { type: ShapeType }) => {
  return <div className={`${styles.shape} ${styles[type]}`}></div>;
};
