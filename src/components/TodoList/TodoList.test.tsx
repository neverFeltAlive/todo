import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoList, {TEST_DATA} from "./TodoList";
import {TEST_DATA as ITEM_TEST_DATA} from "../TodoItem/TodoItem";

describe("TodoList component", () => {
    test("TodoItem is added correctly", () => {
        render(<TodoList/>);
        const newItemText = "New item";

        userEvent.type(screen.getByTestId(TEST_DATA.input), newItemText);
        userEvent.click(screen.getByTestId(TEST_DATA.inputButton));
        expect(screen.getByText(newItemText)).toBeInTheDocument();
    });

    test("TodoItem is removed correctly", () => {
        render(<TodoList/>);
        const newItemText = "New item";

        userEvent.type(screen.getByTestId(TEST_DATA.input), newItemText);
        userEvent.click(screen.getByTestId(TEST_DATA.inputButton));
        expect(screen.getByText(newItemText)).toBeInTheDocument();

        userEvent.click(screen.getByTestId(ITEM_TEST_DATA.removeButton));
        expect(screen.queryByText(newItemText)).toBeNull();
    });

    test("TodoList matches snapshot", () => {
        const list = render(<TodoList/>);

        expect(list).toMatchSnapshot();
    });
});