import { scanDescriptions, gitDescription, aiToolDescription, settingsDescriptions } from "@/constants/common-constants";

export const IntegrationsDescriptionComp: React.FC<any> = ({ scan }: { scan: string }) => {
    let descriptionObj = scanDescriptions
    if (scan == 'ai') {
        descriptionObj = aiToolDescription
    }
    else if (scan == 'git') {
        descriptionObj = gitDescription
    }
    else if (scan == 'tokens' || scan == 'smtp' || scan == 'policies') {
        descriptionObj = settingsDescriptions
    }
    return scan && <>
        <div className="p-4 mb-4 rounded shadow">
            <h3 className="text-md font-semibold text-gray-800 mb-2">{descriptionObj[scan]['title']}</h3>
            <p className="text-gray-700 text-sm">{descriptionObj[scan]['description']}</p>
        </div>
    </>
}


