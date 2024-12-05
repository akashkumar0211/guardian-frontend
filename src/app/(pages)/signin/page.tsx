"use client";
import React from "react";
import { signIn } from "next-auth/react";
import { Button, Divider, Input, Typography, message, Form } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import Image from "next/image";
import { providerMap } from "@/handlers/authentication";
import { JWTToken, SignInFormData } from "@/interfaces/authentication-interfaces";
import { addDetails } from "@/services/api-services";
import { useMutation } from "@tanstack/react-query";

const decodeJWT = (token: string): JWTToken => {
  const base64Url: string = token.split(".")[1];
  const jsonPayload: string = atob(base64Url);
  return JSON.parse(jsonPayload);
};

const SignIn: React.FC = () => {
  const onFinish = async (values: { email: string; password: string }) => {
    if (!values.email || !values.password) {
      message.error("Please enter both email and password.");
      return;
    }
    login(values);
  };
  const { mutate: login, isPending, isError, error } = useMutation({
    mutationFn: async (userCredential: SignInFormData) => {
      const url = `${process.env.hostport}/api/v1/user/login`;
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      return await addDetails(url, userCredential, config);
    },
    onSuccess: (data: any) => {
      const token = decodeJWT(data.token)
      signIn("credentials", { email: token.email, name: token.name }).catch(
        (err) => console.error("error in signin", err)
      )
    },
    onError: (error: any) => {
      message.error(error?.response?.data?.error)
      console.log("error jee", error);
    }
  });


  return (
    <div className="h-screen flex items-center justify-center bg-gray-100">
      <div className="flex w-full max-w-5xl rounded-md shadow-lg overflow-hidden">
        {/* Left side */}
        <div className="w-1/2 bg-[#04121E] text-white p-8 flex flex-col justify-center items-center">
          <Image
            src="/guardianBackgroundImage.svg" 
            alt="Guardian Background"
            width={300}
            height={300}
            unoptimized
          />

          <Typography.Title level={3} className="mb-4" style={{ color: "#e9e9e9" }}>
            Guardian: Advanced Scanning Tool
          </Typography.Title>
          <Typography.Text className="text-lg mb-4 text-center" style={{ color: "#e9e9e9" }}>
            Ensure security, accuracy, and optimization with Guardian’s advanced scanning technology.
          </Typography.Text>
        </div>

        {/* Right side */}
        <div className="w-1/2 bg-white p-8 flex flex-col justify-center items-center">
          <Image src="/guardian.svg" alt="Logo" width={150} height={50} />
          <Typography.Title level={2} className="mt-4 text-gray-800">Let’s Get Started</Typography.Title>
          <Typography.Text className="text-gray-600 mb-5">
            Please log in to continue using Guardian’s scanning tools.
          </Typography.Text>
          <Form
            name="sign-in"
            onFinish={onFinish}
            className="w-full mt-6 space-y-4"
            layout="vertical"
            onSubmitCapture={(e) => {
              e.preventDefault(); console.log("here", e);
            }}
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
            <Button
              type="primary"
              htmlType="submit"
              block
              className="mt-2"
              loading={isPending}
            >
              Sign In
            </Button>
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
