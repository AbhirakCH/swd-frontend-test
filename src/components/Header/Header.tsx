"use client";

import { useTranslation } from "react-i18next";
import { Select } from "antd";
import styles from "./Header.module.scss";
import "@/lib/i18n";

export const Header = () => {
  const { t, i18n } = useTranslation();

  const handleChange = (value: string) => {
    i18n.changeLanguage(value);
  };

  const isThai = i18n.language === "th";

  const options = isThai
    ? [
        { value: "en", label: "อังกฤษ" },
        { value: "th", label: "ไทย" },
      ]
    : [
        { value: "en", label: "EN" },
        { value: "th", label: "TH" },
      ];

  return (
    <header className={styles.header}>
      <Select
        value={i18n.language}
        style={{ width: 120 }}
        onChange={handleChange}
        options={options}
      />
    </header>
  );
};
