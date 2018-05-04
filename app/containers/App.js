// @flow
import * as React from 'react';

type Props = {
  children: React.Element<*>
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    return (
      <div> {this.props.children} </div>
    );
  }
}
