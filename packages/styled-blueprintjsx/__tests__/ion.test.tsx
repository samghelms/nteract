import * as React from "react";
import renderer from "react-test-renderer";

jest.mock("styled-components", () => ({
  createGlobalStyle: jest.fn(() => "")
}));

import { BlueprintCSS, BlueprintSelectCSS } from "../src";
test("styled blueprint jsx css will not trigger stylesheet errors", () => {
  const BareComponent = props => (
    <div>
      <h1>{props.title}</h1>
      <p>{props.description}</p>
    </div>
  );

  const component = renderer.create(
    <React.Fragment>
      <BareComponent
        title="Testing Higher Order Components"
        description="This seemed reasonable, though there may be a better way"
      />
      <BlueprintCSS />
      <BlueprintSelectCSS />
    </React.Fragment>
  );

  const children = component.root.children;

  // Make sure our component got passed through and that it got the props
  expect(children[0].type).toEqual(BareComponent);
});
