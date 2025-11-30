"use client";

import { useEffect } from "react";
import {
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  Button,
  Row,
  Col,
  InputNumber,
} from "antd";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import {
  addUser,
  updateUser,
  User,
  setSelectedUser,
} from "@/lib/features/user/userSlice";
import { v4 as uuidv4 } from "uuid";
import dayjs from "dayjs";
import styles from "./UserForm.module.scss";
import { useTranslation } from "react-i18next";

const { Option } = Select;

export const UserForm = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector((state) => state.user.selectedUser);

  const countryList = [
    { flag: "🇹🇭", dial_code: "+66", code: "TH" },
    { flag: "🇺🇸", dial_code: "+1", code: "US" },
    { flag: "🇫🇷", dial_code: "+33", code: "FR" },
  ];

  useEffect(() => {
    if (selectedUser) {
      form.setFieldsValue({
        ...selectedUser,
        birthday: dayjs(selectedUser.birthday),
      });
    } else {
      form.resetFields();
    }
  }, [selectedUser, form]);

  const onFinish = (values: any) => {
    const user: User = {
      ...values,
      expectedSalary: Number(values.expectedSalary),
      id: selectedUser ? selectedUser.id : uuidv4(),
      birthday: values.birthday.toISOString(),
    };

    if (selectedUser) {
      dispatch(updateUser(user));
    } else {
      dispatch(addUser(user));
    }
    alert(t("save success"));
    form.resetFields();
  };

  const onReset = () => {
    dispatch(setSelectedUser(null));
    form.resetFields();
  };

  const citizenId = Form.useWatch("citizenId", form);
  const citizenIdError = (() => {
    if (!citizenId) return "";
    const { part1, part2, part3, part4, part5 } = citizenId;
    const hasValue = part1 || part2 || part3 || part4 || part5;
    const isComplete = part1 && part2 && part3 && part4 && part5;

    if (hasValue && !isComplete) {
      return t("pleaseInputCitizenId");
    }

    const isNumeric = [part1, part2, part3, part4, part5].every(
      (part) => !part || /^[0-9]*$/.test(part)
    );

    if (!isNumeric) {
      return t("pleaseInputNumberOnly");
    }

    return "";
    return "";
  })();

  const commonDependencies = [
    ["citizenId", "part1"],
    ["citizenId", "part2"],
    ["citizenId", "part3"],
    ["citizenId", "part4"],
    ["citizenId", "part5"],
  ];

  const commonRules = [
    ({ getFieldValue }: any) => ({
      validator(_: any, value: any) {
        const hasValue = commonDependencies.some(
          (path) => !!getFieldValue(path)
        );
        if (hasValue && !value) {
          return Promise.reject(new Error(""));
        }
        return Promise.resolve();
      },
    }),
    { pattern: /^[0-9]*$/, message: "" },
  ];

  return (
    <Form form={form} onFinish={onFinish} className={styles.form}>
      <Row gutter={16}>
        <Col span={4}>
          <Form.Item
            name="title"
            label={t("title")}
            rules={[{ required: true, message: t("pleaseSelectTitle") }]}
          >
            <Select placeholder={t("title")}>
              <Option value="Mr.">{t("mr")}</Option>
              <Option value="Ms.">{t("ms")}</Option>
              <Option value="Mrs.">{t("mrs")}</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            name="firstname"
            label={t("firstname")}
            rules={[{ required: true, message: t("pleaseInputFirstname") }]}
          >
            <Input maxLength={50} />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            name="lastname"
            label={t("lastname")}
            rules={[{ required: true, message: t("pleaseInputLastname") }]}
          >
            <Input maxLength={50} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={6}>
          <Form.Item
            name="birthday"
            label={t("birthday")}
            rules={[{ required: true, message: t("pleaseSelectBirthday") }]}
          >
            <DatePicker format="YYYY-MM-DD" style={{ width: "100%" }} />
          </Form.Item>
        </Col>
        <Col span={10}>
          <Form.Item
            name="nationality"
            label={t("nationality")}
            rules={[{ required: true, message: t("pleaseSelectNationality") }]}
          >
            <Select placeholder={t("pleaseSelect")}>
              <Option value="Thai">{t("thai")}</Option>
              <Option value="American">{t("american")}</Option>
              <Option value="Other">{t("other")}</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label={t("citizenId")}
            validateStatus={citizenIdError ? "error" : ""}
            help={citizenIdError}
          >
            <Input.Group compact>
              <Form.Item
                name={["citizenId", "part1"]}
                noStyle
                dependencies={commonDependencies}
                rules={commonRules}
              >
                <Input
                  style={{ width: "10%", textAlign: "center" }}
                  maxLength={1}
                />
              </Form.Item>
              <span style={{ padding: "0 5px" }}>-</span>
              <Form.Item
                name={["citizenId", "part2"]}
                noStyle
                dependencies={commonDependencies}
                rules={commonRules}
              >
                <Input
                  style={{ width: "15%", textAlign: "center" }}
                  maxLength={4}
                />
              </Form.Item>
              <span style={{ padding: "0 5px" }}>-</span>
              <Form.Item
                name={["citizenId", "part3"]}
                noStyle
                dependencies={commonDependencies}
                rules={commonRules}
              >
                <Input
                  style={{ width: "15%", textAlign: "center" }}
                  maxLength={5}
                />
              </Form.Item>
              <span style={{ padding: "0 5px" }}>-</span>
              <Form.Item
                name={["citizenId", "part4"]}
                noStyle
                dependencies={commonDependencies}
                rules={commonRules}
              >
                <Input
                  style={{ width: "15%", textAlign: "center" }}
                  maxLength={2}
                />
              </Form.Item>
              <span style={{ padding: "0 5px" }}>-</span>
              <Form.Item
                name={["citizenId", "part5"]}
                noStyle
                dependencies={commonDependencies}
                rules={commonRules}
              >
                <Input
                  style={{ width: "10%", textAlign: "center" }}
                  maxLength={1}
                />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name="gender"
            label={t("gender")}
            rules={[{ required: true, message: t("pleaseSelectGender") }]}
          >
            <Radio.Group>
              <Radio value="Male">{t("male")}</Radio>
              <Radio value="Female">{t("female")}</Radio>
              <Radio value="Unsex">{t("unsex")}</Radio>
            </Radio.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={24}>
          <Form.Item label={t("mobilePhone")} required>
            <Input.Group compact>
              <Form.Item
                name="mobilePhonePrefix"
                noStyle
                rules={[{ required: true, message: t("prefixRequired") }]}
              >
                <Select
                  style={{ width: "10%" }}
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    ((option?.label as string) ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={countryList.map((country) => ({
                    value: country.dial_code,
                    label: `${country.flag} ${country.dial_code}`,
                  }))}
                />
              </Form.Item>
              <span style={{ padding: "0 5px" }}>-</span>
              <Form.Item
                name="mobilePhoneNumber"
                noStyle
                rules={[
                  { required: true, message: t("numberRequired") },
                  { pattern: /^[0-9]*$/, message: t("pleaseInputNumberOnly") },
                ]}
              >
                <Input style={{ width: "30%" }} />
              </Form.Item>
            </Input.Group>
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={12}>
          <Form.Item name="passportNo" label={t("passportNo")}>
            <Input maxLength={20} />
          </Form.Item>
        </Col>
      </Row>

      <Row gutter={16}>
        <Col span={8}>
          <Form.Item
            name="expectedSalary"
            label={t("expectedSalary")}
            rules={[
              { required: true, message: t("pleaseInputExpectedSalary") },
            ]}
          >
            <InputNumber
              style={{ width: "100%" }}
              min={0 as number}
              formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
              }
              parser={(value) =>
                (value?.replace(/\$\s?|(,*)/g, "") || "") as unknown as number
              }
            />
          </Form.Item>
        </Col>
        <Col
          span={12}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
          }}
        >
          <Button onClick={onReset} style={{ marginRight: 8 }}>
            {t("reset")}
          </Button>
          <Button type="primary" htmlType="submit">
            {t("submit")}
          </Button>
        </Col>
      </Row>
    </Form>
  );
};
