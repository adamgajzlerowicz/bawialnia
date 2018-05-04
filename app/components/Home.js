// @flow
import React, { Component } from 'react';
import { List, Input } from 'antd';
import UUID from 'uuid';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';


import { selectFormValue, setFormValue } from '../reducers/app';
// import { Child, selectChildren, addChild } from '../reducers/children';
import * as children from '../reducers/children';
import type { ChildRecordType, ChildrenReducerType, ChildType } from '../reducers/children';
import type { AppType } from '../reducers/app';

import styles from './Home.css';

const { Search } = Input;

type Props = AppType & {
  addChild: string => void,
  updateChild: ChildRecordType => void,
  children: ChildrenReducerType,
  setFormValue: string => void
};

class App extends Component<Props> {
  props: Props;

  componentDidMount() {
    this.props.setFormValue('');
  }

  render() {
    const {
      children, formValue, setFormValue, addChild
    } = this.props;
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Bawialnia</h2>
          <div className="inner-container">
            <div className="list">

              <Search
                size="large"
                placeholder="Dodaj"
                className={styles.add}
                onChange={(e) => {
              e.preventDefault();
              return setFormValue(e.target.value);
            }}
                value={formValue}
                enterButton="Dodaj"
                onSearch={() => addChild(formValue)}
              />

              <List
                locale={{ emptyText: 'Brak danych' }}
                size="large"
                bordered
                dataSource={Object.values(children.toJS()).sort((a, b) => !(a.entryTime - b.entryTime))}
                renderItem={(item: ChildType) => (<List.Item>{item.name}</List.Item>)}
              />
            </div>
            <div className="config">
           dupa
            </div>
          </div>
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
