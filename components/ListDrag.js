import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Link from 'next/link';

const itemsFromBackend = [
  {
    name: 'SHOP',
    icon: 'fa fa-shopping-bag',
    position: 0,
    id: '01iif'
  },
  {
    name: 'SHOP NFTs',
    icon: 'fa fa-connectdevelop',
    position: 1,
    id: '0qieiririr'
  },
  {
    name: 'Play',
    icon: 'fa fa-fast-forward',
    position: 2,
    id: '02jfj2j'
  }
];

const itemsFromBackend1 = [
  {
    name: '',
    icon: 'fa fa-plus',
    position: 0,
    id: '01iif192'
  },
  {
    name: '',
    icon: 'fa fa-plus',
    position: 1,
    id: '0qieiririr103'
  },
  {
    name: '',
    icon: 'fa fa-plus',
    position: 2,
    id: '02jfj2j381'
  }
];

const columnsFromBackend = {
  '1230193': {
    name: 'Requested',
    items: itemsFromBackend1
  },
  '00001': {
    name: 'To do',
    items: itemsFromBackend
  }
};

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;

  if (source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);
    destItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...sourceColumn,
        items: sourceItems
      },
      [destination.droppableId]: {
        ...destColumn,
        items: destItems
      }
    });
  } else {
    const column = columns[source.droppableId];
    const copiedItems = [...column.items];
    const [removed] = copiedItems.splice(source.index, 1);
    copiedItems.splice(destination.index, 0, removed);
    setColumns({
      ...columns,
      [source.droppableId]: {
        ...column,
        items: copiedItems
      }
    });
  }
};

function ListDrag() {
  const [columns, setColumns] = useState(columnsFromBackend);
  const [click, setClick] = useState(false);

  const handleClick = () => {
    setClick(!click);
  };

  return (
    <>
      <div
        style={{ display: 'flex', justifyContent: 'center', height: 'auto' }}
      >
        {process.browser && (
          <DragDropContext
            onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
          >
            {Object.entries(columns).map(([columnId, column], index) => {
              return (
                <li key={columnId}>
                  <div style={{ margin: 'auto' }}>
                    {click === true && columnId === '00001' ? null : (
                      <Droppable droppableId={columnId} key={columnId}>
                        {(provided, snapshot) => {
                          return (
                            <li
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                              style={{
                                padding: 4,
                                width: 100,
                                minHeight: 50,
                                height: 145,
                                overflow: 'hidden',
                                marginLeft: 0
                              }}
                            >
                              {column.items.map((item, index) => {
                                return (
                                  <Draggable
                                    key={item.id}
                                    draggableId={item.id}
                                    index={index}
                                  >
                                    {(provided, snapshot) => {
                                      return (
                                        <li
                                          ref={provided.innerRef}
                                          {...provided.draggableProps}
                                          {...provided.dragHandleProps}
                                        >
                                          <Link href="/discover">
                                            <a className="">
                                              <span className="iconbg">
                                                <i
                                                  className={item.icon}
                                                  aria-hidden="true"
                                                ></i>
                                              </span>{' '}
                                              <span className="title">
                                                {item.name}
                                              </span>
                                            </a>
                                          </Link>{' '}
                                        </li>
                                      );
                                    }}
                                  </Draggable>
                                );
                              })}
                              {provided.placeholder}
                            </li>
                          );
                        }}
                      </Droppable>
                    )}
                  </div>
                </li>
              );
            })}
          </DragDropContext>
        )}
      </div>
      <button onClick={() => handleClick()}>
        <a href="#">
          {' '}
          <span className="iconbg sub">
            {columns['1230193'].items.length === 3 ? (
              <i className="fa fa-minus" aria-hidden="true"></i>
            ) : (
              <i className="fa fa-plus" aria-hidden="true"></i>
            )}
          </span>
        </a>
      </button>
    </>
  );
}

export default ListDrag;
