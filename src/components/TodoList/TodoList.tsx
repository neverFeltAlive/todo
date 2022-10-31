import React, {useEffect, useState} from 'react';
import {
    FaCheck,
    FaSortAmountUpAlt,
    FaSortAmountDown,
    FaSortAlphaDown,
    FaSpellCheck,
    FaPlus,
    FaMinus
} from "react-icons/fa";
import TodoItem from "../TodoItem/TodoItem";
import styled from "styled-components";
import {Button as Btn} from "../UI";

//region Type
export type TodoItemType = {
    id: number
    text: string,
    isComplete: boolean,
}

type SortButtonProps = {
    color: string,
    isActive: boolean
}

enum Sorting {
    NONE,
    COMPLETE_FIRST,
    COMPLETE_LAST,
    ALPHA
}

enum Filter {
    NONE,
    COMPLETE,
    INCOMPLETE
}

type FilterType = (item: TodoItemType) => boolean;
//endregion

//region Style
const Input = styled.input`
  border: none;
  outline: none;
  padding: 5px;
  background-color: transparent;
  color: whitesmoke;
  font-size: 16px;
  font-weight: 700;

  @media (min-width: 1200px){
    font-size: 25px;
  }
`;

export const Button = styled(Btn)`
  color: lightblue;
`;

export const FooterButton = styled(Btn)<SortButtonProps>`
  color: ${props => props.color};
  opacity: ${props => props.isActive ? 1 : 0.3};
`;

const Fieldset = styled.fieldset`
  border: none;
`;

const InputFieldset = styled(Fieldset)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid gray;
  padding: 0;
  
  @media (min-width: 700px){
    min-width: 500px;
  }
  @media (min-width: 990px){
    min-width: 600px;
  }
  @media (min-width: 1200px){
    min-width: 800px;
  }
`;

const ListFieldset = styled(Fieldset)`
  padding: 10px 0 10px 0;
  margin-bottom: 80px;
  min-height: 200px;

  @media (min-width: 700px){
    min-height: 300px;
  }
  @media (min-width: 1200px){
    padding: 20px 0 20px 0;
    min-height: 500px;
  }
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: absolute;
  bottom: 0;
  width: 100%;
`;

const FooterBlock = styled.div`
  display: flex;
  align-items: center;
`;

const FooterText = styled.p`
  margin: 0;
  color: gray;
`;
//endregion

//region Data
const filtersMap = new Map<Filter, FilterType>([
    [Filter.NONE, (item: TodoItemType) => true],
    [Filter.COMPLETE, (item: TodoItemType) => item.isComplete],
    [Filter.INCOMPLETE, (item: TodoItemType) => !item.isComplete],
]);

export const TEST_DATA = {
    input: "input",
    inputButton: "inputButton",
}
//endregion

/**
 * Component which represents a list of todo items and a form to add them
 * @constructor
 */
const TodoList = (): JSX.Element => {
    const [items, setItems] = useState<null | TodoItemType[]>(null);
    const [value, setValue] = useState<string>("");
    const [sorting, setSorting] = useState<Sorting>(Sorting.NONE)
    const [filters, setFilters] = useState<Filter[]>([]);

    /**
     * Modifies state by adding new todo text
     * @param text - string which needs to be added
     */
    const addItem = (text: string) => {
        if (text) {
            setItems(prevState => {
                const newItem = {id: Date.now(), text, isComplete: false};

                if (prevState) return [...prevState, newItem]
                else return [newItem]
            })
            setValue("");
        }
    }

    /**
     * Modifies state by removing the item
     * @param id - id of an item to be removed
     */
    const removeItem = (id: number) => {
        setItems((prevState) => {
            if (prevState) return prevState.filter(item => item.id !== id);
            else return null
        })
    }

    /**
     * Closure over a function which completes certain todo item
     * @param id - id of an item to be completed
     */
    const toggleCompleteItem = (id: number) => {
        return () => {
            setItems(prevState => {
                if (prevState && prevState.length > 0) {
                    const updateIndex = prevState.findIndex(item => item.id === id)
                    if (updateIndex !== undefined && updateIndex >= 0) {
                        const newItem = {...prevState[updateIndex], isComplete: !prevState[updateIndex].isComplete}
                        const newState = [...prevState];
                        newState[updateIndex] = newItem;
                        return newState
                    } else return prevState;
                } else return prevState;
            })
        }
    }

    /**
     * Toggles sorting mode
     * @param sort - sorting mode to toggle
     */
    const toggleSorting = (sort: Sorting) => {
        if (sorting === sort) setSorting(Sorting.NONE);
        else setSorting(sort);
    }

    /**
     * Applies sorting to the list of items
     * @param items - items to be sorted
     */
    const applySorting = (items: TodoItemType[]): TodoItemType[] => {
        switch (sorting) {
            case Sorting.NONE:
                return items;
            case Sorting.COMPLETE_LAST:
                return [...items].sort((a, b) => +a.isComplete - +b.isComplete)
            case Sorting.COMPLETE_FIRST:
                return [...items].sort((a, b) => -(+a.isComplete - +b.isComplete))
            case Sorting.ALPHA:
                return [...items].sort((a, b) => {
                    if (a.text !== b.text) {
                        if (a.text > b.text) return 1
                        else return -1;
                    } else return 0;
                })
            default:
                return items;
        }
    }

    /**
     * Toggles filtering mode
     * @param filt - filtering mode to toggle
     */
    const toggleFilter = (filt: Filter) => {
        if (!filters.includes(filt)) setFilters(prevState => [...prevState, filt]);
        else setFilters(prevState => {
            if (prevState) return prevState?.filter(item => item !== filt)
            else return prevState
        })
    }

    /**
     * Applies all filters to items list
     * @param items - items to be filtered
     */
    const applyFilters = (items: TodoItemType[]): TodoItemType[] => {
        let newList = items;
        for (const filt of filters) {
            const filterFunc = filtersMap.get(filt);
            if (filterFunc) newList = newList?.filter(filterFunc)
        }
        return newList;
    }

    // /**
    //  * Handles blur event on input element
    //  * @param event
    //  */
    // const handleBlur: React.FocusEventHandler<HTMLInputElement> = (event) =>
    //     addItem(event.target.value)
    //
    // /**
    //  * Handles Enter Press on input element
    //  * @param event
    //  */
    // const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (event) => {
    //     if (event.key === "Enter") {
    //         addItem(event.currentTarget.value)
    //         event.currentTarget.value = "";
    //     }
    // }

    return (
        <form onSubmit={(e) => e.preventDefault()} style={{position: "relative"}}>
            <InputFieldset>
                <Input type="text" value={value} onChange={(e) => setValue(e.target.value)}
                       placeholder="What needs to be done?" data-testid={TEST_DATA.input}/>
                <Button onClick={(e) => addItem(value)} data-testid={TEST_DATA.inputButton}><FaPlus/></Button>
            </InputFieldset>
            <ListFieldset>
                {items && applySorting(applyFilters(items))?.map((item, index) => {
                    return (
                        <TodoItem key={item.id} item={item} removeFunc={removeItem}
                                  toggleComplete={toggleCompleteItem(item.id)}/>
                    )
                })}
            </ListFieldset>
            <Footer>
                <FooterBlock>
                    <FooterText>Sort:</FooterText>
                    <FooterButton color="lightgreen" onClick={() => toggleSorting(Sorting.COMPLETE_FIRST)}
                                  isActive={sorting === Sorting.COMPLETE_FIRST}><FaSortAmountDown/></FooterButton>
                    <FooterButton color="lightcoral" onClick={() => toggleSorting(Sorting.COMPLETE_LAST)}
                                  isActive={sorting === Sorting.COMPLETE_LAST}><FaSortAmountUpAlt/></FooterButton>
                    <FooterButton color="lightblue" onClick={() => toggleSorting(Sorting.ALPHA)}
                                  isActive={sorting === Sorting.ALPHA}><FaSortAlphaDown/></FooterButton>
                </FooterBlock>
                <FooterBlock>
                    <FooterText>Filter:</FooterText>
                    <FooterButton color="lightblue" onClick={() => toggleFilter(Filter.COMPLETE)}
                                  isActive={filters.includes(Filter.COMPLETE)}><FaSpellCheck/></FooterButton>
                    <FooterButton color="lightcoral" onClick={() => toggleFilter(Filter.INCOMPLETE)}
                                  isActive={filters.includes(Filter.INCOMPLETE)}><FaMinus/></FooterButton>
                </FooterBlock>
            </Footer>
        </form>
    );
};

export default TodoList;