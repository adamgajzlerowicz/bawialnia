// @flow
import React, { Component } from 'react';
import styles from './Home.css';

type Props = {};

export default class App extends Component<Props> {
  props: Props;

  render() {
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <h2>Bawialnia</h2>
        </div>
      </div>
    );
  }
}
