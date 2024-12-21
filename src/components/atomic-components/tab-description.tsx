import { tabDescriptions } from "@/constants/common-constants"
import { capitalizeFirstLetter } from "@/utils/common-utils"

export const DescriptionComp: React.FC<any> = ({ activeTab }: { activeTab: string }) => {
    return activeTab && <div className="p-4 mb-4 rounded shadow">
        <h3 className="text-md font-semibold text-gray-800 mb-2">{capitalizeFirstLetter(activeTab)}</h3>
        <p className="text-gray-700 text-sm">{tabDescriptions[activeTab]}</p>
    </div>
}
