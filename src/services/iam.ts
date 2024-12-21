import { addDetails, deleteDetails, getDetails, updateDetails } from "./api-services";

export const fetchIamUsers = async (filters: Record<any, any>) => {
    try {
        const url = `/rbac/users/list`;
        const queryString = new URLSearchParams(filters).toString();
        return getDetails(`${url}?${queryString}`);
    } catch (error: any) {
        console.error("error", error);
        throw new Error(error.error)
    }
};

export const fetchIamRoles = async (filters: Record<any, any>) => {
    try {
        const url = `/rbac/roles/list`;
        const queryString = new URLSearchParams(filters).toString();
        return getDetails(`${url}?${queryString}`);
    } catch (error: any) {
        console.error("error", error);
        throw new Error(error.error)
    }
};

export const fetchIamTeams = async (filters: Record<any, any>) => {
    try {
        const url = `/rbac/teams/list`;
        const queryString = new URLSearchParams(filters).toString();
        return getDetails(`${url}?${queryString}`);
    } catch (error: any) {
        console.error("error", error);
        throw new Error(error.error)
    }
};

export const addUser= async (payload: any) => {
    try {
        const url = `/rbac/users/add`;
        return await addDetails(url, payload);
    } catch (error: any) {
        console.error("error adding user", error);
        throw new Error(error.error)
    }
}

export const addTeam= async (payload: any) => {
    try {
        const url = `/rbac/teams/add`;
        return await addDetails(url, payload);
    } catch (error: any) {
        console.error("error adding team", error);
        throw new Error(error.error)
    }
}

export const updateUser= async (payload: any) => {
    try {
        const url = `/rbac/users/update`;
        return await updateDetails(url, payload);
    } catch (error: any) {
        console.error("error updating user", error);
        throw new Error(error.error)
    }
}

export const updateTeam= async (payload: any) => {
    try {
        const url = `/rbac/teams/update`;
        return await updateDetails(url, payload);
    } catch (error: any) {
        console.error("error updating team", error);
        throw new Error(error.error)
    }
}

export const deleteUser= async (user_id: any) => {
    try {
        const url = `/rbac/users/delete?_id=${user_id}`;
        return await deleteDetails(url, {});
    } catch (error: any) {
        console.error("error deleting user", error);
        throw new Error(error.error)
    }
}

export const deleteTeam= async (casId: any) => {
    try {
        const url = `/rbac/teams/delete?casId=${casId}`;
        return await deleteDetails(url, {});
    } catch (error: any) {
        console.error("error deleting user", error);
        throw new Error(error.error)
    }
}