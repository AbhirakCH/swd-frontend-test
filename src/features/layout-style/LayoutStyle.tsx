"use client";

import { useTranslation } from "react-i18next";
import styles from "./LayoutStyle.module.scss";
import { ShapeCard, Shape, ShapeType } from "@/components/ShapeCard/ShapeCard";
import { useState } from "react";
import { Col, Divider, Layout, Row } from "antd";

export const LayoutStyle = () => {
  const { t } = useTranslation();
  const [shapes, setShapes] = useState<ShapeType[]>([
    "square",
    "circle",
    "oval",
    "trapezoid",
    "rectangle",
    "parallelogram",
  ]);

  const moveLeft = () => {
    setShapes((prev) => {
      const newShapes = [...prev];
      const first = newShapes.shift();
      if (first) newShapes.push(first);
      return newShapes;
    });
  };

  const moveRight = () => {
    setShapes((prev) => {
      const newShapes = [...prev];
      const last = newShapes.pop();
      if (last) newShapes.unshift(last);
      return newShapes;
    });
  };

  const movePosition = () => {
    setShapes((prev) => {
      const newShapes = [...prev];
      const mid = Math.floor(newShapes.length / 2);
      const firstHalf = newShapes.slice(0, mid);
      const secondHalf = newShapes.slice(mid);
      return [...secondHalf, ...firstHalf];
    });
  };

  const shuffleShapes = () => {
    setShapes((prev) => {
      const newShapes = [...prev];
      for (let i = newShapes.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newShapes[i], newShapes[j]] = [newShapes[j], newShapes[i]];
      }
      return newShapes;
    });
  };

  return (
    <Layout className={styles.container}>
      <div className={styles.title}>{t("layoutPage")}</div>
      <Row>
        <Col span={20} offset={2}>
          <Row gutter={[16, 16]}>
            <Col span={8}>
              <ShapeCard
                shape="triangle-left"
                label={t("moveShape")}
                className={styles.controlCard}
                onClick={moveLeft}
              />
            </Col>
            <Col span={8}>
              <ShapeCard
                label={t("movePosition")}
                className={styles.controlCard}
                onClick={movePosition}
              >
                <div style={{ display: "flex", gap: "20px" }}>
                  <Shape type="triangle-up" />
                  <Shape type="triangle-down" />
                </div>
              </ShapeCard>
            </Col>
            <Col span={8}>
              <ShapeCard
                shape="triangle-right"
                label={t("moveShape")}
                className={styles.controlCard}
                onClick={moveRight}
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Divider className={styles.divider} />

      <Row>
        <Col span={20} offset={2}>
          <Row gutter={[16, 16]}>
            {shapes.map((shape, index) => (
              <Col span={8} key={index}>
                <ShapeCard
                  shape={shape}
                  className={styles.controlCard}
                  onClick={shuffleShapes}
                  shouldInvertOnHover
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </Layout>
  );
};
