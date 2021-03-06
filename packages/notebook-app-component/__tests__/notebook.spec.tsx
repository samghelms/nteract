/* eslint-disable max-len */
import React from "react";
import Immutable from "immutable";
import { shallow } from "enzyme";
import { fixtureStore, fixtureCommutable } from "@nteract/fixtures";

import { NotebookApp } from "../src/notebook-app";

const dummyCellStatuses = fixtureCommutable
  .get("cellOrder")
  .reduce(
    (statuses, cellId) =>
      statuses.set(
        cellId,
        Immutable.fromJS({ outputHidden: false, inputHidden: false })
      ),
    new Immutable.Map()
  );

// Boilerplate test to make sure the testing setup is configured
describe("NotebookApp", () => {
  test("accepts an Immutable.List of cells", () => {
    const component = shallow(
      <NotebookApp
        cellOrder={fixtureCommutable.get("cellOrder")}
        cellMap={fixtureCommutable.get("cellMap")}
        transient={new Immutable.Map({ cellMap: new Immutable.Map() })}
        cellPagers={new Immutable.Map()}
        cellStatuses={new Immutable.Map()}
      />
    );
    expect(component).not.toBeNull();
  });

  describe("keyDown", () => {
    test("detects a cell execution keypress", () => {
      const focusedCell = fixtureCommutable.getIn(["cellOrder", 1]);

      const context = { store: fixtureStore() };

      context.store.dispatch = jest.fn();
      const executeFocusedCell = jest.fn();
      const component = shallow(
        <NotebookApp
          cellOrder={fixtureCommutable.get("cellOrder")}
          cellMap={fixtureCommutable.get("cellMap")}
          transient={new Immutable.Map({ cellMap: new Immutable.Map() })}
          cellPagers={new Immutable.Map()}
          cellStatuses={dummyCellStatuses}
          cellFocused={focusedCell}
          executeFocusedCell={executeFocusedCell}
        />,
        { context }
      );

      const inst = component.instance();

      const evt = new window.CustomEvent("keydown");
      evt.ctrlKey = true;
      evt.keyCode = 13;

      inst.keyDown(evt);

      expect(executeFocusedCell).toHaveBeenCalled();
    });
    test("detects a focus to next cell keypress", () => {
      const focusedCell = fixtureCommutable.getIn(["cellOrder", 1]);

      const context = { store: fixtureStore() };

      context.store.dispatch = jest.fn();
      const executeFocusedCell = jest.fn();
      const focusNextCell = jest.fn();
      const focusNextCellEditor = jest.fn();
      const component = shallow(
        <NotebookApp
          cellOrder={fixtureCommutable.get("cellOrder")}
          cellMap={fixtureCommutable.get("cellMap")}
          transient={new Immutable.Map({ cellMap: new Immutable.Map() })}
          cellPagers={new Immutable.Map()}
          cellStatuses={dummyCellStatuses}
          cellFocused={focusedCell}
          executeFocusedCell={executeFocusedCell}
          focusNextCell={focusNextCell}
          focusNextCellEditor={focusNextCellEditor}
        />,
        { context }
      );

      const inst = component.instance();

      const evt = new window.CustomEvent("keydown");
      evt.shiftKey = true;
      evt.keyCode = 13;

      inst.keyDown(evt);

      expect(executeFocusedCell).toHaveBeenCalled();
      expect(focusNextCell).toHaveBeenCalled();
      expect(focusNextCellEditor).toHaveBeenCalled();
    });
  });
});
