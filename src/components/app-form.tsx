import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Alert, Button, Form, FormItemProps, Input } from "antd";
import * as React from "react";
import { userService } from "~/services";

const ALERT_MESSAGE = "User with provided credentials not found";
const VALIDATE_MESSAGES = { required: "Field is required" };
const VALIDATE_TRIGGER = "onSubmit";
const RULES = [{ required: true }];

export function AppForm() {
  const [form] = Form.useForm();
  const [isAlert, setIsAlert] = React.useState(false);
  const [disabledInputs, setDisabledInputs] = React.useState(false);
  const [formItems, setFormItems] = React.useState<FormItemProps>({
    hasFeedback: false,
    validateStatus: "",
  });

  const handleSubmit = async () => {
    setIsAlert(() => false);
    setDisabledInputs(() => true);
    setFormItems((formItems) => ({
      ...formItems,
      hasFeedback: false,
      validateStatus: "",
    }));

    try {
      const { username, password } = await form.validateFields();
      const auth = await userService.fetchAuth({ username, password });
      if (auth) return;
      setIsAlert(true);
      setFormItems((formItems) => ({
        ...formItems,
        hasFeedback: true,
        validateStatus: "error",
      }));
    } catch (error) {
      setFormItems((formItems) => ({
        ...formItems,
        hasFeedback: true,
        validateStatus: "error",
      }));
    } finally {
      setDisabledInputs(() => false);
    }
  };

  const warningAlertFormItem = React.useMemo(() => {
    const { hasFeedback, validateStatus } = formItems;
    const shouldRender = isAlert && hasFeedback && validateStatus === "error";
    return !shouldRender ? null : (
      <Form.Item>
        <Alert type={validateStatus} message={ALERT_MESSAGE} />
      </Form.Item>
    );
  }, [isAlert, formItems]);

  return (
    <Form
      validateMessages={VALIDATE_MESSAGES}
      validateTrigger={VALIDATE_TRIGGER}
      form={form}
    >
      <Form.Item
        name="username"
        rules={RULES}
        hasFeedback={formItems.hasFeedback}
        validateStatus={formItems.validateStatus}
      >
        <Input
          placeholder="Username"
          prefix={<UserOutlined />}
          disabled={disabledInputs}
        />
      </Form.Item>
      <Form.Item
        name="password"
        rules={RULES}
        hasFeedback={formItems.hasFeedback}
        validateStatus={formItems.validateStatus}
      >
        <Input.Password
          placeholder="Password"
          prefix={<LockOutlined />}
          disabled={disabledInputs}
        />
      </Form.Item>
      {warningAlertFormItem}
      <Button type="primary" disabled={disabledInputs} onClick={handleSubmit}>
        Submit
      </Button>
    </Form>
  );
}
