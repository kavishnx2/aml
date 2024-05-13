import React, { useState } from 'react';
import {
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { Menu, Typography, Row, Col, Divider } from 'antd';
import { MdAnalytics } from 'react-icons/md';

const { Text, Link } = Typography;

const inputNodes = [
  {
    title: 'API Request',
    icon: <MdAnalytics size={20} style={{ marginRight: '8px' }} />,
    type: 'RequestNode',
  },
  {
    title: 'Data Ingestion',
    icon: <MdAnalytics size={20} style={{ marginRight: '8px' }} />,
    type: 'IngestionNode',
  },
];

const integrationNodes = [
  {
    title: 'User Behaviour Analysis',
    icon: <MdAnalytics size={20} style={{ marginRight: '8px' }} />,
    type: 'UserBehaviorAnalysis',
  },
  {
    title: 'Fraud classification',
    icon: <MdAnalytics size={20} style={{ marginRight: '8px' }} />,
    type: 'Fraudulent',
  },
  {
    title: 'KYC Integration',
    icon: <MdAnalytics size={20} style={{ marginRight: '8px' }} />,
    type: 'KYCIntegration',
  },
  {
    title: 'AML Integration',
    icon: <MdAnalytics size={20} style={{ marginRight: '8px' }} />,
    type: 'AMLTransaction',
  },
];

const outputNodes = [
  {
    title: 'Basic Action',
    icon: <MdAnalytics size={20} style={{ marginRight: '8px' }} />,
    type: 'ActionNode',
  },
  {
    title: 'Suspicious Activity Alert',
    icon: <MdAnalytics size={20} style={{ marginRight: '8px' }} />,
    type: 'ActionNode',
  },
  {
    title: 'Escalation',
    icon: <MdAnalytics size={20} style={{ marginRight: '8px' }} />,
    type: 'ActionNode',
  },
];

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}

// submenu keys of first level
const rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];

const SideBar = () => {
  const onDragStart = (event, nodeType) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const [openKeys, setOpenKeys] = useState(['sub1']);
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <aside>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          paddingBottom: '20px',
        }}
      >
        <Text strong style={{ marginLeft: '15px' }}>
          Process Toolbar
        </Text>
        <Text style={{ marginLeft: '15px' }}>
          Drag and Drop a process to create a new workflow
        </Text>
      </div>

      {/* <Divider orientation="left">Node list</Divider> */}

      <Menu
        mode="inline"
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        style={{
          width: '100%',
          //   paddingTop: '10px',
        }}
        items={[
          {
            label: 'Input Node',
            key: 'input-node',
            children: inputNodes.map((node, index) => ({
              label: (
                <div
                  key={index + 1}
                  className="dndnode input"
                  onDragStart={(event) => onDragStart(event, node.type)}
                  draggable
                >
                  {/* {node.icon} */}
                  {node.title}
                </div>
              ),
              key: index + 1,
            })),
          },
          {
            label: 'Integration Node',
            key: 'integration-node',
            children: integrationNodes.map((node, index) => ({
              label: (
                <div
                  key={index + 10}
                  className="dndnode input"
                  onDragStart={(event) => onDragStart(event, node.type)}
                  draggable
                  // style={{ marginLeft: '-30px', zIndex: '100' }}
                >
                  {/* {node.icon} */}
                  <div style={{ maxWidth: '100px' }}>{node.title}</div>
                </div>
              ),
              key: index + 10,
            })),
          },
          {
            label: 'Output Node',
            key: 'output-node',
            children: outputNodes.map((node, index) => ({
              label: (
                <div
                  key={index + 20}
                  className="dndnode input"
                  onDragStart={(event) => onDragStart(event, node.type)}
                  draggable
                >
                  {/* {node.icon} */}
                  {node.title}
                </div>
              ),
              key: index + 20,
            })),
          },
        ]}
      />
    </aside>
  );
};

export default SideBar;
