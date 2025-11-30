"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import styles from "./page.module.scss";

export default function Home() {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <div className={styles.cardContainer}>
        <Link href="/layout-style" className={styles.card}>
          <h3>Test 1</h3>
          <p>{t("layoutPage")}</p>
        </Link>
        <Link href="/form-table" className={styles.card}>
          <h3>Test 2</h3>
          <p>{t("formPage")}</p>
        </Link>
      </div>
    </div>
  );
}
