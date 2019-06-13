import * as React from 'react';

interface State {
  activeItem: string | number
}

type defaultActiveItem = string | number;

export const withActiveItem = (Component, defaultActiveItem?: defaultActiveItem ) => {
  type P = React.ComponentProps<typeof Component>;

  class WithActiveItem extends React.PureComponent<P, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: this.props.activeItem || defaultActiveItem,
      };

      this._setActiveItem = this._setActiveItem.bind(this);
    }

    render() {
      const {activeItem} = this.state;

      return <Component
        {...this.props}
        activeItem={activeItem}
        onChange={this._setActiveItem}
      />;
    }

    _setActiveItem(item) {
      this.props.onChange && this.props.onChange(item);
      this.setState({
        activeItem: item,
      });
    }
  }

  return WithActiveItem;
};

