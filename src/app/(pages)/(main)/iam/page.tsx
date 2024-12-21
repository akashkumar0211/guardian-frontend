'use client'
import React, {  useEffect, useState } from 'react'
import { InfiniteScrollTable } from '@/components/atomic-components/infinite-scrolling-table'
import { NavigationTabs } from '@/components/atomic-components/navigation-tabs'
import { defaultPageInfo } from '@/constants/common-constants'
import { PageInfo } from '@/interfaces/common-interfaces'
import { useGetRoles, useGetTeams, useGetUsers } from '@/queries/iam'
import { iamTabs } from '@/utils/tabs-data'
import { userTableColumns } from '@/infinite-scroll-table-columns/users-columns'
import { roleTableColumns } from '@/infinite-scroll-table-columns/role-columns'
import { teamTableColumns } from '@/infinite-scroll-table-columns/teams-columns'
import { UserCreationDialog } from '@/components/iam/create-user-dialog'
import { FloatingButton } from '@/components/atomic-components/floating-plus-icon'
import { PlusOutlined } from "@ant-design/icons";
import { iamSubject } from '@/event-emitters/event-emitters'
import { TeamDialog } from '@/components/iam/create-team-dialog'
import { DescriptionComp } from '@/components/atomic-components/tab-description'

const IamPage = () => {
  const [usersPageInfo, setUsersPageInfo] = useState<PageInfo>(defaultPageInfo)
  const [rolesPageInfo, setRolesPageInfo] = useState<PageInfo>(defaultPageInfo)
  const [teamsPageInfo, setTeamsPageInfo] = useState<PageInfo>(defaultPageInfo)
  const [activeTab, setActiveTab] = useState<string>('users');
  const [modalInfo, setModalInfo] = useState({
    open: false,
    type: 'templates',
  });

  const [editUserData, setEditUserData] = useState<any>(null)
  const [editTeamData, setEditTeamData] = useState<any>(null)
  const [selectedApplications, setSelectedApplications] = useState<string[]>([]);

  const [usersData, setUsersData] = useState<any>([])
  const [rolesData, setRolesData] = useState<any>([])
  const [teamsData, setTeamsData] = useState<any>([])

  const { data: users, refetch: fetchUsers, isLoading: isUsersLoading } = useGetUsers(usersPageInfo)
  const { data: roles, refetch: fetchRoles, isLoading: isRolesLoading } = useGetRoles(rolesPageInfo)
  const { data: teams, refetch: fetchTeams, isLoading: isTeamsLoading } = useGetTeams(teamsPageInfo)

  const handleButtonClick = () => {
    setSelectedApplications([])
    setModalInfo({ open: true, type: activeTab });
  };

  const handleTabChange = (activeKey: string) => {
    setActiveTab(activeKey);
  };

  useEffect(() => {
    if (users?.users && activeTab === 'users') {
      const newUsers = users.users.filter((item: any) => !usersData.some((user: any) => user._id === item._id));
      if (newUsers.length > 0) {
        setUsersData((prevUsers: any) => ([...prevUsers, ...newUsers]))
      }
    }
    else if (teams?.teams && activeTab === 'teams') {
      const newTeams = teams.teams.filter((team: any) => !teamsData.some((item: any) => item._id === team._id));
      if (newTeams.length > 0) {
        setTeamsData((prevTeams: any) => ([...prevTeams, ...newTeams]))
      }
    }
    else if (roles?.roles && activeTab === 'roles') {
      setRolesData(roles?.roles || [])
    }

  }, [users, roles, teams, activeTab])

  useEffect(() => {
    const subscription = iamSubject.subscribe((res) => {
      if (res['action'] === 'newUserAdded') {
        fetchUsers()
      }
      else if (res['action'] === 'editTeam') {
        setEditTeamData(res['team'])
        setModalInfo({ type: 'teams', open: true })
        setSelectedApplications(res['team']?.['applications']?.map((app: any) => app.id))
      }
      else if (res['action'] === 'editUser') {
        setModalInfo({ type: 'users', open: true })
        setEditUserData(res['user'])
      }
    })

    return () => { subscription.unsubscribe() }
  }, [])

  return (
    <div>
      <NavigationTabs items={iamTabs} onTabChange={handleTabChange} />
      <DescriptionComp activeTab={activeTab} />
      {activeTab === 'users' && 
      <>
      <InfiniteScrollTable
        data={usersData || []}
        hasMore={usersData?.length < (users?.total || 0)}
        columns={userTableColumns}
        fetchData={fetchUsers}
        pageInfo={usersPageInfo}
        setPageInfo={setUsersPageInfo}
        rowKey="_id"
        isLoading={isUsersLoading}
      />
      </>
      }
      {activeTab === 'teams' && <InfiniteScrollTable
        data={teamsData || []}
        hasMore={teamsData?.length < (teams?.total || 0)}
        columns={teamTableColumns}
        fetchData={fetchTeams}
        pageInfo={teamsPageInfo}
        setPageInfo={setTeamsPageInfo}
        rowKey="casId"
        isLoading={isTeamsLoading}
      />}
      {activeTab === 'roles' && <InfiniteScrollTable
        data={rolesData || []}
        hasMore={rolesData?.length < (roles?.total || 0)}
        columns={roleTableColumns}
        fetchData={fetchRoles}
        pageInfo={rolesPageInfo}
        setPageInfo={setRolesPageInfo}
        rowKey="role"
        isLoading={isRolesLoading}
      />}
      {modalInfo.type === 'users' && <UserCreationDialog isModalOpen={modalInfo.open} setIsModalOpen={setModalInfo} editUserData={editUserData} />}
      {modalInfo.type === 'teams' && <TeamDialog isModalOpen={modalInfo.open} setIsModalOpen={setModalInfo} selectedApplications={selectedApplications} editTeamData={editTeamData} setSelectedApplications={setSelectedApplications} setEditTeamData={setEditTeamData} />}
      {activeTab !== 'roles' && <FloatingButton onClick={handleButtonClick} icon={<PlusOutlined />} tooltipTitle={`Create ${activeTab.slice(0, 1).toUpperCase() + activeTab.slice(1)}`} />}


    </div>
  )
}

export default IamPage