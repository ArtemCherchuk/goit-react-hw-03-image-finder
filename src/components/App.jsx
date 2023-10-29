import React, { Component } from 'react';
import axios from 'axios';

import { BASE_KEY } from './helpers/helpers';
import { Searchbar } from 'components/Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Loader } from './Loader/Loader';
import { Modal } from './Modal/Modal';
// import { DataImages } from './helpers/helpers';

export class App extends Component {
  state = {
    images: [],
    isLoading: false,
    isOpenModal: false,
    dataModal: null,
    value: '',
    page: 1,
    error: null,
  };

  getDataImages = async () => {
    try {
      this.setState({
        isLoading: true,
      });
      const response = await axios.get(
        `https://pixabay.com/api/?q=${this.state.value}&page=${this.state.page}&key=${BASE_KEY}&image_type=photo&orientation=horizontal&per_page=12`
      );
      // const response = await DataImages(value, page);
      console.log(response);
      const { hits, totalHits } = response.data;
      // if (hits.length < 1) {
      //   alert('Sorry, nothing was found for your request...');
      // }
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...hits],
          totalHits: totalHits,
        };
      });
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
    if (value.trim() === '') {
      alert('Invalid value entered');
      return;
    }

    this.setState({ value, images: [] });
  };

  onHandleClickLoadMore = e => {
    this.setState(prevState => {
      return {
        page: prevState.page + 1,
      };
    });
  };

  openModal = dataImage => {
    this.setState({
      isOpenModal: true,
      dataModal: dataImage,
    });
  };

  closeModal = () => {
    this.setState({
      isOpenModal: false,
      dataModal: null,
    });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.onHandleClickSubmit} />
        {this.state.images.length !== 0 && (
          <ImageGallery
            arrayData={this.state.images}
            openModal={this.openModal}
          />
        )}
        {this.state.page < Math.ceil(this.state.totalHits / 12) && (
          <Button onClick={this.onHandleClickLoadMore} />
        )}
        <Loader isLoading={this.state.isLoading} />
        {this.state.isOpenModal && (
          <Modal
            dataModal={this.state.dataModal}
            closeModal={this.closeModal}
          />
        )}
      </div>
    );
  }
}
