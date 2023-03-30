import React, { Component } from "react";
import axios from "axios";
import "./style.css";
import Loader from "./Components/Loader/Loader";
import Button from "./Components/Button/button";
import ImageGallery from "./Components/ImageGallery/ImageGallery";
import Searchbar from "./Components/Searchbar/Searchbar";
import Modal from "./Components/Modal/Modal";
export default class App extends Component {
  state = {
    images: [],
    query: "",
    page: 1,
    per_page: 9,
    isLoading: false,
    loading: false,
    showModal: false,
    src: null,
  };

  fatchImages = async () => {
    const { query, per_page } = this.state;
    try {
      await axios
        .get(
          `https://pixabay.com/api/?key=34695797-1fae3d9441fb187335514c8af&q=${query}&image_type=photo&per_page=${per_page}`
        )
        .then((response) => {
          const data = response.data.hits;
          this.setState({ images: data });
          console.log(response.data.hits);
        });
    } catch (error) {
      console.log(
        " Ошибка при запросе componentDidMount error App.js: " + error
      );
    }
  };

  componentDidMount() {
    this.fatchImages();
  }

  onSubmit = (query) => {
    this.setState({ query, isLoading: true, images: [] });
  };

  handleClick = () => {
    this.setState(({ page }) => ({
      page: page + 1,
      isLoading: true,
    }));
  };

  toggleModal = (src) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
      src,
    }));
  };

  loadImages = async () => {
    const { page, per_page, query } = this.state;
    try {
      const { data } = await axios.get(
        `https://pixabay.com/api/?key=28598653-ac578a657988498e7082adc71&q=${query}&image_type=video&per_page=${per_page}&page=${page} `
      );
      this.setState(({ images }) => ({
        images: [...images, ...data.hits],
        isLoading: false,
      }));
    } catch (error) {
      throw new Error(error);
    }
  };

  componentDidUpdate() {
    const { isLoading } = this.state;

    if (isLoading) {
      this.loadImages();
    }
  }

  // запрос на фота с п жизненного цикла

  render() {
    const { images, loading, showModal, src } = this.state;
    return (
      <>
        <Searchbar onSubmit={this.onSubmit} />

        {loading ? (
          <Loader />
        ) : (
          <ImageGallery images={images} modalToggler={this.toggleModal} />
        )}
        <Button onClick={this.handleClick} />
        {showModal && (
          <Modal closeModal={this.toggleModal}>
            <img
              src={src}
              alt=""
              style={{
                height: "90vh",
                width: "70vw",
                borderRadius: "5px",
              }}
            />
          </Modal>
        )}
      </>
    );
  }
}
