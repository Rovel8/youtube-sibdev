import React, { useState } from 'react';
// import { Formik, Form, Field } from 'formik';
import { Slider, InputNumber, Row, Col, Modal } from 'antd';
import { Form, Input, Button } from 'antd';
// import Modal from 'react-modal';

interface ISearchModal{
  title: string
  isModalVisible: boolean
  setIsModalVisible: (value: any) => void
  handleSubmit:(e: any) => void
  initialvalues: {
    query: string
    label: string
    sortBy: string
    maxResults: number
  }
}

// Modal.setAppElement('#root')

const customStyles = {

}

const SearchModal: React.FC<ISearchModal> = ({initialvalues, handleSubmit, title, isModalVisible, setIsModalVisible, children}) => {

  const [results, setResults] = useState<number>(1)

  const onChange = (value: number) => {
    setResults(value)
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const buttonStyles = {
    height: '52px',
    width: '210px',
    marginLeft: '15px',
  }

  return (
    <>
      <Modal
        width={510}
        title={title}
        footer={null}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          layout="vertical"
          name='Save'
          initialValues={initialvalues}
          onFinish={handleSubmit}

        >
             {children}
             <Row>
               <span>Максимальное количество</span>
             </Row>
             <Form.Item>
             <Row>
             <Col span={18}>
             <Form.Item name="maxResults">
                  <Slider
                min={1}
                max={50}
                onChange={(value: any) => onChange(value)}
                value={results === 0 ? 25 : results}
              />
             </Form.Item>
             </Col>
              <Col span={6}>
                  <InputNumber
                  min={1}
                  max={50}
                  style={{ marginLeft: '22px'}}
                  value={results}
                  onChange={(value: any) => onChange(value)}
                />
                
            </Col>
            </Row>
          </Form.Item>
          <Row>
          <Form.Item>
              <Button style={buttonStyles} onClick={() => handleCancel()}>Выйти</Button>
            </Form.Item>
            <Form.Item>
              <Button style={buttonStyles} htmlType="submit" type="primary" onClick={() => handleOk()}>Сохранить</Button>
            </Form.Item>
          </Row>
          </Form>
      </Modal>
    </>
  );
}

export default SearchModal
