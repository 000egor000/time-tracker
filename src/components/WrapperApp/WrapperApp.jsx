import React, { useState } from "react";
import { Container, Header, Content, Navbar, ButtonToolbar } from "rsuite";
import { Gear, List, Site } from "@rsuite/icons";
import { ButtonWithTooltip } from "../TrackerConfig/components/ButtonWithTooltip";
import styles from "./WrapperApp.module.scss";
import { viewModes } from "./const";

import PropTypes from "prop-types";

function WrapperApp({ children = null }) {
  const { ALL, LIST, GEAR } = viewModes;
  const [currentView, setCurrentView] = useState(ALL.value);

  const handleSite = (key) => () => setCurrentView(key);

  const getAppearance = (key) => (currentView === key ? "primary" : "default");

  return (
    <div className={styles.wrapperApp}>
      <Container>
        <Header>
          <Navbar>
            <Navbar.Brand>Tracker</Navbar.Brand>
          </Navbar>

          <ButtonToolbar>
            <ButtonWithTooltip
              icon={<Site />}
              tooltip={ALL.tooltip}
              onClick={handleSite(ALL.value)}
              appearance={getAppearance(ALL.value)}
            />
            <ButtonWithTooltip
              icon={<Gear />}
              tooltip={GEAR.tooltip}
              onClick={handleSite(GEAR.value)}
              appearance={getAppearance(GEAR.value)}
            />
            <ButtonWithTooltip
              icon={<List />}
              tooltip={LIST.tooltip}
              onClick={handleSite(LIST.value)}
              appearance={getAppearance(LIST.value)}
            />
          </ButtonToolbar>
        </Header>
        <Content>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, {
              currentView,
            });
          })}
        </Content>
      </Container>
    </div>
  );
}

WrapperApp.propTypes = {
  children: PropTypes.node.isRequired,
};

export default WrapperApp;
