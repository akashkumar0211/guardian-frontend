import { MultiSelect } from "@/components/atomic-components/multi-select";
import { useGetTeams } from "@/queries/iam";
import { Form } from "antd";

export const UserStepTwo = ({ stepTwoForm, selectedTeams,setSelectedTeams }: { stepTwoForm: any,selectedTeams:string[],setSelectedTeams:(val:string[])=>void }) => {
    const { data: teamsResponse, isLoading: isTeamsLoading } = useGetTeams({});
    const handleChange = (allValues: any) => {        
        setSelectedTeams(allValues || []); // Update state with selected teams
    };


    if (isTeamsLoading) {
        return <span>Loading.....</span>;
    }

    const teamsData = teamsResponse?.teams || [];

    return (
        <div className="p-4">
            <Form form={stepTwoForm} >
                <Form.Item
                    name="teams"
                    rules={[{ required: true, message: 'Please select at least one team' }]}
                >
                    <MultiSelect
                        options={teamsData.map((team: any) => ({
                            label: team.name,
                            value: team.casId
                        }))}
                        placeholder="Select Teams"
                        isLoading={false}
                        maxTagCount={4}
                        defaultValue={selectedTeams}
                        onChange={handleChange}
                    />
                </Form.Item>
            </Form>
        </div>
    );
};