import React, { useEffect, useRef, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Overview.css';
import OverviewAPIContainer from '../components/OverviewAPIContainer';
import { Button, Input, Space, Spin } from 'antd'; // Import Spin component
import { SearchOutlined } from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import TableP14 from '../components/TableP14';
import { Link } from 'react-router-dom';

function Overview() {
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const searchInput = useRef(null);

  const fetchDataFromAPI = async () => {
    try {
      const response = await fetch('http://192.168.100.70:5000/integrations');
      if (response.ok) {
        const data = await response.json();
        setApiData(data);
      } else {
        console.error('Failed to fetch data from the API');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false); // Set loading to false when data fetching is complete
    }
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: 'block',
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            Close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? '#1677ff' : undefined,
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: '#ffc069',
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });

  const columns = [
    {
      title: 'Integration',
      dataIndex: 'integration',
      render: (text) => (
        <Link to={`/dashboard?integration=${text.integration}`}>
            <a style={{ fontSize: '17px', color: '#002855', fontWeight: '200' }}>
          {text}
        </a>
      </Link>
      ),
      ...getColumnSearchProps('integration'),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      render: (text) => (
        <a style={{ fontSize: '17px', color: '#002855', fontWeight: '200' }}>
          {text}
        </a>
      ),
    },
    {
      title: 'Uptime',
      dataIndex: 'uptime',
      render: (text) => (
        <a style={{ fontSize: '17px', color: '#002855', fontWeight: '200' }}>
          {text}
        </a>
      ),
    },
    {
      title: 'Requests',
      dataIndex: 'requests',
      render: (text) => (
        <a style={{ fontSize: '17px', color: '#002855', fontWeight: '200' }}>
          {text}
        </a>
      ),
      defaultSortOrder: 'descend',
      sorter: (a, b) => a.requests - b.requests,
    },
    {
      title: 'Efficiency',
      dataIndex: 'Efficiency',
      render: (text) => (
        <a style={{ fontSize: '17px', color: '#002855', fontWeight: '200' }}>
          {text}
        </a>
      ),
    },
    {
      title: 'Flags',
      dataIndex: 'flags',
      render: (text) => (
        <a style={{ fontSize: '17px', color: '#002855', fontWeight: '200' }}>
          {text}
        </a>
      ),
    },
    {
      title: null,
      dataIndex: 'null',
      render: (text, record) => (
        <Link to={`/dashboard?integration=${record.integration}`}>
          <img
            src="https://i.ibb.co/tY7MTNq/pepicons-pop-dots-x.png"
            alt="Click Me"
            style={{ width: '28px', height: '28px' }}
          />
        </Link>
      ),
    },
  ];

  return (
    <div className="container-fluid vh-90">
      <div className="row">
        <div className="col">
          {/* <p className="title_name">Overview</p> */}
        </div>
      </div>

      <div className="row" id="container_list" style={{ marginTop: '2rem' }}>
        <OverviewAPIContainer />
      </div>

      <div className="overview_table">
        {loading ? (
          <Spin size="large" />
        ) : (
          <TableP14 columns={columns} data={apiData} />
        )}
      </div>
    </div>
  );
}

export default Overview;
