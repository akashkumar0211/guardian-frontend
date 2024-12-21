'use client'
import React, { useEffect, useState } from "react";
import { Tag, Typography } from "antd";
import { useOwaspTopTen } from "@/queries/dashboard";

export const OwaspTopTen: React.FC = () => {
  let { data: owaspData, isLoading }: any = useOwaspTopTen({})
  // const [owaspTags,setOwaspTags]=useState<any>([])

  if (isLoading) {
    return <>Loading Owasp</>
  }
  const {data:owaspTags}=owaspData

  // Handle tag click event
  const handleTagClick = (tag: string) => {
    console.log("tag click",tag);
    
    // alert(`You clicked on ${tag}`);
  };

  return (
    <div className="p-4 bg-white shadow border rounded">
      <Typography.Title level={4} className="mb-4 text-lg">
        OWASP Top 10
      </Typography.Title>
      <div className="grid grid-cols-2 gap-4">
        {owaspTags.map((tag: any, index: number) => (
          <Tag
            key={index}
            className="text-lg cursor-pointer hover:shadow-md"
            style={{
              width: "100%",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              lineHeight: "4",
            }}
            onClick={() => handleTagClick(tag)}
          >
            {tag.id}
          </Tag>
        ))}
      </div>
    </div>
  );
};

export default OwaspTopTen;
