import React from 'react';
import moment from 'moment'; 
import { Card, Row, Col, Typography } from 'antd';
import { GlobalOutlined, LaptopOutlined, WindowsOutlined, ChromeOutlined, ClockCircleOutlined } from '@ant-design/icons';
const { Title, Text } = Typography;

 
const LoginDevices = ({deviceData}) => { 
    const {ip, os,browser, device, lastLogin} = deviceData; 
  return (
    <div className="p-6 bg-gradient-to-br from-gray-50 to-white rounded-xl">
      <Title level={3} className="flex items-center mb-6 text-yellow-600">
        <ClockCircleOutlined className="mr-2" /> Device Activity
      </Title>
      <Card className="border-2 border-yellow-200 bg-white/90 backdrop-blur-sm">
        <Row gutter={[16, 16]} className="text-gray-700">
          <Col span={12}>
            <div className="flex items-center p-4 transition-all rounded-lg bg-yellow-50 hover:bg-yellow-100">
              <GlobalOutlined className="mr-4 text-2xl text-yellow-500" />
              <div>
                <Text strong>IP Address</Text>
                <p className="text-sm">{ip ?? "N/A"}</p>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className="flex items-center p-4 transition-all rounded-lg bg-yellow-50 hover:bg-yellow-100">
              <ChromeOutlined className="mr-4 text-2xl text-yellow-500" />
              <div>
                <Text strong>Browser</Text>
                <p className="text-sm">{browser ?? "N/A"}</p>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className="flex items-center p-4 transition-all rounded-lg bg-yellow-50 hover:bg-yellow-100">
              <WindowsOutlined className="mr-4 text-2xl text-yellow-500" />
              <div>
                <Text strong>OS</Text>
                <p className="text-sm">{os ?? "N/A"}</p>
              </div>
            </div>
          </Col>
          <Col span={12}>
            <div className="flex items-center p-4 transition-all rounded-lg bg-yellow-50 hover:bg-yellow-100">
              <LaptopOutlined className="mr-4 text-2xl text-yellow-500" />
              <div>
                <Text strong>Device Type</Text>
                <p className="text-sm">{device ?? "N/A"}</p>
              </div>
            </div>
          </Col>
          <Col span={24}>
            <div className="flex items-center p-4 transition-all rounded-lg bg-yellow-50 hover:bg-yellow-100">
              <ClockCircleOutlined className="mr-4 text-2xl text-yellow-500" />
              <div>
                <Text strong>Last Login</Text>
                <p className="text-sm">{moment().utc().format('M/D/YYYY, h:mm:ss A') + ' (UTC)'}</p>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default LoginDevices;