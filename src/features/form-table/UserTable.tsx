"use client";

import { Table, Button, Space, Checkbox } from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  deleteUser,
  deleteUsers,
  setSelectedUser,
  User,
} from "@/lib/features/user/userSlice";
import { useState, useEffect } from "react";
import styles from "./UserTable.module.scss";
import { useTranslation } from "react-i18next";

export const UserTable = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.user.users);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

  const [pagination, setPagination] = useState({ current: 1, pageSize: 5 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const handleTableChange = (newPagination: any) => {
    setPagination(newPagination);
  };

  const startIndex = (pagination.current - 1) * pagination.pageSize;
  const endIndex = startIndex + pagination.pageSize;
  const currentPageData = users.slice(startIndex, endIndex);
  const currentPageKeys = currentPageData.map((user) => user.id);

  const isCurrentPageAllSelected =
    currentPageKeys.length > 0 &&
    currentPageKeys.every((key) => selectedRowKeys.includes(key));
  const isCurrentPagePartiallySelected =
    currentPageKeys.some((key) => selectedRowKeys.includes(key)) &&
    !isCurrentPageAllSelected;

  const handleSelectCurrentPage = (e: any) => {
    if (e.target.checked) {
      const newKeys = Array.from(
        new Set([...selectedRowKeys, ...currentPageKeys])
      );
      setSelectedRowKeys(newKeys);
    } else {
      const newKeys = selectedRowKeys.filter(
        (key) => !currentPageKeys.includes(key as string)
      );
      setSelectedRowKeys(newKeys);
    }
  };

  const columns = [
    {
      title: t("name"),
      key: "name",
      render: (text: string, record: User) =>
        `${record.firstname} ${record.lastname}`,
      sorter: (a: User, b: User) => a.firstname.localeCompare(b.firstname),
    },
    {
      title: t("gender"),
      dataIndex: "gender",
      key: "gender",
      render: (text: string) => t(text.toLowerCase()),
      sorter: (a: User, b: User) => a.gender.localeCompare(b.gender),
    },
    {
      title: t("mobilePhone"),
      dataIndex: "mobilePhone",
      key: "mobilePhone",
      render: (text: string, record: User) =>
        `${record.mobilePhonePrefix || ""} ${record.mobilePhoneNumber || ""}`,
      sorter: (a: User, b: User) =>
        (a.mobilePhoneNumber || "").localeCompare(b.mobilePhoneNumber || ""),
    },
    {
      title: t("nationality"),
      dataIndex: "nationality",
      key: "nationality",
      render: (text: string) => t(text.toLowerCase()),
      sorter: (a: User, b: User) => a.nationality.localeCompare(b.nationality),
    },
    {
      title: t("manage"),
      key: "manage",
      render: (text: string, record: User) => (
        <Space size="middle">
          <a onClick={() => dispatch(setSelectedUser(record))}>{t("edit")}</a>
          <a
            onClick={() => {
              dispatch(deleteUser(record.id));
              alert(t("delete success"));
            }}
          >
            {t("delete")}
          </a>
        </Space>
      ),
    },
  ];

  const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    columnTitle: (
      <Checkbox
        checked={isCurrentPageAllSelected}
        indeterminate={isCurrentPagePartiallySelected}
        onChange={handleSelectCurrentPage}
      />
    ),
  };

  const handleDeleteSelected = () => {
    dispatch(deleteUsers(selectedRowKeys as string[]));
    setSelectedRowKeys([]);
    alert(t("delete success"));
  };

  return (
    <div className={styles.tableWrapper}>
      <div className={styles.controls}>
        <Checkbox
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedRowKeys(users.map((user) => user.id));
            } else {
              setSelectedRowKeys([]);
            }
          }}
          checked={users.length > 0 && selectedRowKeys.length === users.length}
          indeterminate={
            selectedRowKeys.length > 0 && selectedRowKeys.length < users.length
          }
        >
          {t("selectAll")}
        </Checkbox>
        <Button
          onClick={handleDeleteSelected}
          disabled={selectedRowKeys.length === 0}
        >
          {t("delete")}
        </Button>
      </div>
      <Table
        rowSelection={rowSelection}
        columns={columns}
        dataSource={users}
        rowKey="id"
        pagination={{
          position: ["topRight"],
          pageSize: 5,
          current: pagination.current,
          onChange: (page, pageSize) =>
            handleTableChange({ current: page, pageSize }),
          itemRender: (current, type, originalElement) => {
            if (type === "prev") {
              return <a>{t("prev")}</a>;
            }
            if (type === "next") {
              return <a>{t("next")}</a>;
            }
            return originalElement;
          },
        }}
        onChange={handleTableChange}
      />
    </div>
  );
};
