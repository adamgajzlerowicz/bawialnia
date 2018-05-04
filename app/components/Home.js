// @flow
import React, { Component } from 'react';
import { List, Input } from 'antd';
import UUID from 'uuid';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';


import { selectFormValue, setFormValue } from '../reducers/app';
// import { Child, selectChildren, addChild } from '../reducers/children';
import * as children from '../reducers/children';
import type { ChildRecordType, ChildrenReducerType } from '../reducers/children';
import type { AppType } from '../reducers/app';

import styles from './Home.css';

const { Search } = Input;

type Props = AppType & {
  addChild: string => void,
  updateChild: ChildRecordType => void,
  children: ChildrenReducerType,
  setFormValue: string => void
};


const data = [
  'Racing car sprays burning fuel into crowd.',
  'Japanese princess to wed commoner.',
  'Australian walks 100km after outback crash.',
  'Man charged over missing wedding girl.',
  'Los Angeles battles huge wildfires.',
];


class App extends Component<Props> {
  props: Props;

  componentDidMount() {
    this.props.setFormValue('');
  }

  render() {
    const {
      children, formValue, setFormValue, addChild
    } = this.props;
    console.log(addChild);
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Bawialnia</h2>
          <Search
            placeholder="Dodaj"
            onChange={(e) => {
              e.preventDefault();
              return setFormValue(e.target.value);
            }}
            value={formValue}
            enterButton="Dodaj"
            onSearch={() => addChild(formValue)}
          />

          <List
            size="large"
            bordered
            dataSource={data}
            renderItem={item => (<List.Item>{item}</List.Item>)}
          />
        </div>
      </div>
    );
  }
}

const mapState = (state: *) => ({
  children: children.selectChildren(state),
  formValue: selectFormValue(state)
});

const mapDispatch = (dispatch: Dispatch) => ({
  setFormValue: (data) => dispatch(setFormValue(data)),
  addChild: (data: string) => {
    dispatch(setFormValue(''));
    dispatch(children.addChild(new children.Child({
      id: UUID.v4(), name: data, entryTime: 'now', leaveTime: 'later'
    })));
  },
  updateChild: (data: ChildRecordType) => {
    dispatch(setFormValue(''));
    // dispatch(updateChild(new Child({
    //   id: UUID.v4(), name: data, entryTime: 'now', leaveTime: 'later'
    // })));
  }
});

const ConnectedApp = connect(mapState, mapDispatch)(App);

export {
  ConnectedApp as default
};
