"use client";
import React from "react";
import Image from "next/image";

import { signIn } from "next-auth/react";
import { Button, Divider, Input, Typography, message, Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { providerMap } from "@/handlers/authentication";
import { useLogin } from "@/queries/auth";

const SignIn: React.FC = () => {
  const { mutate: login,isPending } = useLogin();

  const onFinish = async (values: { email: string; password: string }) => {
    if (!values.email || !values.password) {
      message.error("Please enter both email and password.");
      return;
    }
    login(values);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-5xl rounded-md shadow-lg overflow-hidden">
        <div className="w-1/2 bg-dark-blue text-white p-8 flex flex-col justify-center items-center">
          <Image src="/guardianBackgroundImage.svg" alt="Logo" width={300} height={200} />
          <Typography.Title level={3} className="mb-4" style={{ color: "#e9e9e9" }}>
            Guardian: Advanced Scanning Tool
          </Typography.Title>
          <Typography.Text className="text-lg mb-4 text-center" style={{ color: "#e9e9e9" }}>
            Ensure security, accuracy, and optimization with Guardian’s advanced scanning technology.
          </Typography.Text>
        </div>

        <div className="w-1/2 bg-white p-8 flex flex-col justify-center items-center">
          <Image src="/guardian.svg" alt="Logo" width={150} height={50} className="mb-5" />
          <Form
            name="sign-in"
            onFinish={onFinish}
            className="w-full mt-6 space-y-4"
            layout="vertical"
            onSubmitCapture={(e) =>{e.preventDefault()}}
          >
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "Email is required" },
                {
                  type: "email",
                  message: "Invalid email format",
                },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Password is required" }]}
            >
              <Input.Password
                placeholder="Enter your password"
                iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
              />
            </Form.Item>
            <Button type="primary" htmlType="submit" block className="mt-2" loading={isPending}>Sign In</Button>
          </Form>
          <Divider className="w-full">or</Divider>
          {providerMap.map((provider: { id: string; name: string }, index: number) => {
            return provider.id !== "credentials" && (
              <Button
                  key={index}
                  type="link"
                  shape="circle"
                  className="h-16 w-16 flex items-center justify-center p-2"
                  onClick={() => signIn(provider.id, { redirectTo: "/dashboard" })}
                  style={{
                    backgroundColor: "#fff",
                  }}
                  icon={
                    <Image
                      src={`https://authjs.dev/img/providers/${provider.id}.svg`}
                      alt={provider.name}
                      width={40}
                      height={40}
                      className="mr-2"
                    />
                  }
                />
            );
          })}
          <Typography.Text className="mt-6 text-sm text-gray-500">
            @2024 Guardian. All rights reserved. Terms - Privacy.
          </Typography.Text>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
