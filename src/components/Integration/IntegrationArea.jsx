import React, { useState, useRef, useCallback } from 'react';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  MiniMap,
  Background,
  Panel,
  applyEdgeChanges,
  applyNodeChanges,
} from 'reactflow';

import {
  Button,
  Input,
  Row,
  notification,
  Space,
  message,
  Typography,
  Form,
} from 'antd';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query';
const { Text, Link } = Typography;
import { v4 as uuidv4 } from 'uuid';
import { fetchData, postData } from '../../../utils/apiFunctions';
import Sidebar from './SideBar';
import RequestNode from './Node/RequestNode';
import KYCIntegration from './Node/KYCIntegration';
import UserBehaviorAnalysis from './Node/UserBehaviorAnalysis';
import ActionNode from './Node/ActionNode';
import IngestionNode from './Node/IngestionNode';
import Fraudulent from './Node/Fraudulent';
import AMLTransaction from './Node/AMLTransaction';

import 'reactflow/dist/style.css';
import '../../styles/Integration/IntegrationArea.css';
import '../../styles/Integration/Node.css';
import url from '../../../utils/url';

const initialNodes = [
  //   {
  //     id: 'dndnode_1',
  //     type: 'InputNode',
  //     position: { x: 0, y: 0 },
  //     data: { value: 123 },
  //   },
];
const userId = '123';

const nodeTypes = {
  RequestNode: RequestNode,
  KYCIntegration: KYCIntegration,
  UserBehaviorAnalysis: UserBehaviorAnalysis,
  ActionNode: ActionNode,
  IngestionNode: IngestionNode,
  Fraudulent: Fraudulent,
  AMLTransaction: AMLTransaction,
};

let id = 3;
const getId = () => `dndnode_${id++}`;

function IntegrationArea() {
  const reactFlowWrapper = useRef(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [reactFlowInstance, setReactFlowInstance] = useState(null);
  const [apiKey, setapiKey] = useState(uuidv4());
  const [loading, setLoading] = useState(false);
  const [configJSON, setConfigJSON] = useState({});
  const [isSaved, setIsSaved] = useState(false);
  const [savedKey, setSavedKey] = useState(apiKey);
  const [IntegrationName, setIntegrationName] = useState('');
  const [cost, setCost] = useState(0.0);

  const endpoint = `${url.BASIC}apiservice?apikey=${savedKey}`;

  let nodesList = { Integration: [] };
  let config = {
    apiKey: apiKey,
    IntegrationName: IntegrationName,
    clientId: userId,
    endpoint: endpoint,
    input: {},
    nodes: [],
    output: {},
    cost: 0,
  };

  const nameChange = (event) => {
    // data.addIntegrationElement(
    //   'UserBehaviorAnalysis',
    //   'duration',
    //   event.target.value.toString()
    // );
    setIntegrationName(event.target.value);
    // config['IntegrationName'] = event.target.value;
  };

  function addParametersElement(nodeType, key, value) {
    config[`${nodeType}`][key] = value;
    setConfigJSON(config);
    console.log(config);
  }
  function addIntegrationElement(integrationType, key, value) {
    const foundObject = config.nodes.find((obj) => obj.name == integrationType);

    if (!foundObject) {
      const params = { [key]: value };
      const newIntegration = { name: integrationType, params: params };
      config.nodes.push(newIntegration);
    } else {
      const object = config.nodes.find((obj) => obj.name == integrationType);
      object.params[key] = value;
    }

    setConfigJSON(config);
    console.log(config);
  }

  function addConfigElement(key, value) {
    nodesList[key] = value;
    console.log(nodesList);
  }

  function addConfigIntegration(value) {
    nodesList.Integration.push(value);
    console.log(nodesList);
  }

  const openNotificationWithIcon = (type) => {
    api[type]({
      message: 'Integration successful 🎉',
      description: 'Your Integration has been successfully published!',
    });
  };

  const warning = (text) => {
    messageApi.open({
      type: 'warning',
      content: `You can not have more that one ${text}`,
    });
  };

  const error = (text) => {
    messageApi.open({
      type: 'error',
      content: `Error: ${text}`,
    });
  };

  const publishMutation = useMutation(
    (values) =>
      postData({
        url: url.PUBLISH,
        body: values,
      }),
    {
      onSuccess: async (values) => {
        // await queryClient.invalidateQueries('logData');
        openNotificationWithIcon('success');
        setIsSaved(true);
        setSavedKey(apiKey);
        setLoading(false);
      },
      onError: async (values) => {
        error('Server Down! Unable to publish');
        setLoading(false);
      },
    }
  );

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
    []
  );

  const [api, contextHolder] = notification.useNotification();
  const [messageApi, messageApicontextHolder] = message.useMessage();

  const onDragOver = useCallback((event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const publish = () => {
    setLoading(true);
    console.log({ CONFIG: configJSON });
    configJSON['IntegrationName'] = IntegrationName;
    configJSON['cost'] = cost;
    publishMutation.mutate(configJSON);
  };

  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      // check if the dropped element is valid
      if (typeof type === 'undefined' || !type) {
        return;
      }

      // console.log(type);

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });
      const newNode = {
        id: type,
        type,
        position,
        data: {
          addParametersElement: addParametersElement,
          addIntegrationElement: addIntegrationElement,
        },
      };

      let inputConfig = {};

      if (type == 'RequestNode') {
        if (config.hasOwnProperty('Input')) {
          warning('input node');
        } else {
          inputConfig = {
            type: 'InputNode',
            name: 'RequestNode',
            body: 'body',
            node: newNode,
          };
          const newCost = cost;
          setCost(newCost + 0.001);
          addConfigElement('Input', inputConfig);
          setNodes((nds) => nds.concat(newNode));
        }
      }
      if (type == 'KYCIntegration') {
        inputConfig = {
          type: 'Integration',
          name: 'KYCIntegration',
          body: 'body',
          node: newNode,
        };
        const newCost = cost;
        setCost(newCost + 0.001);
        addConfigIntegration(inputConfig);
        setNodes((nds) => nds.concat(newNode));
      }
      if (type == 'AMLTransaction') {
        inputConfig = {
          type: 'Integration',
          name: 'AMLTransaction',
          body: 'body',
          node: newNode,
        };
        const newCost = cost;
        setCost(newCost + 0.001);
        addConfigIntegration(inputConfig);
        setNodes((nds) => nds.concat(newNode));
      }
      if (type == 'Fraudulent') {
        inputConfig = {
          type: 'Integration',
          name: 'Fraudulent',
          body: 'body',
          node: newNode,
        };
        const newCost = cost;
        setCost(newCost + 0.001);
        addConfigIntegration(inputConfig);
        setNodes((nds) => nds.concat(newNode));
      }
      if (type == 'IngestionNode') {
        if (config.hasOwnProperty('Input')) {
          warning('input node');
        } else {
          inputConfig = {
            type: 'InputNode',
            name: 'IngestionNode',
            body: 'body',
            node: newNode,
          };
          addConfigElement('Input', inputConfig);
          setNodes((nds) => nds.concat(newNode));
        }
      }
      if (type == 'UserBehaviorAnalysis') {
        inputConfig = {
          type: 'Integration',
          name: 'UserBehaviorAnalysis',
          body: 'body',
          node: newNode,
        };
        setCost(cost + 0.1);
        addConfigIntegration(inputConfig);
        setNodes((nds) => nds.concat(newNode));
      }
      if (type == 'ActionNode') {
        if (config.hasOwnProperty('Output')) {
          warning('output node');
        } else {
          inputConfig = {
            type: 'OutputNode',
            name: 'RequestNode',
            body: 'body',
            node: newNode,
          };
          setCost(cost + 0.2);
          addConfigElement('Output', inputConfig);
          setNodes((nds) => nds.concat(newNode));
        }
      }
    },
    [reactFlowInstance]
  );

  return (
    <div
      className="dndflow"
      style={{ width: '100vw', height: '100vh', background: 'white' }}
    >
      {messageApicontextHolder}
      <ReactFlowProvider>
        <Sidebar />

        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            nodeTypes={nodeTypes}
            fitView
          >
            <Background color="#ccc" variant={'dots'} />
            <Panel style={{ width: '100%' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  paddingRight: '20px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    gap: '8px',
                  }}
                >
                  <Form name="nameBase" autoComplete="off">
                    <Form.Item name="nameInt">
                      <Input
                        onChange={nameChange}
                        style={{ width: '300px' }}
                        placeholder="Name of Integration"
                      />
                    </Form.Item>
                  </Form>
                  <Text
                    style={{ color: '#002855' }}
                    copyable={{
                      tooltips: false,
                      text: `${apiKey}`,
                    }}
                  >
                    <b>API Key: </b>
                    {isSaved ? savedKey : apiKey}
                  </Text>
                  <Text
                    style={{ color: '#002855' }}
                    copyable={{
                      tooltips: false,
                      text: endpoint,
                    }}
                  >
                    <b>Endpoint: </b>
                    {endpoint}
                  </Text>

                  <Text
                    style={{ color: '#002855' }}
                    // copyable={{
                    //   tooltips: false,
                    //   text: cost,
                    // }}
                  >
                    <b>Cost: </b>$0.202
                  </Text>
                </div>

                <div>
                  <Button
                    style={{
                      background: '#CECECE',
                      color: 'white',
                      marginRight: '20px',
                      width: '150px',
                    }}
                  >
                    Pause
                  </Button>
                  {contextHolder}
                  <Button
                    style={{
                      background: '#007EA7',
                      color: 'white',
                      width: '150px',
                    }}
                    onClick={() => publish()}
                    loading={loading}
                  >
                    Publish
                  </Button>
                </div>
              </div>
            </Panel>
            <Controls />
            <MiniMap />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
    </div>
  );
}

export default IntegrationArea;
