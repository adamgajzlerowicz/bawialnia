// @flow
import React, { Component } from 'react';
import { Badge, Input, List, Switch, Button } from 'antd';
import UUID from 'uuid';
import { connect } from 'react-redux';
import type { Dispatch } from 'redux';
import moment from 'moment';


import type { AppType } from '../reducers/app';
import * as app from '../reducers/app';
import type { ChildRecordType, ChildrenReducerType, ChildType } from '../reducers/children';
import * as children from '../reducers/children';
import { calculate, checkValue, calculateFullness } from '../helpers/calculator';

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
  setMaxChildren: number => void,
  updateChild: ChildType => void,
  clearChildren: void => void
};

type State = {
  timer: number
};

const sort = (a, b) => {
  if (a.leaveTime && !b.leaveTime) {
    return true;
  }
  if (!a.leaveTime && b.leaveTime) {
    return false;
  }
  if (a.leaveTime && b.leaveTime) {
    return a.leaveTime < b.leaveTime;
  }

  return a.entryTime < b.entryTime;
};


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
      children, formValue, setFormValue, addChild, setShowSettings, showSettings, clearChildren,
      firstHourRate, rate, maxChildren, setMaxChildren, setRate, setFirstHourRate, updateChild
    } = this.props;
    const activeChildren:number = children.filter((child: ChildType) => !child.leaveTime).size;
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Chata Małolata</h2>
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
                <Badge
                  status={calculateFullness(activeChildren, maxChildren)}
                  text={`${activeChildren} dzieci`}
                />
              </span>
              <div>
                <span>Pokaż ustawienia: </span>
                <Switch
                  size="default"
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
                renderItem={(item: ChildType) =>
                  (
                    <List.Item
                      actions={[
                        !item.leaveTime && (
                          <a
                            onClick={() => {
                                updateChild(Object.assign({}, item, {
                                  leaveTime: moment().toISOString(),
                                  cost: calculate(firstHourRate, rate, moment().diff(moment(item.entryTime), 'minutes'))
                        }));
                      }}
                          >
                          Zakoncz pobyt
                          </a>
                        )
                      ]}
                      className={!item.leaveTime && styles.item}
                    >
                      <List.Item.Meta
                        className={item.leaveTime ? 'past' : 'current'}
                        title={<a href="https://ant.design">{item.name}</a>}
                        description={
                          <div >
                            <span>Czas wejścia: {moment(item.entryTime).format('HH:mm')}</span>
                            {!item.leaveTime && <span>{' '} Koszt: {calculate(firstHourRate, rate, moment().diff(moment(item.entryTime), 'minutes'))} zł</span>}
                            {item.leaveTime && <span>{' '} Zapłacono: {item.cost} zł</span>}
                          </div>
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
                  Pierwsza godzina:
                  <Input
                    className={styles.configInputItem}
                    size="small"
                    value={firstHourRate}
                    onChange={({ target: { value } }: *) =>
                      setFirstHourRate(checkValue(value, firstHourRate))
                    }
                  />
                </p>
                <p className={styles.configItem}>
                  Dodatkowa godzina:
                  <Input
                    className={styles.configInputItem}
                    size="small"
                    value={rate}
                    onChange={({ target: { value } }: *) =>
                      setRate(checkValue(value, rate))
                    }
                  />
                </p>
              </div>
            )}
          </div>
          <Button type="dashed" onClick={clearChildren}>Wyczyść</Button>

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
  clearChildren: () => dispatch(children.clearChildren()),
  addChild: (data: string) => {
    dispatch(app.setFormValue(''));
    dispatch(children.addChild(new children.Child({
      id: UUID.v4(), name: data, entryTime: moment().toISOString(), leaveTime: null
    })));
  },
  setShowSettings: (val: boolean) => dispatch(app.setShowSettings(val)),
  setRate: (rate: number) => dispatch(app.setRate(rate)),
  setFirstHourRate: (rate: number) => dispatch(app.setFirstHourRate(rate)),
  setMaxChildren: (children: number) => dispatch(app.setMaxChildren(children)),
  updateChild: (data: ChildType) => {
    dispatch(children.updateChild(new children.Child(data)));
  }
});

const ConnectedApp = connect(mapState, mapDispatch)(App);

export {
  ConnectedApp as default
};
