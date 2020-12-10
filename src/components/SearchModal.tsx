import React, { useState } from 'react';
import { Slider, InputNumber, Row, Col, Modal } from 'antd';
import { Form, Button } from 'antd';
import { setIsModalVisible } from '../state/search-reducer'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../state/store';

interface ISearchModal {
  title: string
  handleSubmit: (e: any) => void
}

const SearchModal: React.FC<ISearchModal> = ({ handleSubmit, title, children }) => {

  const isModalVisible: any = useSelector<RootState>(state => state.search.isModalVisible)
  const [results, setResults] = useState<number>(1)
  const dispatch = useDispatch()

  const onChange = (value: number) => {
    setResults(value)
  };

  const handleOk = () => {
    dispatch(setIsModalVisible(false));
  };

  const handleCancel = () => {
    dispatch(setIsModalVisible(false));
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
                  style={{ marginLeft: '22px' }}
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
