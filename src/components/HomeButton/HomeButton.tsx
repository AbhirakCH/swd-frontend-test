"use client";

import { Button } from "antd";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export const HomeButton = () => {
  const { t } = useTranslation();

  return (
    <Link href="/">
      <Button>{t("home")}</Button>
    </Link>
  );
};
