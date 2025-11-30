"use client";

import Link from "next/link";
import styles from "./SideMenu.module.scss";
import { useTranslation } from "react-i18next";

export const SideMenu = () => {
  const { t } = useTranslation();

  return (
    <aside className={styles.sideMenu}>
      <nav>
        <ul>
          <li>
            <Link href="/">{t("layoutPage")}</Link>
          </li>
          <li>
            <Link href="/form-table">{t("formPage")}</Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};
