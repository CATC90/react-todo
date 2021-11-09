import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import React from "react";
import { act } from "react-dom/test-utils";
import { unmountComponentAtNode } from "react-dom";
import pretty from "pretty";

const httpMock = {
  async delete() {
    return Promise.resolve(true);
  },
};

const httpErrorMock = {
  async delete() {
    return Promise.reject(false);
  },
};

let container = null;
beforeEach(() => {
  // configurar un elemento del DOM como objetivo del renderizado
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // limpieza al salir
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

test("renders learn react link", () => {
  render(<App />, container);
  const linkElement = screen.getByText(/To Do List/i);
  expect(linkElement).toBeInTheDocument();
});

test("should do all actions and remove task successfully", async () => {
  act(() => {
    render(<App http={httpMock} />, container);
  });

  const input = screen.getByTestId("input").querySelector('input[type="text"]');
  const addToDo = screen.getByTestId("add-todo");

  act(() => {
    fireEvent.change(input, { target: { value: "to do testing" } });
  });

  act(() => {
    fireEvent.click(addToDo);
  });

  const [incompleteList, completeList] = screen.getAllByRole("list");

  expect(incompleteList.childElementCount).toEqual(1);
  expect(completeList.childElementCount).toEqual(0);

  act(() => {
    const checkbox = incompleteList.querySelector('input[type="checkbox"]');
    fireEvent.click(checkbox);
  });

  const checkbox = screen
    .getByTestId("checkbox")
    .querySelector('input[type="checkbox"]');
  expect(checkbox.checked).toBe(true);
  expect(completeList.childElementCount).toEqual(1);

  const deleteIcon = screen.getByTestId("delete-icon");

  await act(async () => {
    fireEvent.click(deleteIcon);
  });

  expect(checkbox).not.toBeInTheDocument();
});

test("should do all actions failing in remove task", async () => {
  act(() => {
    render(<App http={httpErrorMock} />, container);
  });

  const input = screen.getByTestId("input").querySelector('input[type="text"]');
  const addToDo = screen.getByTestId("add-todo");

  act(() => {
    fireEvent.change(input, { target: { value: "to do testing" } });
  });

  act(() => {
    fireEvent.click(addToDo);
  });

  const [incompleteList, completeList] = screen.getAllByRole("list");

  expect(incompleteList.childElementCount).toEqual(1);
  expect(completeList.childElementCount).toEqual(0);

  act(() => {
    const checkbox = incompleteList.querySelector('input[type="checkbox"]');
    fireEvent.click(checkbox);
  });

  const checkbox = screen
    .getByTestId("checkbox")
    .querySelector('input[type="checkbox"]');
  expect(checkbox.checked).toBe(true);
  expect(completeList.childElementCount).toEqual(1);

  const deleteIcon = screen.getByTestId("delete-icon");

  await act(async () => {
    fireEvent.click(deleteIcon);
  });

  expect(checkbox).toBeInTheDocument();
});
