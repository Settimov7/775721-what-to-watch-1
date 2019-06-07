import * as React from 'react';

interface State {
  activeItem: string
}

export const withActiveItem = (Component, defaultActiveItem?: string) => {
  type P = React.ComponentProps<typeof Component>;

  class WithActiveItem extends React.PureComponent<P, State> {
    constructor(props) {
      super(props);

      this.state = {
        activeItem: this.props.currentFilter || defaultActiveItem,
      };

      this._setActiveItem = this._setActiveItem.bind(this);
    }

    render() {
      const {activeItem} = this.state;

      return <Component
        {...this.props}
        currentFilter={activeItem}
        changeCurrentFilter={this._setActiveItem}
      />;
    }

    _setActiveItem(item) {
      this.props.changeCurrentFilter(item);
      this.setState({
        activeItem: item,
      });
    }
  }

  return WithActiveItem;
};

