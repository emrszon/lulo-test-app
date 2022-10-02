import React from "react";
import { Accordion, Carousel, ListGroup } from "react-bootstrap";

const RoomGallery = ({images}) => {
  return (
      <Carousel className="d-block mx-auto">
        {images?.map((image, index) => {
          return (
            <Carousel.Item key={index}>
              <img
                className="d-block w-100"
                src={`${image.url}?random=${index}`}
                alt={`${image.title}`}
              />
              <Carousel.Caption>
                <p>{`${image.title}`}</p>
              </Carousel.Caption>
            </Carousel.Item>
          );
        })}
      </Carousel>);
}

export default RoomGallery;