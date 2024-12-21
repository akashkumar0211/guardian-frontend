import { passwordValidator } from "@/utils/common-utils";
import { Form } from "antd";
import { Input } from "antd";
import { LockOutlined, UserOutlined } from '@ant-design/icons';

export const UserStepOne = ({ stepOneForm }: { stepOneForm: any }) => (
    <div className="p-4">
        <Form form={stepOneForm}>
            <Form.Item
                name="name"
                rules={[{ required: true, message: 'Please input your name' }]}
            >
                <Input
                    prefix={<UserOutlined />}
                    placeholder="Full Name"
                />
            </Form.Item>

            <Form.Item
                name="email"
                rules={[
                    { required: true, message: 'Please input your email' },
                    { type: 'email', message: 'Invalid email format' }
                ]}
            >
                <Input
                    prefix={<UserOutlined />}
                    placeholder="Email Address"
                />
            </Form.Item>

            <Form.Item
                name="password"
                rules={[
                    { required: true, validator: passwordValidator }
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Password"
                />
            </Form.Item>

            <Form.Item
                name="confirmPassword"
                dependencies={['password']}
                rules={[
                    { required: true, message: 'Please confirm your password' },
                    ({ getFieldValue }) => ({
                        validator(_, value) {
                            if (!value || getFieldValue('password') === value) {
                                return Promise.resolve();
                            }
                            return Promise.reject(new Error('Passwords do not match'));
                        },
                    }),
                ]}
            >
                <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="Confirm Password"
                />
            </Form.Item>
        </Form>
    </div>
);