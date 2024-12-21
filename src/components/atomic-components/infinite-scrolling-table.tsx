import React, { useState, useEffect, useRef } from "react";
import { Table, message, Spin } from "antd";
import { InfiniteScrollTableProps } from "@/interfaces/common-interfaces";
import { defaultPageInfo } from "@/constants/common-constants";
import { LoadingOutlined } from '@ant-design/icons';

export const InfiniteScrollTable = <T extends { id: React.Key }>({
  columns,
  data,
  rowKey,
  hasMore,
  pageInfo,
  isLoading,
  rowSelection=true,
  style,
  setPageInfo,
  fetchData
}: InfiniteScrollTableProps<T>) => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const observerRef = useRef<HTMLDivElement | null>(null);
  const sentinelRef = useRef<HTMLDivElement | null>(null); // Sentinel element
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries) => {
        
        const target = entries[0];        
        //if length is less than defaultPageInfo size then it means we don't have any data to make api call        
        if (data.length >= defaultPageInfo.size && target.isIntersecting && !isLoading && hasMore) {
          try {            
            console.log("firing for change");
            
            setPageInfo({ page: pageInfo.page + 1, size: pageInfo.size });
          } catch (error) {
            message.error("Failed to load data");
          }
        }
      },
      { root: observerRef.current, rootMargin: "0px", threshold: 0.5 }
    );

    if (sentinelRef.current) {
      observer.observe(sentinelRef.current);
    }    
    return () => {
      if (sentinelRef.current) observer.unobserve(sentinelRef.current);
    };
  }, [data, fetchData, isLoading, hasMore, pageInfo]);

  // Table row selection
  const rowSelectionObj = {
    selectedRowKeys,
    onChange: (newSelectedRowKeys: React.Key[]) => {
      setSelectedRowKeys(newSelectedRowKeys);
    },
  };

  return (
    <div
      ref={scrollContainerRef}
      className="h-[90vh] overflow-x-hidden overflow-y-auto relative border rounded">
      <Table<T>
        rowKey={rowKey}
        columns={columns}
        dataSource={data}
        rowSelection={rowSelection?rowSelectionObj:undefined}
        pagination={false}
        loading={{
          spinning: isLoading,
          indicator: <Spin indicator={<LoadingOutlined spin style={{ fontSize: 50 }}/>} size="large" />
        }} 
        sticky
        style={style}
        tableLayout={"fixed"}
      />
      {/* element for checking if cursor is at the bottom of the table */}
      <div ref={sentinelRef} className="h-1 w-1 bg-white" ></div>
    </div>
  );
};
