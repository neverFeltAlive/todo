import {render, screen} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TodoItem, {TodoItemProps, TEST_DATA} from "./TodoItem";

const onRemove = jest.fn();
const onCheck = jest.fn();

const testProps: TodoItemProps = {
    item: {
        id: 1,
        text: "This is a testing item",
        isComplete: false,
    },
    removeFunc: (id: number) => onRemove(),
    toggleComplete: () => onCheck()
}

describe("TodoItem component", () => {
    test("TodoItem renders", () => {
        render(<TodoItem {...testProps}/>);

        expect(screen.getByText(testProps.item.text)).toBeInTheDocument();
    });

    test("TodoItem matches snapshot", () => {
        const item = render(<TodoItem {...testProps}/>);

        expect(item).toMatchSnapshot();
    });

    test("TodoItem fires remove function", () => {
        render(<TodoItem {...testProps}/>);

        userEvent.click(screen.getByTestId(TEST_DATA.removeButton));
        expect(onRemove).toHaveBeenCalled();
    });

    test("TodoItem fires check function", () => {
        render(<TodoItem {...testProps}/>);

        userEvent.click(screen.getByTestId(TEST_DATA.todoItem));
        expect(onCheck).toHaveBeenCalled();
    })
})