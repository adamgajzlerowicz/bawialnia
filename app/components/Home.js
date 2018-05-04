// @flow
import React, { Component } from 'react';
import { Input, List, Switch } from 'antd';
import UUID from 'uuid';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';


import type { AppType } from '../reducers/app';
import { selectFormValue, setFormValue } from '../reducers/app';
import type { ChildRecordType, ChildrenReducerType, ChildType } from '../reducers/children';
import * as children from '../reducers/children';

import styles from './Home.css';

const { Search } = Input;

type Props = AppType & {
  addChild: string => void,
  updateChild: ChildRecordType => void,
  children: ChildrenReducerType,
  setFormValue: string => void
};

const sort = (a, b) => !(a.entryTime - b.entryTime);

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
          <div className={styles.right}>
            <span>Ustawienia</span>
            <Switch
              checked
              onChange={() => {
            }}
            />
          </div>

          <div className={styles.innerContainer}>
            <div className={styles.list}>


              <List
                locale={{ emptyText: 'Brak danych' }}
                size="large"
                bordered
                className="demo-loadmore-list"
                dataSource={Object.values(children.toJS()).sort(sort)}
                renderItem={(item: ChildType) => (
                  <List.Item actions={[<a>Zakoncz pobyt</a>]} className={styles.item}>
                    <List.Item.Meta
                      title={<a href="https://ant.design">{item.name}</a>}
                      description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                    />
                  </List.Item>
                )}
              />
            </div>
            {false && <div className={styles.config}>
              dupa
            </div>}
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
