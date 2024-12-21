import React, { useEffect, useState } from 'react';
import { Form, Radio, Input, Button } from 'antd';
import { MultiSelect } from '@/components/atomic-components/multi-select';
import { useServices, useTags } from '@/queries/dashboard';
import { useTemplates } from '@/queries/reporting';
import { StepOneFormProps } from '@/interfaces/reporting-interface';

export const StepOneForm: React.FC<StepOneFormProps> = ({
  formData,
  step,
  stepOneForm,
  updateFormData,
  navigateToStep,
  handleClose,
}) => {
    const [applications, setApplications] = useState<any>([]);
    const [tagsData, setTagsData] = useState<any>([]);
    const [templatesData, setTemplatesData] = useState<any>([])

    const { data: services } = useServices({} );
    const { data: tags } = useTags();
    const { data: templates } = useTemplates({})

    useEffect(() => {
        let mappedServices = services?.map((service: any) => ({ label: service.serviceName, value: service.id }))
        let mappedTags = tags?.map((tag: any) => ({ label: tag, value: tag }))
        let mappedTemplates = templates?.templates?.map((template: any) => ({ label: template.name, value: template.id }))
        setApplications(mappedServices)
        setTagsData(mappedTags)
        setTemplatesData(mappedTemplates)
    }, [services, tags, templates])
  return (
    <Form
      form={stepOneForm}
      onFinish={(values) => navigateToStep(1, stepOneForm)}
      layout="vertical"
      initialValues={{
        type: formData.type,
        name: formData.name,
        template_id: formData.template_id,
        applications: formData.applications,
        tags: formData.tags
      }}
    >
      {step === 0 && (
        <div className='border p-4 rounded'>
          <Form.Item 
            name="type" 
            rules={[{ required: true, message: 'Please select a type' }]}
          >
            <Radio.Group 
              onChange={(e) => updateFormData({ type: e.target.value })}
            >
              <Radio value="applications">Applications</Radio>
              <Radio value="tags">Tags</Radio>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="name"
            label="Schedule Name"
            rules={[{ required: true, message: 'Please enter a name' }]}
          >
            <Input placeholder='Enter Schedule Name' />
          </Form.Item>

          <Form.Item
            name="template_id"
            label="Select Template"
            rules={[{ required: true, message: 'Please select a template' }]}
          >
            <MultiSelect
              options={templatesData}
              placeholder="Select Template"
              isLoading={false}
              maxTagCount={4}
              mode='single'
              onChange={(value) => updateFormData({ template_id: value })}
              defaultValue={stepOneForm.getFieldValue('template_id')}
            />
          </Form.Item>

          <Form.Item
            name={formData.type}
            label={`Select ${formData.type === 'applications' ? 'Applications' : 'Tags'}`}
            rules={[{ 
              required: true, 
              message: `Please select at least one ${formData.type}` 
            }]}
          >
            <MultiSelect
              options={formData.type === 'applications' ? applications : tagsData}
              placeholder={`Select ${formData.type === 'applications' ? 'Applications' : 'Tags'}`}
              isLoading={false}
              maxTagCount={4}
              onChange={(value) => updateFormData({ [formData.type]: value })}
              defaultValue={stepOneForm.getFieldValue(formData.type)}
            />
          </Form.Item>

          <div className="flex justify-between">
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="primary" htmlType='submit'>
              Next
            </Button>
          </div>
        </div>
      )}
    </Form>
  );
};
