import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import '../styles/OverviewAPIContainer.css';
import ChartPie from '../components/ChartPie';

function OverviewAPIContainer() {
  const data1 = [
    { name: 'Active APIs', value: 7 },
    { name: 'Inactive APIs', value: 4 },
  ];

  const data2 = [
    { name: 'Active APIs', value: 3 },
    { name: 'Inactive APIs', value: 7 },
  ];

  const data3 = [
    { name: 'Active APIs', value: 60 },
    { name: 'Inactive APIs', value: 40 },
  ];

  return (
    <div className="row">
      <div className="col-md-4">
        <div className="api_container">
          <Container>
            <Row>
              <p className="api_container_title"> Active API</p>
            </Row>
            <Row>
              <Col>
                <ChartPie
                  data={data1}
                  colors={['#00AC4F', '#D9D9D9']}
                  innerRadius={50}
                  outerRadius={70}
                />
              </Col>

              <Col className="api_value_text" style={{ marginRight: '30px' }}>
                <p>
                  Active API:{' '}
                  <span
                    className="bold-data"
                    style={{ marginLeft: '10px', fontSize: '30px' }}
                  >
                    {data1.find((item) => item.name === 'Active APIs').value}
                  </span>
                </p>
                <p>
                  Total API:{' '}
                  <span
                    className="bold-data"
                    style={{ marginLeft: '10px', fontSize: '30px' }}
                  >
                    {data1.reduce((total, item) => total + item.value, 0)}
                  </span>
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <div className="col-md-4">
        <div className="api_container">
          <Container>
            <Row>
              <p className="api_container_title"> Down API</p>
            </Row>
            <Row>
              <Col>
                <ChartPie
                  data={data2}
                  colors={['#D8B128', '#D9D9D9']}
                  innerRadius={50}
                  outerRadius={70}
                />
              </Col>

              <Col className="api_value_text">
                <p>
                  Down API:{' '}
                  <span
                    className="bold-data"
                    style={{ marginLeft: '10px', fontSize: '30px' }}
                  >
                    {data2.find((item) => item.name === 'Active APIs').value}
                  </span>
                </p>
                <p>
                  Total API:{' '}
                  <span
                    className="bold-data"
                    style={{ marginLeft: '10px', fontSize: '30px' }}
                  >
                    {data2.reduce((total, item) => total + item.value, 0)}
                  </span>
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>

      <div className="col-md-4">
        <div className="api_container">
          <Container>
            <Row>
              <p className="api_container_title"> Total Efficiency</p>
            </Row>
            <Row>
              <Col>
                <ChartPie
                  data={data3}
                  colors={['#007EA7', '#D9D9D9']}
                  innerRadius={50}
                  outerRadius={70}
                />
              </Col>

              <Col className="api_value_text">
                <p>
                  Gain:{' '}
                  <span
                    className="bold-data"
                    style={{ marginLeft: '10px', fontSize: '30px' }}
                  >
                    {data3.find((item) => item.name === 'Active APIs').value}
                  </span>
                </p>
                <p>
                  Lost:{' '}
                  <span
                    className="bold-data"
                    style={{ marginLeft: '10px', fontSize: '30px' }}
                  >
                    {data3.reduce((total, item) => total + item.value, 0)}
                  </span>
                </p>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default OverviewAPIContainer;
