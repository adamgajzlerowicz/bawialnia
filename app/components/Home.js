// @flow
import React, { Component } from 'react';
import { Badge, Input, List, Switch } from 'antd';
import UUID from 'uuid';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import moment from 'moment';


import type { AppType } from '../reducers/app';
import * as app from '../reducers/app';
import type { ChildRecordType, ChildrenReducerType, ChildType } from '../reducers/children';
import * as children from '../reducers/children';
import { calculate, checkValue } from '../helpers/calculator';

import styles from './Home.css';

const { Search } = Input;

type Props = AppType & {
  addChild: string => void,
  updateChild: ChildRecordType => void,
  children: ChildrenReducerType,
  setFormValue: string => void,
  firstHourRate: number,
  rate: number,
  maxChildren: number,
  setRate: number => void,
  setFirstHourRate: number => void,
  setMaxChildren: number => void
};

type State = {
  timer: number
};

const sort = (a, b) => !(a.entryTime - b.entryTime);


class App extends Component<Props, State> {
  props: Props;
  state = {
    timer: 0
  };

  componentDidMount() {
    this.props.setFormValue('');
    this.props.setShowSettings(false);
    setInterval(() => {
      this.setState({ timer: this.state.timer + 1 });
    }, 1000 * 60);
  }

  render() {
    const {
      children, formValue, setFormValue, addChild, setShowSettings, showSettings
      , firstHourRate, rate, maxChildren, setMaxChildren, setRate, setFirstHourRate
    } = this.props;
    console.log(children);
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
            onSearch={() => formValue && addChild(formValue)}
          />
          <div className={styles.right}>
            <div className={styles.rightInner}>
              <span>
                <Badge status="success" text={`${children.size} dzieci`} />
              </span>
              <div>
                <span>Ustawienia: </span>
                <Switch
                  size="medium"
                  checked={showSettings}
                  onChange={() => setShowSettings(!showSettings)}
                />
              </div>
            </div>
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
                      description={
                        <div>Czas wejścia: {moment(item.entryTime).format('HH:mm')}</div>
                      }
                    />
                  </List.Item>
                )}
              />
            </div>
            {showSettings && (
              <div className={styles.config}>
                <p className={styles.configItem} >
                  Limit dzieci:
                  <Input
                    className={styles.configInputItem}
                    size="small"
                    value={maxChildren}
                    onChange={({ target: { value } }: *) =>
                      setMaxChildren(checkValue(value, maxChildren))
                    }
                  />
                </p>
                <p className={styles.configItem}>
                  Stawka:
                  <Input
                    className={styles.configInputItem}
                    size="small"
                    value={rate}
                    onChange={({ target: { value } }: *) =>
                      setRate(checkValue(value, rate))
                    }
                  />
                </p>
                <p className={styles.configItem}>
                  Startowa stawka:
                  <Input
                    className={styles.configInputItem}
                    size="small"
                    value={firstHourRate}
                    onChange={({ target: { value } }: *) =>
                      setFirstHourRate(checkValue(value, firstHourRate))
                    }
                  />
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapState = (state: *) => ({
  children: children.selectChildren(state),
  maxChildren: app.selectMaxChildren(state),
  rate: app.selectRate(state),
  firstHourRate: app.selectFirstHourRate(state),
  formValue: app.selectFormValue(state),
  showSettings: app.selectShowSettings(state)
});

const mapDispatch = (dispatch: Dispatch) => ({
  setFormValue: (data) => dispatch(app.setFormValue(data)),
  addChild: (data: string) => {
    dispatch(app.setFormValue(''));
    dispatch(children.addChild(new children.Child({
      id: UUID.v4(), name: data, entryTime: moment(), leaveTime: null
    })));
  },
  setShowSettings: (val: boolean) => dispatch(app.setShowSettings(val)),
  setRate: (rate: number) => dispatch(app.setRate(rate)),
  setFirstHourRate: (rate: number) => dispatch(app.setFirstHourRate(rate)),
  setMaxChildren: (children: number) => dispatch(app.setMaxChildren(children)),
  updateChild: (data: ChildRecordType) => {
    dispatch(app.setFormValue(''));
    // dispatch(updateChild(new Child({
    //   id: UUID.v4(), name: data, entryTime: 'now', leaveTime: 'later'
    // })));
  }
});

const ConnectedApp = connect(mapState, mapDispatch)(App);

export {
  ConnectedApp as default
};
