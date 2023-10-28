import React, { Component } from 'react';
import axios from 'axios';
import { BASE_KEY } from './helpers/helpers';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';

export class App extends Component {
  state = {
    images: null,
    isLoading: false,
    value: '',
    page: 1,
    error: null,
  };

  getDataImages = async () => {
    try {
      this.setState({
        isLoading: true,
      });
      const { data } = await axios.get(
        `https://pixabay.com/api/?q=${this.state.value}&page=${this.state.page}&key=${BASE_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      this.setState({
        images: data,
      });
      console.log(this.state.images);
    } catch (error) {
      this.setState({ error: error.message });
    } finally {
      this.setState({
        isLoading: false,
      });
    }
  };

  componentDidUpdate(_, prevState) {
    if (
      prevState.value !== this.state.value ||
      prevState.page !== this.state.page
    ) {
      this.getDataImages();
    }
  }

  onHandleClickSubmit = value => {
    this.setState({ value });
  };
  onHandleClickLoadMore = e => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onHandleClickSubmit} />
        {this.state.images !== null && (
          <ImageGallery arrayData={this.state.images} />
        )}
        <Button onClick={this.onHandleClickLoadMore} />
      </div>
    );
  }
}
