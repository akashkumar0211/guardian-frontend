import { addDetails, deleteDetails, getDetails, updateDetails } from "./api-services";

export const fetchSecurityTools = async (filters: Record<any, any>) => {
    try {
        const url = `/integrations/tools`;
        const queryString = new URLSearchParams(filters).toString();
        return getDetails(`${url}?${queryString}`);
    } catch (error: any) {
        console.error("error", error);
        throw new Error(error.error)
    }
};


export const fetchAITools = async (filters: Record<any, any>) => {
    try {
        const url = `/integrations/ai/tool`;
        const queryString = new URLSearchParams(filters).toString();
        return getDetails(`${url}?${queryString}`);
    } catch (error: any) {
        console.error("error", error);
        throw new Error(error.error)
    }
};


export const fetchGitCredentials = async (filters: Record<any, any>) => {
    try {
        const url = `/settings/git/list`;
        const queryString = new URLSearchParams(filters).toString();
        return getDetails(`${url}?${queryString}`);
    } catch (error: any) {
        console.error("error", error);
        throw new Error(error.error)
    }
};

export const fetchAITokens = async (filters: Record<any, any>) => {
    
    try {
        const url = `/integrations/ai/configuration/integration_id/${filters['ai_name']}/list`;
        delete filters['ai_name']
        const queryString = new URLSearchParams(filters).toString();
        return getDetails(`${url}?${queryString}`);
    } catch (error: any) {
        console.error("error", error);
        throw new Error(error.error)
    }
};


export const addGitCredentials = async (payload: any) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        };
        const url = `/settings/git/add`;
        return await addDetails(url, payload, config);
    } catch (error: any) {
        console.error("error adding git", error);
        throw new Error(error.error)
    }
}

export const addAiToken= async (payload: any) => {

    try {
        const url = `/integrations/ai/configuration/integration_id/${payload['ai_name']}`;
        delete payload['ai_name']
        return await addDetails(url, payload);
    } catch (error: any) {
        console.error("error adding token ai", error);
        throw new Error(error.error)
    }
}

export const updateGitCredentials = async (payload: any) => {
    try {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };
        const url = `/settings/git/update?id=${payload['id']}`;
        return await updateDetails(url, payload,config);
    } catch (error: any) {
        console.error("error updating git", error);
        throw new Error(error.error)
    }
}

export const updateAiToken= async (payload: any) => {
    try {
        const url = `/integrations/ai/configuration/integration_id/${payload['ai_name']}/edit`;
        delete payload['ai_name']
        return await updateDetails(url, payload);
    } catch (error: any) {
        console.error("error updating token ai", error);
        throw new Error(error.error)
    }
}

export const deleteGitCredential=async (git_id:string)=>{
    try {
        const url=`/settings/git/delete/${git_id}`;
        return deleteDetails(url,{})
    } catch (error:any) {
        console.error("error deleting git", error);
        throw new Error(error.error)
    }
}


export const deleteAiToken= async (payload: any) => {
    try {
        const config = {
            'Content-Type': 'application/json'
        };
        const url = `/integrations/ai/configuration/integration_id/${payload['ai_name']}/delete`;
        delete payload['ai_name']
        return await deleteDetails(url, {data:payload,...config});
    } catch (error: any) {
        console.error("error adding token ai", error);
        throw new Error(error.error)
    }
}
