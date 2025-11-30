"use client";

import { UserForm } from "@/features/form-table/UserForm";
import { UserTable } from "@/features/form-table/UserTable";
import styles from "./FormTable.module.scss";
import { useTranslation } from "react-i18next";
import { Button, Flex } from "antd";
import { HomeButton } from "@/components/HomeButton/HomeButton";

export const FormTable = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.container}>
      <Flex justify="space-between">
        <h1 className="title">{t("formPage")}</h1>
        <HomeButton />
      </Flex>

      <div className={styles.formContainer}>
        <UserForm />
      </div>
      <div className={styles.tableContainer}>
        <UserTable />
      </div>
    </div>
  );
};
