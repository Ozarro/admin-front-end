import React from "react";
import { Button, Icon, Timeline } from "rsuite";
import "rsuite/dist/styles/rsuite-default.css";
import "../../../assets/local-css/trackingPage.css";

const TrackingOrder = () => {
  return (
    <React.Fragment>
      <div className="tr-background">
        <div className="tracking-map">
          <Timeline className="custom-timeline">
            <Timeline.Item
              dot={
                <Icon
                  icon="credit-card"
                  size="2x"
                  style={{ background: "#15b215", color: "#fff" }}
                />
              }
            >
              <div className="map-item" hidden={true}>
                <p className="map-item-state">Pending...</p>
              </div>
              <div className="map-item">
                <p className="map-item-state">Processing</p>
                <p className="map-item-description">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <p className="map-item-date">March 1, 10:20</p>
              </div>
            </Timeline.Item>
            <Timeline.Item
              dot={
                <Icon
                  icon="plane"
                  size="2x"
                  style={{ background: "#15b215", color: "#fff" }}
                />
              }
            >
              <div className="map-item" hidden={true}>
                <p className="map-item-state">Pending...</p>
              </div>
              <div className="map-item">
                <p className="map-item-state">Processing</p>
                <p className="map-item-description">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <p className="map-item-date">March 1, 10:20</p>
              </div>
            </Timeline.Item>
            <Timeline.Item
              dot={
                <Icon
                  icon="plane"
                  size="2x"
                  style={{ background: "#15b215", color: "#fff" }}
                />
              }
            >
              <div className="map-item" hidden={true}>
                <p className="map-item-state">Pending...</p>
              </div>
              <div className="map-item">
                <p className="map-item-state">Processing</p>
                <p className="map-item-description">
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book.
                </p>
                <p className="map-item-date">March 1, 10:20</p>
              </div>
            </Timeline.Item>
            <Timeline.Item
              dot={
                <Icon
                  icon="plane"
                  size="2x"
                  style={{ background: "#15b215", color: "#fff" }}
                />
              }
            >
              <div className="map-item" hidden={true}>
                <p className="map-item-state">Pending...</p>
              </div>
              <div className="map-item">
                <p className="map-item-state">Processing</p>
                <p className="map-item-description">
                  Your order starts processing
                </p>
                <p className="map-item-date">March 1, 10:20</p>
              </div>
            </Timeline.Item>
            <Timeline.Item
              dot={
                <Icon
                  icon="truck"
                  size="2x"
                  style={{ background: "#000", color: "#fff" }}
                />
              }
            >
              <div className="map-item">
                <p className="map-item-state">Pending...</p>
              </div>
              <div className="map-item" hidden={true}>
                <p className="map-item-state">Processing</p>
                <p className="map-item-description">
                  Your order starts processing
                </p>
                <p className="map-item-date">March 1, 10:20</p>
              </div>
            </Timeline.Item>
            <Timeline.Item
              dot={
                <Icon
                  icon="user"
                  size="2x"
                  style={{ background: "#000", color: "#fff" }}
                />
              }
            >
              <div className="map-item">
                <p className="map-item-state">Pending...</p>
              </div>
              <div className="map-item" hidden={true}>
                <p className="map-item-state">Processing</p>
                <p className="map-item-description">
                  Your order starts processing
                </p>
                <p className="map-item-date">March 1, 10:20</p>
              </div>
            </Timeline.Item>
            <Timeline.Item
              dot={
                <Icon
                  icon="check"
                  size="2x"
                  style={{ background: "#000", color: "#fff" }}
                />
              }
            >
              <div className="map-item">
                <p className="map-item-state">Pending...</p>
              </div>
              <div className="map-item" hidden={true}>
                <p className="map-item-state">Processing</p>
                <p className="map-item-description">
                  Your order starts processing
                </p>
                <p className="map-item-date">March 1, 10:20</p>
              </div>
            </Timeline.Item>
          </Timeline>
        </div>
        <div className="tracking-img">
          <div className="home-btn">
            <Button
              color="blue"
              onClick={() => {
                window.location = "/";
              }}
            >
              <Icon icon="home" /> Home
            </Button>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default TrackingOrder;
