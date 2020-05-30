import React from "react";
import enhanceWithClickOutside from "react-click-outside";

import "./styles.css";

class Dropdown extends React.Component {
  state = {
    isShow: false,
    selectedValue: "",
  };

  componentDidUpdate() {
    const { selectedValue } = this.props;
    if (this.state.selectedValue !== selectedValue) {
      this.setState({ selectedValue });
    }
  }

  componentDidMount() {
    const { selectedValue } = this.props;
    this.setState({ selectedValue });
  }

  handleClickOutside() {
    this.setState({ isShow: false });
  }

  handleClick = () => {
    const { onClick } = this.props;
    this.setState(
      (prevState) => {
        return { isShow: !prevState.isShow };
      },
      () => {
        if (this.state.isShow === true) {
          onClick();
        }
      }
    );
  };

  handleItemClick = (value) => {
    const { onChange } = this.props;
    if (value) {
      this.setState(
        {
          selectedValue: value,
          isShow: false,
        },
        () => {
          onChange(this.state.selectedValue);
        }
      );
    }
  };

  renderDropDownItem = () => {
    const { selectedValue } = this.state;
    const { items } = this.props;
    const itemsArr = [];

    items.map((item) => {
      itemsArr.push(
        <span
          onClick={() => this.handleItemClick(item.value)}
          className={`${selectedValue === item.value &&
            "active"} ${item.disabled && "disabled"}`}
        >
          {item.label}
        </span>
      );
    });

    return itemsArr;
  };

  render() {
    const { isShow } = this.state;
    const { loading } = this.props;

    return (
      <div className="dropdown">
        <div onClick={this.handleClick} className="book-shelf-changer" />
        {loading && (
          <div className="dropdown-loading">
            <div class="loading-dual-ring" />
          </div>
        )}
        {isShow && (
          <div className="dropdown-content">{this.renderDropDownItem()}</div>
        )}
      </div>
    );
  }
}

export default enhanceWithClickOutside(Dropdown);
