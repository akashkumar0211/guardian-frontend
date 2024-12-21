import React, { useEffect, useState } from "react";
import { Modal, Radio, Button, Form, Input, message } from "antd";
import { MultiSelect } from "../atomic-components/multi-select";
import { FormData, ScheduleDialogProps } from "@/interfaces/reporting-interface";
import { useServices, useTags } from "@/queries/dashboard";
import { useAddReport, useTemplates } from "@/queries/reporting";
import { radioOptions } from "@/constants/reporting-constants";
import {  reportingSubject } from "@/event-emitters/event-emitters";

export const ReportDialog: React.FC<ScheduleDialogProps> = ({ isModalOpen, setIsModalOpen }) => {
  const [type, setType] = useState("service_ids");
  const [applications, setApplications] = useState<any>([])
  const [tagsData, setTagsData] = useState<any>([])
  const [templatesData, setTemplatesData] = useState<any>([])

  const [form] = Form.useForm();
  const { data: services } = useServices({}, isModalOpen)
  const { data: tags } = useTags(isModalOpen)
  const { data: templates } = useTemplates({}, isModalOpen)
  const { mutate: addReport, isPending } = useAddReport()


  const handleClose = () => {
    form.resetFields()
    setIsModalOpen((prev: any) => ({ ...prev, open: false }));
  };

  const handleSubmit = (formData: FormData) => {
    delete formData["type"];
    addReport(formData, {
      onSuccess: (report: any) => {
        message.success("Report Added Successfully!")
        reportingSubject.next({ action: 'reportAdded', report })
        // handleClose();
      },
      onError: (error) => {
        console.error("Failed to add report:", error);
        message.error("Error adding report!")
      },
    });
  };

  useEffect(() => {
    let mappedServices = services?.map((service: any) => ({ label: service.serviceName, value: service.id }))
    let mappedTags = tags?.map((tag: any) => ({ label: tag, value: tag }))
    let mappedTemplates = templates?.templates?.map((template: any) => ({ label: template.name, value: template.id }))
    setApplications(mappedServices)
    setTagsData(mappedTags)
    setTemplatesData(mappedTemplates)
  }, [services, tags, templates])

  return (
    <>
      <Modal
        title="Generate Report"
        open={isModalOpen}
        onCancel={handleClose}
        footer={null}

      >
        <Form form={form} layout="vertical" onFinish={handleSubmit} className="border p-4 rounded">

          <Form.Item name="type">
            <Radio.Group
              options={radioOptions}
              onChange={(e) => setType(e.target.value)}
              value={type}
              defaultValue={'service_ids'}
              optionType="button"
              buttonStyle="solid"
            />
          </Form.Item>


          <Form.Item
            name={type}
            label={`Select ${type === "service_ids" ? "Applications" : "Tags"}`}
            rules={[
              {
                required: true,
                message: `Please select at least one ${type === "service_ids" ? "Application" : "Tag"}`,
              },
            ]}
          >
            <MultiSelect
              options={type === "service_ids" ? applications : tagsData}
              placeholder={`Select ${type === "service_ids" ? "Applications" : "Tags"}`}
              isLoading={false}
              maxTagCount={4}
            />
          </Form.Item>


          <Form.Item
            name="name"
            label="Report Name"
            rules={[{ required: true, message: "Please enter the report name" }]}
          >
            <Input placeholder="Enter report name" className="w-full" />
          </Form.Item>


          <Form.Item
            name="template_id"
            label="Select Template"
            rules={[{ required: true, message: "Please select template." }]}
          >
            <MultiSelect
              options={templatesData}
              placeholder="Select templates"
              isLoading={false}
              mode="single"
            />
          </Form.Item>

          <Form.Item>
            <div className="flex justify-end gap-2">
              <Button onClick={handleClose}>Cancel</Button>
              <Button type="primary" htmlType="submit" loading={isPending}>
                Generate Report
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
