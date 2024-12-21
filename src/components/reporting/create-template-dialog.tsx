import React, { useState, useEffect } from "react";
import { Modal, Steps, Input, Checkbox, Button, message } from "antd";
import {
    FileOutlined,
    FilterOutlined,
    TableOutlined
} from "@ant-design/icons";
import "tailwindcss/tailwind.css";
import {
    severity,
    scanTypes,
    status,
    scanTypeKeys,
    defaultFiltersState,
    defaultDisplayState
} from "@/constants/reporting-constants";
import { useAddTemplate, useUpdateTemplate } from "@/queries/reporting";
import { Category, TemplateDialogProps } from "@/interfaces/reporting-interface";
import { reportingSubject } from "@/event-emitters/event-emitters";

// // Separate component for General Step
const GeneralStep: React.FC<TemplateDialogProps> = ({ templateName, setTemplateName, onNext }) => {
    return (
        <div className="p-4">
            <Input
                placeholder="Enter Template Name"
                value={templateName}
                onChange={(e) => setTemplateName(e.target.value)}
                className="mb-4"
            />
            <div className="flex justify-end">
                <Button
                    className="align-middle"
                    type="primary"
                    disabled={!templateName}
                    onClick={onNext}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

// // Separate component for Filter Step
const FilterStep: React.FC<{
    selectedFilters: {
        severity: string[],
        status: string[],
        scan_type: string[]
    },
    selectAllStates: {
        severity: boolean,
        status: boolean,
        scan_type: boolean
    },
    setSelectedFilters: React.Dispatch<React.SetStateAction<any>>,
    setSelectAllStates: React.Dispatch<React.SetStateAction<any>>,
    onNext: () => void,
    onBack: () => void
}> = ({
    selectedFilters,
    selectAllStates,
    setSelectedFilters,
    setSelectAllStates,
    onNext,
    onBack
}) => {
        // Map of constants
        const filterConstants = {
            "scan_type": scanTypes.map(item => ({ label: item.key, value: item.value })),
            severity: severity.map(item => ({ label: item.key, value: item.value })),
            status: status.map(item => ({ label: item.key, value: item.value }))
        };

        const handleFilterChange = (category:Category) => {
            return (selectedValues: string[]) => {
                setSelectedFilters((prev: any) => ({
                    ...prev,
                    [category]: selectedValues
                }));

                // Update select all state
                setSelectAllStates((prev: any) => ({
                    ...prev,
                    [category]: selectedValues.length === filterConstants[category].length
                }));
            };
        };

        const handleSelectAll = (category:Category) => {
            return (e: any) => {
                const isChecked = e.target.checked;
                setSelectAllStates((prev: any) => ({
                    ...prev,
                    [category]: isChecked
                }));

                setSelectedFilters((prev: any) => ({
                    ...prev,
                    [category]: isChecked ? filterConstants[category].map((val) => val.value) : []
                }));
            };
        };

        return (
            <div className="p-4 space-y-4">
                <div className="flex justify-between space-x-4">
                    {/* Scan Types Filters */}
                    <div className="flex-1 border p-4 rounded">
                        <div className="mb-2 font-semibold">
                            <Checkbox
                                checked={selectAllStates["scan_type"]}
                                onChange={handleSelectAll("scan_type")}
                            >
                                Scan Types
                            </Checkbox>
                        </div>
                        <div className="border-t border-gray-300 my-2 w-2/3"></div>
                        <Checkbox.Group
                            options={filterConstants["scan_type"]}
                            value={selectedFilters["scan_type"]}
                            onChange={handleFilterChange("scan_type")}
                            className="flex flex-col"
                        />
                    </div>

                    {/* Severity Filters */}
                    <div className="flex-1 border p-4 rounded">
                        <div className="mb-2 font-semibold">
                            <Checkbox
                                checked={selectAllStates.severity}
                                onChange={handleSelectAll("severity")}
                            >
                                Severities
                            </Checkbox>
                        </div>
                        <div className="border-t border-gray-300 my-2 w-2/3"></div>
                        <Checkbox.Group
                            options={filterConstants.severity}
                            value={selectedFilters.severity}
                            onChange={handleFilterChange("severity")}
                            className="flex flex-col"
                        />
                    </div>

                    {/* Status Filters */}
                    <div className="flex-1 border p-4 rounded">
                        <div className="mb-2 font-semibold">
                            <Checkbox
                                checked={selectAllStates.status}
                                onChange={handleSelectAll("status")}
                            >
                                Status
                            </Checkbox>
                        </div>
                        <div className="border-t border-gray-300 my-2 w-2/3"></div>

                        <Checkbox.Group
                            options={filterConstants.status}
                            value={selectedFilters.status}
                            onChange={handleFilterChange("status")}
                            className="flex flex-col"
                        />
                    </div>
                </div>

                <div className="flex justify-between mt-4">
                    <Button onClick={onBack}>Back</Button>
                    <Button
                        type="primary"
                        disabled={
                            !selectedFilters.severity.length ||
                            !selectedFilters.status.length ||
                            !selectedFilters["scan_type"].length
                        }
                        onClick={onNext}
                    >
                        Next
                    </Button>
                </div>
            </div>
        );
    };

// // Separate component for Display Step
const DisplayStep: React.FC<{
    selectedFilters: { scan_type: string[] },
    selectedDisplayKeys: { [key: string]: string[] },
    selectAllDisplayStates: { [key: string]: boolean },
    summary: boolean,
    isPending: boolean,
    setSelectedDisplayKeys: React.Dispatch<React.SetStateAction<{ [key: string]: string[] }>>,
    setSelectAllDisplayStates: React.Dispatch<React.SetStateAction<{ [key: string]: boolean }>>,
    setSummary: React.Dispatch<React.SetStateAction<boolean>>,
    onBack: () => void,
    onFinish: () => void
}> = ({
    selectedFilters,
    selectedDisplayKeys,
    selectAllDisplayStates,
    summary,
    setSelectedDisplayKeys,
    setSelectAllDisplayStates,
    setSummary,
    onBack,
    onFinish,
    isPending
}) => {
        const handleDisplayKeysChange = (scanType: string) => {
            return (selectedKeys: string[]) => {
                const scanTypeKey = scanType.toLowerCase();
                setSelectedDisplayKeys(prev => ({
                    ...prev,
                    [scanTypeKey]: selectedKeys
                }));

                // Check if all display fields for this scan type are selected
                const scanTypeKeysForType = scanTypeKeys[scanTypeKey as keyof typeof scanTypeKeys] || [];
                const allSelected = selectedKeys.length === scanTypeKeysForType.length;

                setSelectAllDisplayStates(prev => ({
                    ...prev,
                    [scanTypeKey]: allSelected
                }));
            };
        };

        const handleSelectAllDisplayFields = (scanType: string) => {
            return (e: any) => {
                const isChecked = e.target.checked;
                const scanTypeKey = scanType.toLowerCase();
                const availableFields = scanTypeKeys[scanTypeKey as keyof typeof scanTypeKeys] || [];
                const fieldValues = isChecked ? availableFields.map(f => f.value) : [];

                setSelectAllDisplayStates(prev => ({
                    ...prev,
                    [scanTypeKey]: isChecked
                }));

                setSelectedDisplayKeys(prev => ({
                    ...prev,
                    [scanTypeKey]: fieldValues
                }));
            };
        };

        return (
            <div className="p-4 space-y-4">
                <div className="space-y-4">
                    <h4 className="text-md font-medium">Display Fields</h4>

                    {/* Dynamic display fields for each selected scan type */}
                    <div className="flex justify-between space-x-4">
                        {selectedFilters["scan_type"].map((scanType) => {
                            const normalizedScanType = scanType.toLowerCase();
                            const scanTypeKeysForType = scanTypeKeys[normalizedScanType as keyof typeof scanTypeKeys] || [];

                            return (
                                <div key={scanType} className="flex-1 border p-4 rounded">
                                    <div className="mb-2 font-semibold">
                                        <Checkbox
                                            checked={selectAllDisplayStates[normalizedScanType]}
                                            onChange={handleSelectAllDisplayFields(scanType)}
                                        >
                                            {scanType.toUpperCase()}
                                        </Checkbox>
                                    </div>
                                    <div className={`border-t border-gray-300 my-2 w-full`}></div>
                                    <Checkbox.Group
                                        options={scanTypeKeysForType.map(item => ({ label: item.label, value: item.value }))}
                                        value={selectedDisplayKeys[normalizedScanType]}
                                        onChange={handleDisplayKeysChange(scanType)}
                                        className="flex flex-col"
                                    />
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="flex-1 border p-4 rounded w-1/3 font-semibold">
                    <Checkbox checked={summary} onChange={() => setSummary(!summary)}>
                        Include Summary
                    </Checkbox>
                </div>

                <div className="flex justify-between mt-4">
                    <Button onClick={onBack}>Back</Button>
                    <Button type="primary" onClick={onFinish} loading={isPending}>
                        Finish
                    </Button>
                </div>
            </div>
        );
    };

export const TemplateDialog: React.FC<{
    isModalOpen: boolean,
    setIsModalOpen: (state: any) => void,
    editTemplate?: any // Optional: Template data for editing
}> = ({ isModalOpen, setIsModalOpen, editTemplate }) => {

    const { mutate: addTemplate, isPending: isAdding } = useAddTemplate();
    const { mutate: updateTemplate, isPending: isUpdating } = useUpdateTemplate();

    const [currentStep, setCurrentStep] = useState(0);
    const [templateName, setTemplateName] = useState("");
    const [summary, setSummary] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    // State for selected filters with more granular control
    const [selectedFilters, setSelectedFilters] = useState(defaultFiltersState);

    // State to track if each category is fully selected
    const [selectAllStates, setSelectAllStates] = useState(defaultDisplayState);

    // State for selected display keys
    const [selectedDisplayKeys, setSelectedDisplayKeys] = useState<{ [key: string]: string[] }>(
        Object.fromEntries(
            Object.keys(scanTypeKeys).map(key => [key, []])
        )
    );

    // State to track if each scan type's display fields are fully selected
    const [selectAllDisplayStates, setSelectAllDisplayStates] = useState<{ [key: string]: boolean }>({});

    // Populate fields when in edit mode
    useEffect(() => {

        if (editTemplate) {
            setIsEditMode(true);
            setTemplateName(editTemplate.name || "");
            setSelectedFilters(editTemplate.filter || defaultFiltersState);
            setSelectedDisplayKeys(editTemplate.display || {});
            setSummary(editTemplate.summary === "true");

            scanTypes.map(({ key, value }) => {
                setSelectAllDisplayStates((prev) => ({
                    ...prev,
                    [value]: scanTypeKeys[value as keyof typeof scanTypeKeys].length === editTemplate?.display?.[value]?.length
                }))
            }
            );
            setSelectAllStates({
                'scan_type':scanTypes.length===editTemplate?.filter?.scan_type?.length,
                'status':status.length===editTemplate?.filter?.status?.length,
                'severity':severity.length===editTemplate?.filter?.severity?.length,
            })
        } else {
            setIsEditMode(false);
            resetFields();
        }
    }, [editTemplate]);

    const resetFields = () => {
        setTemplateName("");
        setSummary(false);
        setSelectedFilters(defaultFiltersState);
        setSelectAllStates(defaultDisplayState);
        setSelectedDisplayKeys({});
        setSelectAllDisplayStates({});
    };

    const handleClose = () => {
        setIsEditMode(false)
        setIsModalOpen((prev: any) => ({ ...prev, open: false }));
        setCurrentStep(0);
        resetFields();
    };

    const handleNext = () => {
        setCurrentStep(prev => prev + 1);
    };

    const handleBack = () => {
        setCurrentStep(prev => prev - 1);
    };

    const handleFinish = () => {
        let payload:any = {
            name: templateName,
            filter: {
                scan_type: selectedFilters['scan_type'],
                severity: selectedFilters['severity'],
                status: selectedFilters['status']
            },
            display: selectedDisplayKeys,
            summary: `${summary}`
        };
        if(isEditMode){
            payload['id']=editTemplate['id']
        }        

        let templateFunction=isEditMode?updateTemplate:addTemplate
        templateFunction(payload, {
            onSuccess: (updatedTemplate: any) => {
                message.success(`Template ${isEditMode?'Updated':'Added'} Successfully!`);
                reportingSubject.next({ action: isEditMode?'templateUpdated':'templateAdded', template: updatedTemplate });
                handleClose();
            },
            onError: (error: any) => {
                message.error(error?.response?.data?.error || `Failed to ${isEditMode?'update':'add'} template.`);
            }
        })
    };

    const steps = [
        {
            title: 'General',
            content: (
                <GeneralStep
                    templateName={templateName}
                    setTemplateName={setTemplateName}
                    onNext={handleNext}
                />
            ),
            icon: <FileOutlined />
        },
        {
            title: 'Filter',
            content: (
                <FilterStep
                    selectedFilters={selectedFilters}
                    selectAllStates={selectAllStates}
                    setSelectedFilters={setSelectedFilters}
                    setSelectAllStates={setSelectAllStates}
                    onNext={handleNext}
                    onBack={handleBack}
                />
            ),
            icon: <FilterOutlined />
        },
        {
            title: 'Display',
            content: (
                <DisplayStep
                    selectedFilters={selectedFilters}
                    selectedDisplayKeys={selectedDisplayKeys}
                    selectAllDisplayStates={selectAllDisplayStates}
                    setSelectedDisplayKeys={setSelectedDisplayKeys}
                    setSelectAllDisplayStates={setSelectAllDisplayStates}
                    onBack={handleBack}
                    onFinish={handleFinish}
                    summary={summary}
                    setSummary={setSummary}
                    isPending={isAdding}
                />
            ),
            icon: <TableOutlined />
        }
    ];

    return (
        <Modal
            title={isEditMode ? "Edit Template" : "Create Template"}
            visible={isModalOpen}
            footer={null}
            onCancel={handleClose}
            width={800}
        >
            <Steps current={currentStep} type="default">
                {steps.map(item => (
                    <Steps.Step key={item.title} title={item.title} icon={item.icon} />
                ))}
            </Steps>
            <div className="steps-content mt-4">{steps[currentStep].content}</div>
        </Modal>
    );
};
