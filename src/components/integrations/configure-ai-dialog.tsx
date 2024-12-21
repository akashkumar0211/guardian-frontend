import React, { useEffect, useState } from 'react'
import { InfiniteScrollTable } from '../atomic-components/infinite-scrolling-table'
import { Button, message, Modal, Tooltip } from 'antd'
import { AIDialogProps } from '@/interfaces/integrations-interface'
import { useDeleteAIToken, useGetAITokens } from '@/queries/integrations'
import { defaultPageInfo } from '@/constants/common-constants'
import { PageInfo } from '@/interfaces/common-interfaces'
import { configureAIColumns } from '@/infinite-scroll-table-columns/ai-dialog-columns'
import { PlusOutlined } from "@ant-design/icons";
import { AddAITokenDilog } from './add-ai-token-dialog'
import { integrationsSubject } from '@/event-emitters/event-emitters'

export const ConfigureAIDialog: React.FC<AIDialogProps> = ({ aiData, isModalOpen, setIsModalOpen }) => {
    const [pageInfo, setPageInfo] = useState<PageInfo>(defaultPageInfo)
    const [addTokenModal, setAddTokenModal] = useState<boolean>(false)
    const [editTokenData, setEditTokenData] = useState<any>(aiData)

    const { data: aiTokens, refetch, isLoading } = useGetAITokens({ ...pageInfo, ai_name: aiData['id'] }, isModalOpen)
    const { mutate: deleteAiToken } = useDeleteAIToken(); // Use the custom hook here

    const handleAddTokenClick = () => {
        setAddTokenModal(true)
    }

    const getTitle = () => {
        return <div className='flex justify-start items-center gap-2'>Configure {aiData['display_name']}
           <Tooltip title='Add token' placement='right'>
           <Button className='w-5 rounded-full' onClick={handleAddTokenClick}>
                <PlusOutlined className='text-[#2b7873]' />
            </Button>
           </Tooltip>
        </div>
    }

    useEffect(() => {
        const subscription = integrationsSubject.subscribe((res) => {

            if (res['action'] == 'aiTokenUpdated' || res['action'] == 'aiTokenAdded') {
                refetch()
            }
            else if (res['action'] == 'deleteToken') {
                let record = res['token']

                deleteAiToken({ ai_name: editTokenData['id'], id: record.id }, {
                    onSuccess: () => {
                        message.success("Token Deleted Successfully!")
                        refetch()
                    },
                    onError: (error) => {
                        console.error("Failed to delete token:", error);
                        message.error("Error deleting token!")
                    },
                })
            }
            else if (res['action'] == 'editAiToken') {
                setAddTokenModal(true)
                setEditTokenData((prev: any) => ({ ...prev, label: res['token']?.['label'], token_id: res['token']?.['id'] }))
            }
        })

        return () => {
            subscription.unsubscribe()
        }
    }, [])

    useEffect(() => {
        setEditTokenData(aiData)
    }, [aiData])

    return (
        <Modal
            centered
            visible={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            footer={null}
            width={700}
            title={getTitle()}>
            <div className='border p-3 rounded'>
                <InfiniteScrollTable
                    data={aiTokens || []}
                    hasMore={aiTokens?.length < (aiTokens?.meta?.total || 0)}
                    columns={configureAIColumns}
                    fetchData={refetch}
                    pageInfo={pageInfo}
                    setPageInfo={setPageInfo}
                    rowKey="id"
                    isLoading={isLoading}
                />
            </div>
            {/* <FloatingButton icon={<PlusOutlined />} tooltipTitle='Add AI Token' key={'git'} /> */}
            {addTokenModal && <AddAITokenDilog isModalOpen={addTokenModal} setIsModalOpen={setAddTokenModal} tokenData={editTokenData} setTokenData={setEditTokenData} />}
        </Modal>
    )
}
