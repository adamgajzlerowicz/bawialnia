// @flow
import React, { Component } from 'react';
import { List } from 'antd';

import styles from './Home.css';

type Props = {};


const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];


export default class App extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Bawialnia</h2>
          <List
            header={<div>Header</div>}
            footer={<div>Footer</div>}
            bordered
            dataSource={data}
            renderItem={item => (<List.Item>{item}</List.Item>)}
          />
        </div>
      </div>
    );
  }
}
