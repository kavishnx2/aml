import { useCallback, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import {
  Typography,
  Input,
  Select,
  Space,
  InputNumber,
  Form,
  Row,
  Checkbox,
} from 'antd';

const { Text } = Typography;
const options = [
  { label: 'Withdrawal', value: 'WITHDRAWAL AMT' },
  { label: 'Deposit', value: 'DEPOSIT AMT' },
  { label: 'Cheque', value: 'CHQ.NO.' },
];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const AMLTransaction = ({ data, isConnectable }) => {
  useEffect(() => {
    data.addIntegrationElement('AMLTransaction', 'id', 2);
    data.addIntegrationElement('AMLTransaction', 'withdrawal', true);
    data.addIntegrationElement('AMLTransaction', 'deposit', true);
    data.addIntegrationElement('AMLTransaction', 'cheque deposit', true);
    // data.addIntegrationElement('AMLTransaction', 'duration', '');
    // data.addIntegrationElement('AMLTransaction', 'id', 6);
  }, []);

  const key = getRandomInt(9999);

  return (
    <div className="text-updater-node">
      <Handle
        type="target"
        position={Position.Top}
        id="b"
        isConnectable={isConnectable}
        style={{
          width: '15px',
          height: '15px',
          background: '#007EA7',
          bottom: '-7px',
        }}
      />
      <div>
        <div
          style={{
            background: '#D9D9D9',
            width: '100%',
            height: '25px',
            borderRadius: '5px 5px 0px 0px',
            paddingLeft: '5px',
          }}
        >
          <Text style={{ color: '#002855' }}>
            <b>AML Transaction Monitoring</b>
          </Text>
        </div>
        <div
          style={{
            width: '100%',
            height: '100%',
            padding: '10px',
            maxWidth: '300px',
          }}
        >
          <Row
            style={{ marginTop: '10px', marginBottom: '-10px', padding: '0px' }}
          >
            <Checkbox
              defaultChecked
              //   onChange={allowAnalyticChange}
              style={{ color: '#007EA7' }}
            ></Checkbox>
            <Text style={{ color: '#002855', marginLeft: '10px' }}>
              Withdrawal
            </Text>
          </Row>
          <Row
            style={{ marginTop: '10px', marginBottom: '-10px', padding: '0px' }}
          >
            <Checkbox
              defaultChecked
              //   onChange={allowAlertChange}
              style={{ color: '#007EA7' }}
            ></Checkbox>
            <Text style={{ color: '#002855', marginLeft: '10px' }}>
              Deposit
            </Text>
          </Row>
          <Row
            style={{ marginTop: '10px', marginBottom: '-10px', padding: '0px' }}
          >
            <Checkbox
              defaultChecked
              //   onChange={allowAlertChange}
              style={{ color: '#007EA7' }}
            ></Checkbox>
            <Text style={{ color: '#002855', marginLeft: '10px' }}>
              Cheque Deposit
            </Text>
          </Row>
          <Text style={{ color: '#8c8c8c' }}>Cost: $0.10 per request</Text>
        </div>
      </div>
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        isConnectable={isConnectable}
        style={{
          width: '15px',
          height: '15px',
          background: '#007EA7',
          bottom: '-7px',
        }}
      />
    </div>
  );
};

export default AMLTransaction;
